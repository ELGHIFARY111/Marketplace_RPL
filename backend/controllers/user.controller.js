const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [users] = await db.query(
      'SELECT id_user, nama_lengkap, email, no_telp, tgl_daftar, level_akses FROM users WHERE id_user = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_lengkap, email, no_telp, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        'UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ?, password = ? WHERE id_user = ?',
        [nama_lengkap, email, no_telp, hashedPassword, userId]
      );
    } else {
      await db.query(
        'UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ? WHERE id_user = ?',
        [nama_lengkap, email, no_telp, userId]
      );
    }

    // Get updated user data to return
    const [updatedUsers] = await db.query(
      'SELECT id_user, nama_lengkap, email, no_telp, level_akses FROM users WHERE id_user = ?',
      [userId]
    );

    res.json({ message: 'Profil berhasil diperbarui', user: updatedUsers[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await db.query('DELETE FROM users WHERE id_user = ?', [userId]);
    res.json({ message: `User ${userId} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser
};
