const db = require('../config/db');

const createPesanan = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { id_alamat, id_kurir, id_voucher, items } = req.body;

    const [kurir] = await conn.query('SELECT ongkos_kirim FROM kurir WHERE id_kurir=?', [id_kurir]);
    let total = kurir[0].ongkos_kirim;
    items.forEach(i => total += i.harga_satuan * i.qty);

    if (id_voucher) {
      const [v] = await conn.query('SELECT * FROM voucher WHERE id_voucher=? AND kuota>0 AND batas_waktu>NOW()', [id_voucher]);
      if (v.length) {
        total -= v[0].nominal_diskon;
        await conn.query('UPDATE voucher SET kuota=kuota-1 WHERE id_voucher=?', [id_voucher]);
      }
    }

    const [order] = await conn.query(
      'INSERT INTO pesanan (id_user, id_alamat, id_kurir, id_voucher, tgl_pesan, total_tagihan, status_pesanan) VALUES (?,?,?,?,NOW(),?,?)',
      [req.user.id_user, id_alamat, id_kurir, id_voucher || null, Math.max(total, 0), 'Belum Bayar']
    );
    const id_pesanan = order.insertId;

    for (const item of items) {
      await conn.query(
        'INSERT INTO detail_pesanan (id_pesanan, id_varian, harga_satuan, qty, subtotal) VALUES (?,?,?,?,?)',
        [id_pesanan, item.id_varian, item.harga_satuan, item.qty, item.harga_satuan * item.qty]
      );
      await conn.query('UPDATE varian_produk SET stok=stok-? WHERE id_varian=?', [item.qty, item.id_varian]);
    }

    await conn.commit();
    res.status(201).json({ message: 'Pesanan dibuat', id_pesanan });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
};

const getMyPesanan = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pesanan WHERE id_user=? ORDER BY tgl_pesan DESC', [req.user.id_user]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getPesananById = async (req, res) => {
  try {
    const [pesanan] = await db.query('SELECT * FROM pesanan WHERE id_pesanan=?', [req.params.id]);
    if (!pesanan.length) return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    const [detail] = await db.query(`
      SELECT dp.*, v.warna, v.ukuran, p.nama_produk FROM detail_pesanan dp
      JOIN varian_produk v ON dp.id_varian=v.id_varian
      JOIN produk p ON v.id_produk=p.id_produk WHERE dp.id_pesanan=?`, [req.params.id]);
    const [pembayaran] = await db.query('SELECT * FROM pembayaran WHERE id_pesanan=?', [req.params.id]);
    res.json({ ...pesanan[0], detail, pembayaran: pembayaran[0] || null });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getAllPesanan = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT ps.*, u.nama_lengkap FROM pesanan ps
      JOIN users u ON ps.id_user=u.id_user ORDER BY ps.tgl_pesan DESC`);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateStatusPesanan = async (req, res) => {
  try {
    const { status_pesanan, ids } = req.body;
    const idList = ids || [req.params.id];
    await db.query('UPDATE pesanan SET status_pesanan=? WHERE id_pesanan IN (?)', [status_pesanan, idList]);
    res.json({ message: 'Status diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deletePesanan = async (req, res) => {
  try {
    await db.query('DELETE FROM pesanan WHERE id_pesanan=?', [req.params.id]);
    res.json({ message: 'Pesanan dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const konfirmasiBayar = async (req, res) => {
  try {
    const { metode_bayar } = req.body;
    const bukti = req.file ? req.file.filename : null;
    await db.query(
      'INSERT INTO pembayaran (id_pesanan, metode_bayar, bukti_transfer, tgl_bayar, status_bayar) VALUES (?,?,?,NOW(),?)',
      [req.params.id, metode_bayar, bukti, 'Pending']
    );
    res.status(201).json({ message: 'Konfirmasi pembayaran terkirim' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createPesanan, getMyPesanan, getPesananById, getAllPesanan, updateStatusPesanan, deletePesanan, konfirmasiBayar };
