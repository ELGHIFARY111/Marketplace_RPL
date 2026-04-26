const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_user, nama_lengkap, email, no_telp, tgl_daftar, level_akses FROM users');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getUserById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_user, nama_lengkap, email, no_telp, tgl_daftar, level_akses FROM users WHERE id_user = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateUser = async (req, res) => {
  try {
    const { nama_lengkap, no_telp, password, level_akses } = req.body;
    let hashed = null;
    if (password) hashed = await bcrypt.hash(password, 10);

    await db.query(
      `UPDATE users SET nama_lengkap=?, no_telp=?${hashed ? ', password=?' : ''}${level_akses ? ', level_akses=?' : ''} WHERE id_user=?`,
      [nama_lengkap, no_telp, ...(hashed ? [hashed] : []), ...(level_akses ? [level_akses] : []), req.params.id]
    );
    res.json({ message: 'User diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteUser = async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id_user = ?', [req.params.id]);
    res.json({ message: 'User dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
