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
        p.tgl_terkirim,
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

// Admin bisa ubah status sampai "terkirim" saja, tidak bisa set "selesai"
const ALLOWED_ADMIN_STATUS = ["diproses", "dikirim", "terkirim", "dibatalkan", "pending_payment"];

const updateStatusPesananAdmin = async (req, res) => {
  try {
    const { ids, status, no_resi } = req.body;
    if (!ids || !ids.length) return res.status(400).json({ message: "IDs wajib diisi" });

    // Blokir admin mengubah ke "selesai"
    if (status === "selesai") {
      return res.status(403).json({
        message: "Admin tidak dapat mengubah status ke 'selesai'. Status ini hanya dapat diubah oleh customer."
      });
    }

    if (status === "hapus") {
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
      } else if (status === "terkirim") {
        // Catat waktu pesanan terkirim (sampai di tujuan)
        await db.query(
          "UPDATE pesanan SET status_pesanan = ?, tgl_terkirim = NOW() WHERE id_pesanan = ?",
          [status, id]
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

// ─── CUSTOMER SIDE ───────────────────────────────────────────────────────────

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
    return { payment_method: null, bank: null, store: null, payment_label: "-" };
  }
  if (metodeBayar.startsWith("va_")) {
    const bank = metodeBayar.replace("va_", "");
    return { payment_method: "bank_transfer", bank, store: null, payment_label: `${bank.toUpperCase()} Virtual Account` };
  }
  if (metodeBayar === "mandiri_bill") return { payment_method: "echannel", bank: "mandiri", store: null, payment_label: "Mandiri Bill Payment" };
  if (metodeBayar === "alfamart") return { payment_method: "cstore", bank: null, store: "alfamart", payment_label: "Alfamart" };
  if (metodeBayar === "indomaret") return { payment_method: "cstore", bank: null, store: "indomaret", payment_label: "Indomaret" };
  if (metodeBayar === "qris") return { payment_method: "qris", bank: null, store: null, payment_label: "QRIS" };
  if (metodeBayar === "gopay") return { payment_method: "gopay", bank: null, store: null, payment_label: "GoPay" };
  if (metodeBayar === "shopeepay") return { payment_method: "shopeepay", bank: null, store: null, payment_label: "ShopeePay" };
  return { payment_method: metodeBayar, bank: null, store: null, payment_label: metodeBayar };
};

const getRiwayatPesanan = async (req, res) => {
  try {
    const id_user = getUserId(req);
    if (!id_user) return res.status(401).json({ message: "User tidak ditemukan dari token" });

    const [rows] = await db.query(`
      SELECT 
        p.id_pesanan, p.id_user, p.id_alamat, p.tgl_pesan,
        p.total_tagihan, p.status_pesanan, p.no_resi, p.tgl_terkirim,
        pb.order_id, pb.metode_bayar, pb.status_bayar, pb.bukti_transfer, pb.transaction_id,
        COALESCE(pb.order_id, CONCAT('PESANAN-', p.id_pesanan)) AS kode_pesanan,
        COUNT(dp.id_detail) AS total_item,
        COALESCE(SUM(dp.qty), 0) AS total_qty
      FROM pesanan p
      LEFT JOIN pembayaran pb ON p.id_pesanan = pb.id_pesanan
      LEFT JOIN detail_pesanan dp ON p.id_pesanan = dp.id_pesanan
      WHERE p.id_user = ?
      GROUP BY 
        p.id_pesanan, p.id_user, p.id_alamat, p.tgl_pesan,
        p.total_tagihan, p.status_pesanan, p.no_resi, p.tgl_terkirim,
        pb.order_id, pb.metode_bayar, pb.status_bayar, pb.bukti_transfer, pb.transaction_id
      ORDER BY p.id_pesanan DESC
      `, [id_user]);

    const data = rows.map((row) => {
      const paymentInfo = normalizePaymentMethod(row.metode_bayar);
      return {
        ...row,
        ...paymentInfo,
        kode_pesanan: row.kode_pesanan,
        order_id: row.order_id || row.kode_pesanan,
      };
    });

    res.json({ message: "Riwayat pesanan berhasil diambil", data });
  } catch (error) {
    console.error("Get riwayat pesanan error:", error);
    res.status(500).json({ message: "Gagal mengambil riwayat pesanan", error: error.message });
  }
};

const getDetailPesanan = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id } = req.params;
    if (!id_user) return res.status(401).json({ message: "User tidak ditemukan dari token" });

    const [pesananRows] = await db.query(`
      SELECT 
        p.id_pesanan, p.id_user, p.id_alamat, p.tgl_pesan,
        p.total_tagihan, p.status_pesanan, p.no_resi, p.tgl_terkirim,
        p.id_voucher, p.id_kurir, k.nama_kurir,
        pb.order_id, pb.metode_bayar, pb.status_bayar, pb.bukti_transfer, pb.transaction_id, pb.payment_response,
        a.label_alamat, a.nama_penerima, a.no_telp_penerima, a.informasi_tambahan,
        a.provinsi, a.kabupaten_kota, a.kecamatan, a.desa, a.kota, a.kode_pos, a.destination_id,
        v.kode_voucher, v.nominal_diskon AS nominal_voucher
      FROM pesanan p
      LEFT JOIN pembayaran pb ON p.id_pesanan = pb.id_pesanan
      LEFT JOIN alamat_pengiriman a ON p.id_alamat = a.id_alamat
      LEFT JOIN voucher v ON p.id_voucher = v.id_voucher
      LEFT JOIN kurir k ON p.id_kurir = k.id_kurir
      WHERE p.id_pesanan = ? AND p.id_user = ?
      LIMIT 1
      `, [id, id_user]);

    if (pesananRows.length === 0)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    const pesanan = pesananRows[0];
    const midtransResponse = safeJsonParse(pesanan.payment_response);
    const paymentInfo = normalizePaymentMethod(pesanan.metode_bayar);

    const [items] = await db.query(`
      SELECT 
        dp.id_detail, dp.id_pesanan, dp.id_varian, dp.harga_satuan, dp.qty, dp.subtotal,
        vp.id_produk, vp.sku, vp.warna, vp.ukuran, vp.berat_gram,
        pr.nama_produk, pr.deskripsi,
        (SELECT fp.file_foto FROM foto_produk fp WHERE fp.id_produk = pr.id_produk ORDER BY fp.id_foto ASC LIMIT 1) AS file_foto
      FROM detail_pesanan dp
      LEFT JOIN varian_produk vp ON dp.id_varian = vp.id_varian
      LEFT JOIN produk pr ON vp.id_produk = pr.id_produk
      WHERE dp.id_pesanan = ?
      ORDER BY dp.id_detail ASC
      `, [id]);

    const subtotal = items.reduce((total, item) => total + Number(item.subtotal || 0), 0);
    const totalBerat = items.reduce((total, item) => total + Number(item.berat_gram || 1000) * Number(item.qty || 0), 0);
    const orderIdAsli = pesanan.order_id || midtransResponse.order_id || `PESANAN-${pesanan.id_pesanan}`;

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
        transaction_id: midtransResponse.transaction_id || pesanan.transaction_id || null,
        transaction_status: pesanan.status_bayar || midtransResponse.transaction_status || pesanan.status_pesanan || "pending",
      },
      alamat: {
        id_alamat: pesanan.id_alamat, label_alamat: pesanan.label_alamat,
        nama_penerima: pesanan.nama_penerima, no_telp_penerima: pesanan.no_telp_penerima,
        informasi_tambahan: pesanan.informasi_tambahan, provinsi: pesanan.provinsi,
        kabupaten_kota: pesanan.kabupaten_kota, kecamatan: pesanan.kecamatan,
        desa: pesanan.desa, kota: pesanan.kota, kode_pos: pesanan.kode_pos, destination_id: pesanan.destination_id,
      },
      items: items.map((item) => ({
        id_detail: item.id_detail, id_varian: item.id_varian, id_produk: item.id_produk,
        nama_produk: item.nama_produk, warna: item.warna, ukuran: item.ukuran,
        harga: Number(item.harga_satuan || 0), qty: Number(item.qty || 0),
        berat_gram: Number(item.berat_gram || 1000), subtotal: Number(item.subtotal || 0),
        file_foto: item.file_foto,
      })),
      subtotal,
      pajak: Math.round(subtotal * 0.02),
      total_berat: totalBerat,
      total_pembayaran: Number(pesanan.total_tagihan || 0),
      pengiriman: {
        kurir_code: pesanan.id_kurir === 1 ? "jne" : pesanan.id_kurir === 2 ? "jnt" : pesanan.id_kurir === 3 ? "sicepat" : pesanan.id_kurir === 4 ? "anteraja" : null,
        kurir_name: pesanan.nama_kurir || null,
        ongkir: Math.max(0, Number(pesanan.total_tagihan || 0) - subtotal - Math.round(subtotal * 0.02) + Number(pesanan.nominal_voucher || 0)),
      },
      kode_voucher: pesanan.kode_voucher || null,
      nominal_voucher: Number(pesanan.nominal_voucher || 0),
      status_pesanan: pesanan.status_pesanan,
      status_bayar: pesanan.status_bayar,
      tgl_pesan: pesanan.tgl_pesan,
      tgl_terkirim: pesanan.tgl_terkirim,
      no_resi: pesanan.no_resi,
    };

    res.json({ message: "Detail pesanan berhasil diambil", data: paymentData });
  } catch (error) {
    console.error("Get detail pesanan error:", error);
    res.status(500).json({ message: "Gagal mengambil detail pesanan", error: error.message });
  }
};

