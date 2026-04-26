const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { nama_lengkap, email, password, no_telp } = req.body;
    const [existing] = await db.query('SELECT id_user FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(409).json({ message: 'Email sudah terdaftar' });

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (nama_lengkap, email, password, no_telp, tgl_daftar, level_akses) VALUES (?,?,?,?,NOW(),?)',
      [nama_lengkap, email, hashed, no_telp, 'customer']
    );
    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ message: 'Email atau password salah' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Email atau password salah' });

    const token = jwt.sign(
      { id_user: user.id_user, level_akses: user.level_akses },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ token, level_akses: user.level_akses, nama_lengkap: user.nama_lengkap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  // TODO: implement email sending with reset link
  res.json({ message: 'Link reset password telah dikirim ke email (belum diimplementasi)' });
};

// POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  // TODO: implement token verification & password update
  res.json({ message: 'Reset password (belum diimplementasi)' });
};

module.exports = { register, login, forgotPassword, resetPassword };
