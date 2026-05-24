const db = require("../config/db");

const getUserId = (req) => {
  return req.user?.id || req.user?.id_user || req.user?.userId;
};

const addToCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id_varian, qty } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    if (!id_varian) {
      return res.status(400).json({
        message: "id_varian wajib dikirim",
      });
    }

    const jumlah = Number(qty || 1);

    if (jumlah < 1) {
      return res.status(400).json({
        message: "Qty minimal 1",
      });
    }

    const [varian] = await db.query(
      "SELECT id_varian, stok FROM varian_produk WHERE id_varian = ?",
      [id_varian]
    );

    if (varian.length === 0) {
      return res.status(404).json({
        message: "Varian produk tidak ditemukan",
      });
    }

    if (varian[0].stok < jumlah) {
      return res.status(400).json({
        message: "Stok tidak mencukupi",
      });
    }

    const [existing] = await db.query(
      "SELECT id_keranjang, qty FROM keranjang WHERE id_user = ? AND id_varian = ?",
      [userId, id_varian]
    );

    if (existing.length > 0) {
      const qtyBaru = Number(existing[0].qty) + jumlah;

      if (qtyBaru > varian[0].stok) {
        return res.status(400).json({
          message: "Jumlah keranjang melebihi stok produk",
        });
      }

      await db.query(
        "UPDATE keranjang SET qty = ? WHERE id_keranjang = ? AND id_user = ?",
        [qtyBaru, existing[0].id_keranjang, userId]
      );
    } else {
      await db.query(
        "INSERT INTO keranjang (id_user, id_varian, qty) VALUES (?, ?, ?)",
        [userId, id_varian, jumlah]
      );
    }

    res.status(201).json({
      message: "Produk berhasil ditambahkan ke keranjang",
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      message: "Gagal menambahkan produk ke keranjang",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    const [items] = await db.query(
      `
      SELECT 
        k.id_keranjang,
        k.id_user,
        k.id_varian,
        k.qty,

        vp.id_produk,
        vp.sku,
        vp.warna,
        vp.ukuran,
        vp.harga,
        vp.stok,
        vp.berat_gram,

        p.nama_produk,
        p.deskripsi,

        (
          SELECT fp.file_foto
          FROM foto_produk fp
          WHERE fp.id_produk = p.id_produk
          ORDER BY fp.id_foto ASC
          LIMIT 1
        ) AS file_foto,

        (vp.harga * k.qty) AS subtotal,
        (vp.berat_gram * k.qty) AS total_berat
      FROM keranjang k
      JOIN varian_produk vp ON k.id_varian = vp.id_varian
      JOIN produk p ON vp.id_produk = p.id_produk
      WHERE k.id_user = ?
      ORDER BY k.id_keranjang DESC
      `,
      [userId]
    );

    res.json({
      message: "Keranjang berhasil diambil",
      data: items,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      message: "Gagal mengambil keranjang",
      error: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { cartId } = req.params;
    const { qty } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    const jumlah = Number(qty);

    if (!jumlah || jumlah < 1) {
      return res.status(400).json({
        message: "Qty minimal 1",
      });
    }

    const [cartItem] = await db.query(
      `
      SELECT 
        k.id_keranjang,
        k.id_varian,
        vp.stok
      FROM keranjang k
      JOIN varian_produk vp ON k.id_varian = vp.id_varian
      WHERE k.id_keranjang = ? AND k.id_user = ?
      `,
      [cartId, userId]
    );

    if (cartItem.length === 0) {
      return res.status(404).json({
        message: "Item keranjang tidak ditemukan",
      });
    }

    if (jumlah > cartItem[0].stok) {
      return res.status(400).json({
        message: "Qty melebihi stok produk",
      });
    }

    await db.query(
      "UPDATE keranjang SET qty = ? WHERE id_keranjang = ? AND id_user = ?",
      [jumlah, cartId, userId]
    );

    res.json({
      message: "Qty keranjang berhasil diperbarui",
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({
      message: "Gagal memperbarui qty keranjang",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { cartId } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    const [result] = await db.query(
      "DELETE FROM keranjang WHERE id_keranjang = ? AND id_user = ?",
      [cartId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Item keranjang tidak ditemukan",
      });
    }

    res.json({
      message: "Produk berhasil dihapus dari keranjang",
    });
  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({
      message: "Gagal menghapus produk dari keranjang",
      error: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    await db.query("DELETE FROM keranjang WHERE id_user = ?", [userId]);

    res.json({
      message: "Keranjang berhasil dikosongkan",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      message: "Gagal mengosongkan keranjang",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};