// Customer mengkonfirmasi pesanan selesai (dari status terkirim)
const konfirmasiSelesai = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id } = req.params;

    if (!id_user) return res.status(401).json({ message: "Unauthorized" });

    // Validasi pesanan milik customer ini dan statusnya terkirim
    const [rows] = await db.query(
      "SELECT id_pesanan, status_pesanan, id_user FROM pesanan WHERE id_pesanan = ? AND id_user = ?",
      [id, id_user]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    if (rows[0].status_pesanan !== "terkirim")
      return res.status(400).json({ message: "Pesanan harus berstatus 'terkirim' untuk dikonfirmasi selesai" });

    await db.query(
      "UPDATE pesanan SET status_pesanan = 'selesai' WHERE id_pesanan = ?",
      [id]
    );

    res.json({ message: "Pesanan berhasil dikonfirmasi selesai" });
  } catch (error) {
    console.error("Konfirmasi selesai error:", error);
    res.status(500).json({ message: "Gagal mengkonfirmasi pesanan", error: error.message });
  }
};

// Customer submit ulasan/rating setelah pesanan selesai
const submitUlasan = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id_pesanan, id_produk, rating, komentar } = req.body;

    if (!id_user) return res.status(401).json({ message: "Unauthorized" });
    if (!id_produk || !rating) return res.status(400).json({ message: "id_produk dan rating wajib diisi" });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating harus antara 1 - 5" });

    // Validasi pesanan milik customer dan statusnya selesai
    if (id_pesanan) {
      const [pesanan] = await db.query(
        "SELECT id_pesanan, status_pesanan FROM pesanan WHERE id_pesanan = ? AND id_user = ?",
        [id_pesanan, id_user]
      );
      if (pesanan.length === 0)
        return res.status(404).json({ message: "Pesanan tidak ditemukan" });
      if (pesanan[0].status_pesanan !== "selesai")
        return res.status(400).json({ message: "Hanya bisa memberi ulasan pada pesanan yang sudah selesai" });

      // Cek apakah sudah pernah ulasan produk ini dari pesanan ini
      const [existing] = await db.query(
        "SELECT id_ulasan FROM ulasan WHERE id_pesanan = ? AND id_produk = ? AND id_user = ?",
        [id_pesanan, id_produk, id_user]
      );
      if (existing.length > 0) {
        // Update ulasan yang sudah ada
        await db.query(
          "UPDATE ulasan SET rating = ?, komentar = ?, tgl_ulasan = CURDATE() WHERE id_ulasan = ?",
          [rating, komentar || null, existing[0].id_ulasan]
        );
        return res.json({ message: "Ulasan berhasil diperbarui" });
      }
    }

    // Insert ulasan baru
    await db.query(
      "INSERT INTO ulasan (id_produk, id_user, id_pesanan, rating, komentar, tgl_ulasan) VALUES (?, ?, ?, ?, ?, CURDATE())",
      [id_produk, id_user, id_pesanan || null, rating, komentar || null]
    );

    res.status(201).json({ message: "Ulasan berhasil disimpan" });
  } catch (error) {
    console.error("Submit ulasan error:", error);
    res.status(500).json({ message: "Gagal menyimpan ulasan", error: error.message });
  }
};

// Cek ulasan yang sudah diberikan untuk suatu pesanan (termasuk nilai rating & komentar)
const getUlasanByPesanan = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id_produk, rating, komentar FROM ulasan WHERE id_pesanan = ? AND id_user = ?",
      [id, id_user]
    );

    // Kembalikan sebagai map: { [id_produk]: { rating, komentar } }
    const ulasanMap = {};
    rows.forEach((r) => {
      ulasanMap[r.id_produk] = { rating: r.rating, komentar: r.komentar || "" };
    });

    res.json({ ulasan: ulasanMap });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data ulasan", error: error.message });
  }
};

module.exports = {
  getAllPesananAdmin,
  getDetailPesananAdmin,
  updateStatusPesananAdmin,
  getRiwayatPesanan,
  getDetailPesanan,
  konfirmasiSelesai,
  submitUlasan,
  getUlasanByPesanan,
};
