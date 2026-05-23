const db = require('../config/db');

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id_varian, qty } = req.body;

    if (!id_varian) {
      return res.status(400).json({ message: 'id_varian wajib dikirim' });
    }

    const jumlah = qty || 1;

    const [existing] = await db.query(
      'SELECT id_keranjang, qty FROM keranjang WHERE id_user = ? AND id_varian = ?',
      [userId, id_varian]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE keranjang SET qty = qty + ? WHERE id_keranjang = ? AND id_user = ?',
        [jumlah, existing[0].id_keranjang, userId]
      );
    } else {
      await db.query(
        'INSERT INTO keranjang (id_user, id_varian, qty) VALUES (?, ?, ?)',
        [userId, id_varian, jumlah]
      );
    }

    res.status(201).json({ message: 'Produk berhasil ditambahkan ke keranjang' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const [items] = await db.query(
      `
      SELECT 
        k.id_keranjang,
        k.id_user,
        k.id_varian,
        k.qty,
        vp.id_produk,
        vp.warna,
        vp.ukuran,
        vp.harga,
        vp.stok,
        p.nama_produk,
        p.deskripsi,
        (
          SELECT fp.file_foto
          FROM foto_produk fp
          WHERE fp.id_produk = p.id_produk
          ORDER BY fp.id_foto ASC
          LIMIT 1
        ) AS file_foto
      FROM keranjang k
      JOIN varian_produk vp ON k.id_varian = vp.id_varian
      JOIN produk p ON vp.id_produk = p.id_produk
      WHERE k.id_user = ?
      ORDER BY k.id_keranjang DESC
      `,
      [userId]
    );

    res.json(items);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;
    const { qty } = req.body;

    if (!qty || qty < 1) {
      return res.status(400).json({ message: 'Qty minimal 1' });
    }

    await db.query(
      'UPDATE keranjang SET qty = ? WHERE id_keranjang = ? AND id_user = ?',
      [qty, cartId, userId]
    );

    res.json({ message: 'Qty keranjang berhasil diperbarui' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;

    await db.query(
      'DELETE FROM keranjang WHERE id_keranjang = ? AND id_user = ?',
      [cartId, userId]
    );

    res.json({ message: 'Produk berhasil dihapus dari keranjang' });
  } catch (error) {
    console.error('Remove cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await db.query(
      'DELETE FROM keranjang WHERE id_user = ?',
      [userId]
    );

    res.json({ message: 'Keranjang berhasil dikosongkan' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
};