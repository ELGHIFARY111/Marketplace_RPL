const db = require('../config/db');

const getAllKategori = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM kategori');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createKategori = async (req, res) => {
  try {
    const { nama_kategori, icon_kategori } = req.body;
    await db.query('INSERT INTO kategori (nama_kategori, icon_kategori) VALUES (?,?)', [nama_kategori, icon_kategori]);
    res.status(201).json({ message: 'Kategori dibuat' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateKategori = async (req, res) => {
  try {
    const { nama_kategori, icon_kategori } = req.body;
    await db.query('UPDATE kategori SET nama_kategori=?, icon_kategori=? WHERE id_kategori=?',
      [nama_kategori, icon_kategori, req.params.id]);
    res.json({ message: 'Kategori diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteKategori = async (req, res) => {
  try {
    await db.query('DELETE FROM kategori WHERE id_kategori = ?', [req.params.id]);
    res.json({ message: 'Kategori dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllKategori, createKategori, updateKategori, deleteKategori };
