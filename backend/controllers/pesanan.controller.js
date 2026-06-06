const db = require("../config/db");



const getAllPesananAdmin = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id_pesanan,
        u.nama_lengkap AS nama_customer,
        p.tgl_pesan,
        p.total_tagihan,
        p.status_pesanan,
        pb.metode_bayar,
        pb.status_bayar
      FROM pesanan p
      LEFT JOIN users u ON p.id_user = u.id_user
      LEFT JOIN pembayaran pb ON p.id_pesanan = pb.id_pesanan
      ORDER BY p.id_pesanan DESC
    `);
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil pesanan", error: error.message });
  }
};

const getDetailPesananAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const [pesananRows] = await db.query(`
      SELECT p.*, u.nama_lengkap AS nama_customer,
        pb.metode_bayar, pb.status_bayar,
        a.label_alamat, a.nama_penerima, a.no_telp_penerima,
        a.provinsi, a.kabupaten_kota, a.kecamatan, a.desa, a.kode_pos
      FROM pesanan p
      LEFT JOIN users u ON p.id_user = u.id_user
      LEFT JOIN pembayaran pb ON p.id_pesanan = pb.id_pesanan
      LEFT JOIN alamat_pengiriman a ON p.id_alamat = a.id_alamat
      WHERE p.id_pesanan = ? LIMIT 1
    `, [id]);

    if (pesananRows.length === 0)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    const [items] = await db.query(`
      SELECT dp.*, vp.sku, vp.warna, vp.ukuran, pr.nama_produk
      FROM detail_pesanan dp
      LEFT JOIN varian_produk vp ON dp.id_varian = vp.id_varian
      LEFT JOIN produk pr ON vp.id_produk = pr.id_produk
      WHERE dp.id_pesanan = ?
    `, [id]);

    res.json({ data: { ...pesananRows[0], items } });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil detail pesanan", error: error.message });
  }
};

const updateStatusPesananAdmin = async (req, res) => {
  try {
    const { ids, status, no_resi } = req.body;
    if (!ids || !ids.length) return res.status(400).json({ message: "IDs wajib diisi" });

    if (status === "hapus") {
      // Hapus semua data terkait
      for (const id of ids) {
        await db.query("DELETE FROM pembayaran WHERE id_pesanan = ?", [id]);
        await db.query("DELETE FROM detail_pesanan WHERE id_pesanan = ?", [id]);
        await db.query("DELETE FROM pesanan WHERE id_pesanan = ?", [id]);
      }
      return res.json({ message: `${ids.length} pesanan berhasil dihapus` });
    }

    for (const id of ids) {
      if (status === "dikirim" && no_resi) {
        await db.query(
          "UPDATE pesanan SET status_pesanan = ?, no_resi = ? WHERE id_pesanan = ?",
          [status, no_resi, id]
        );
      } else {
        await db.query("UPDATE pesanan SET status_pesanan = ? WHERE id_pesanan = ?", [status, id]);
      }
    }
    res.json({ message: `Status ${ids.length} pesanan diperbarui ke '${status}'` });
  } catch (error) {
    res.status(500).json({ message: "Gagal update status", error: error.message });
  }
};


// customer side
const getUserId = (req) => {
  return req.user?.id || req.user?.id_user || req.user?.userId;
};

const safeJsonParse = (value) => {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

const normalizePaymentMethod = (metodeBayar) => {
  if (!metodeBayar) {
    return {
      payment_method: null,
      bank: null,
      store: null,
      payment_label: "-",
    };
  }

  if (metodeBayar.startsWith("va_")) {
    const bank = metodeBayar.replace("va_", "");

    return {
      payment_method: "bank_transfer",
      bank,
      store: null,
      payment_label: `${bank.toUpperCase()} Virtual Account`,
    };
  }

  if (metodeBayar === "mandiri_bill") {
    return {
      payment_method: "echannel",
      bank: "mandiri",
      store: null,
      payment_label: "Mandiri Bill Payment",
    };
  }

  if (metodeBayar === "alfamart" || metodeBayar === "indomaret") {
    return {
      payment_method: "cstore",
      bank: null,
      store: metodeBayar,
      payment_label: metodeBayar === "alfamart" ? "Alfamart" : "Indomaret",
    };
  }

  if (metodeBayar === "qris") {
    return {
      payment_method: "qris",
      bank: null,
      store: null,
      payment_label: "QRIS",
    };
  }

  if (metodeBayar === "gopay") {
    return {
      payment_method: "gopay",
      bank: null,
      store: null,
      payment_label: "GoPay",
    };
  }

  if (metodeBayar === "shopeepay") {
    return {
      payment_method: "shopeepay",
      bank: null,
      store: null,
      payment_label: "ShopeePay",
    };
  }

  return {
    payment_method: metodeBayar,
    bank: null,
    store: null,
    payment_label: metodeBayar,
  };
};

const getRiwayatPesanan = async (req, res) => {
  try {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    const [rows] = await db.query(
      `
      SELECT 
        p.id_pesanan,
        p.id_user,
        p.id_alamat,
        p.tgl_pesan,
        p.total_tagihan,
        p.status_pesanan,
        p.no_resi,

        pb.order_id,
        pb.metode_bayar,
        pb.status_bayar,
        pb.bukti_transfer,
        pb.transaction_id,

        COALESCE(pb.order_id, CONCAT('PESANAN-', p.id_pesanan)) AS kode_pesanan,

        COUNT(dp.id_detail) AS total_item,
        COALESCE(SUM(dp.qty), 0) AS total_qty
      FROM pesanan p
      LEFT JOIN pembayaran pb ON p.id_pesanan = pb.id_pesanan
      LEFT JOIN detail_pesanan dp ON p.id_pesanan = dp.id_pesanan
      WHERE p.id_user = ?
      GROUP BY 
        p.id_pesanan,
        p.id_user,
        p.id_alamat,
        p.tgl_pesan,
        p.total_tagihan,
        p.status_pesanan,
        p.no_resi,
        pb.order_id,
        pb.metode_bayar,
        pb.status_bayar,
        pb.bukti_transfer,
        pb.transaction_id
      ORDER BY p.id_pesanan DESC
      `,
      [id_user]
    );

    const data = rows.map((row) => {
      const paymentInfo = normalizePaymentMethod(row.metode_bayar);

      return {
        ...row,
        ...paymentInfo,
        kode_pesanan: row.kode_pesanan,
        order_id: row.order_id || row.kode_pesanan,
      };
    });

    res.json({
      message: "Riwayat pesanan berhasil diambil",
      data,
    });
  } catch (error) {
    console.error("Get riwayat pesanan error:", error);

    res.status(500).json({
      message: "Gagal mengambil riwayat pesanan",
      error: error.message,
    });
  }
};

const getDetailPesanan = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id } = req.params;

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    const [pesananRows] = await db.query(
      `
      SELECT 
        p.id_pesanan,
        p.id_user,
        p.id_alamat,
        p.tgl_pesan,
        p.total_tagihan,
        p.status_pesanan,
        p.no_resi,

        pb.order_id,
        pb.metode_bayar,
        pb.status_bayar,
        pb.bukti_transfer,
        pb.transaction_id,
        pb.payment_response,

        a.label_alamat,
        a.nama_penerima,
        a.no_telp_penerima,
        a.informasi_tambahan,
        a.provinsi,
        a.kabupaten_kota,
        a.kecamatan,
        a.desa,
        a.kota,
        a.kode_pos,
        a.destination_id
      FROM pesanan p
      LEFT JOIN pembayaran pb ON p.id_pesanan = pb.id_pesanan
      LEFT JOIN alamat_pengiriman a ON p.id_alamat = a.id_alamat
      WHERE p.id_pesanan = ? AND p.id_user = ?
      LIMIT 1
      `,
      [id, id_user]
    );

    if (pesananRows.length === 0) {
      return res.status(404).json({
        message: "Pesanan tidak ditemukan",
      });
    }

    const pesanan = pesananRows[0];
    const midtransResponse = safeJsonParse(pesanan.payment_response);
    const paymentInfo = normalizePaymentMethod(pesanan.metode_bayar);

    const [items] = await db.query(
      `
      SELECT 
        dp.id_detail,
        dp.id_pesanan,
        dp.id_varian,
        dp.harga_satuan,
        dp.qty,
        dp.subtotal,

        vp.id_produk,
        vp.sku,
        vp.warna,
        vp.ukuran,
        vp.berat_gram,

        pr.nama_produk,
        pr.deskripsi,

        (
          SELECT fp.file_foto
          FROM foto_produk fp
          WHERE fp.id_produk = pr.id_produk
          ORDER BY fp.id_foto ASC
          LIMIT 1
        ) AS file_foto
      FROM detail_pesanan dp
      LEFT JOIN varian_produk vp ON dp.id_varian = vp.id_varian
      LEFT JOIN produk pr ON vp.id_produk = pr.id_produk
      WHERE dp.id_pesanan = ?
      ORDER BY dp.id_detail ASC
      `,
      [id]
    );

    const subtotal = items.reduce(
      (total, item) => total + Number(item.subtotal || 0),
      0
    );

    const totalBerat = items.reduce(
      (total, item) =>
        total + Number(item.berat_gram || 1000) * Number(item.qty || 0),
      0
    );

    const orderIdAsli =
      pesanan.order_id ||
      midtransResponse.order_id ||
      `PESANAN-${pesanan.id_pesanan}`;

    const paymentData = {
      id_pesanan: pesanan.id_pesanan,
      order_id: orderIdAsli,
      kode_pesanan: orderIdAsli,

      payment_method: paymentInfo.payment_method,
      bank: paymentInfo.bank,
      store: paymentInfo.store,
      payment_label: paymentInfo.payment_label,

      midtrans: {
        ...midtransResponse,
        order_id: midtransResponse.order_id || orderIdAsli,
        transaction_id:
          midtransResponse.transaction_id || pesanan.transaction_id || null,
        transaction_status:
          pesanan.status_bayar ||
          midtransResponse.transaction_status ||
          pesanan.status_pesanan ||
          "pending",
      },

      alamat: {
        id_alamat: pesanan.id_alamat,
        label_alamat: pesanan.label_alamat,
        nama_penerima: pesanan.nama_penerima,
        no_telp_penerima: pesanan.no_telp_penerima,
        informasi_tambahan: pesanan.informasi_tambahan,
        provinsi: pesanan.provinsi,
        kabupaten_kota: pesanan.kabupaten_kota,
        kecamatan: pesanan.kecamatan,
        desa: pesanan.desa,
        kota: pesanan.kota,
        kode_pos: pesanan.kode_pos,
        destination_id: pesanan.destination_id,
      },

      items: items.map((item) => ({
        id_detail: item.id_detail,
        id_varian: item.id_varian,
        id_produk: item.id_produk,
        nama_produk: item.nama_produk,
        warna: item.warna,
        ukuran: item.ukuran,
        harga: Number(item.harga_satuan || 0),
        qty: Number(item.qty || 0),
        berat_gram: Number(item.berat_gram || 1000),
        subtotal: Number(item.subtotal || 0),
        file_foto: item.file_foto,
      })),

      subtotal,
      pajak: 0,
      total_berat: totalBerat,
      total_pembayaran: Number(pesanan.total_tagihan || 0),

      status_pesanan: pesanan.status_pesanan,
      status_bayar: pesanan.status_bayar,
      tgl_pesan: pesanan.tgl_pesan,
      no_resi: pesanan.no_resi,
    };

    res.json({
      message: "Detail pesanan berhasil diambil",
      data: paymentData,
    });
  } catch (error) {
    console.error("Get detail pesanan error:", error);

    res.status(500).json({
      message: "Gagal mengambil detail pesanan",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPesananAdmin,
  getDetailPesananAdmin,
  updateStatusPesananAdmin,
  getRiwayatPesanan,
  getDetailPesanan,
};
