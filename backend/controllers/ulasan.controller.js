const db = require('../config/db');

const getUlasanByProduk = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.*, us.nama_lengkap FROM ulasan u
      JOIN users us ON u.id_user=us.id_user
      WHERE u.id_produk=? ORDER BY u.tgl_ulasan DESC`, [req.params.id_produk]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const addUlasan = async (req, res) => {
  try {
    const { id_produk, rating } = req.body;
    const [exists] = await db.query(
      'SELECT id_ulasan FROM ulasan WHERE id_user=? AND id_produk=?',
      [req.user.id_user, id_produk]);
    if (exists.length) return res.status(409).json({ message: 'Sudah memberi ulasan untuk produk ini' });
    await db.query('INSERT INTO ulasan (id_produk, id_user, rating, tgl_ulasan) VALUES (?,?,?,NOW())',
      [id_produk, req.user.id_user, rating]);
    res.status(201).json({ message: 'Ulasan ditambahkan' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getUlasanByProduk, addUlasan };
