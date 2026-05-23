const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Ambil profil admin
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId; // dari verifyAdmin middleware
    const [admins] = await db.query(
      'SELECT id_user, nama_lengkap, email, no_telp, level_akses FROM users WHERE id_user = ? AND level_akses = "admin"',
      [adminId]
    );

    if (admins.length === 0) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    res.json(admins[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update profil admin
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { nama_lengkap, email, no_telp, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        'UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ?, password = ? WHERE id_user = ? AND level_akses = "admin"',
        [nama_lengkap, email, no_telp, hashedPassword, adminId]
      );
    } else {
      await db.query(
        'UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ? WHERE id_user = ? AND level_akses = "admin"',
        [nama_lengkap, email, no_telp, adminId]
      );
    }

    const [updatedAdmins] = await db.query(
      'SELECT id_user, nama_lengkap, email, no_telp, level_akses FROM users WHERE id_user = ? AND level_akses = "admin"',
      [adminId]
    );

    res.json({ message: 'Profil admin berhasil diperbarui', admin: updatedAdmins[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hapus admin (opsional)
const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.adminId;
    await db.query('DELETE FROM users WHERE id_user = ? AND level_akses = "admin"', [adminId]);
    res.json({ message: `Admin ${adminId} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
  deleteAdmin
};