const db = require('../config/db');

const getAllPromosi = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pr.*, p.nama_produk FROM promosi pr
      JOIN produk p ON pr.id_produk=p.id_produk`);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createPromosi = async (req, res) => {
  try {
    const { id_produk, persentase_diskon, batas_waktu } = req.body;
    await db.query('INSERT INTO promosi (id_produk, persentase_diskon, batas_waktu) VALUES (?,?,?)',
      [id_produk, persentase_diskon, batas_waktu]);
    res.status(201).json({ message: 'Promosi dibuat' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updatePromosi = async (req, res) => {
  try {
    const { persentase_diskon, batas_waktu } = req.body;
    await db.query('UPDATE promosi SET persentase_diskon=?, batas_waktu=? WHERE id_promosi=?',
      [persentase_diskon, batas_waktu, req.params.id]);
    res.json({ message: 'Promosi diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deletePromosi = async (req, res) => {
  try {
    await db.query('DELETE FROM promosi WHERE id_promosi=?', [req.params.id]);
    res.json({ message: 'Promosi dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllPromosi, createPromosi, updatePromosi, deletePromosi };
