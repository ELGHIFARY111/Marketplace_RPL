const db = require('../config/db');

const getAllKurir = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM kurir');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createKurir = async (req, res) => {
  try {
    const { nama_kurir, ongkos_kirim } = req.body;
    await db.query('INSERT INTO kurir (nama_kurir, ongkos_kirim) VALUES (?,?)', [nama_kurir, ongkos_kirim]);
    res.status(201).json({ message: 'Kurir ditambahkan' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateKurir = async (req, res) => {
  try {
    const { nama_kurir, ongkos_kirim } = req.body;
    await db.query('UPDATE kurir SET nama_kurir=?, ongkos_kirim=? WHERE id_kurir=?',
      [nama_kurir, ongkos_kirim, req.params.id]);
    res.json({ message: 'Kurir diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteKurir = async (req, res) => {
  try {
    await db.query('DELETE FROM kurir WHERE id_kurir=?', [req.params.id]);
    res.json({ message: 'Kurir dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllKurir, createKurir, updateKurir, deleteKurir };
