const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetPasswordEmail } = require('../utils/mailer');

const JWT_SECRET = process.env.JWT_SECRET || 'zenvy_secret_key_2024';
const RESET_SECRET = (process.env.JWT_SECRET || 'zenvy_secret_key_2024') + '_reset';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // Cari user berdasarkan email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const user = users[0];

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id_user, 
        email: user.email, 
        level: user.level_akses 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id_user,
        nama: user.nama_lengkap,
        email: user.email,
        no_telp: user.no_telp,
        level: user.level_akses
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { nama_lengkap, email, password, no_telp } = req.body;

    if (!nama_lengkap || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
    }

    // Cek apakah email sudah terdaftar
    const [existing] = await db.query('SELECT id_user FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user baru
    const [result] = await db.query(
      'INSERT INTO users (nama_lengkap, email, password, no_telp, tgl_daftar, level_akses) VALUES (?, ?, ?, ?, NOW(), ?)',
      [nama_lengkap, email, hashedPassword, no_telp || null, 'customer']
    );

    // Generate token langsung setelah register
    const token = jwt.sign(
      { 
        id: result.insertId, 
        email, 
        level: 'customer' 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registrasi berhasil',
      token,
      user: {
        id: result.insertId,
        nama: nama_lengkap,
        email,
        no_telp: no_telp || null,
        level: 'customer'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lupa Password: buat JWT token, kirim link ke email
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email wajib diisi' });
    }

    const [users] = await db.query(
      'SELECT id_user, nama_lengkap FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Email tidak terdaftar di sistem kami.' });
    }

    const user = users[0];

    // Buat JWT reset token (berlaku 1 jam)
    const resetToken = jwt.sign(
      { id: user.id_user, email, purpose: 'reset_password' },
      RESET_SECRET,
      { expiresIn: '1h' }
    );

    // Kirim email dengan link yang mengandung token JWT
    const resetLink = `${FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    await sendResetPasswordEmail(email, resetLink);

    res.json({ message: 'Jika email terdaftar, link reset password telah dikirim.' });
  } catch (error) {
    console.error('Forgot password error:', error.response?.data || error.message || error);
    res.status(500).json({ 
      error: 'Gagal mengirim email. Coba beberapa saat lagi.',
      details: error.response?.data || error.message 
    });
  }
};

// Reset Password: validasi JWT token, update password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token dan password baru wajib diisi' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter' });
    }

    // Verifikasi JWT reset token
    let decoded;
    try {
      decoded = jwt.verify(token, RESET_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Link reset password tidak valid atau sudah kadaluarsa.' });
    }

    if (decoded.purpose !== 'reset_password') {
      return res.status(400).json({ message: 'Token tidak valid.' });
    }

    // Pastikan user masih ada di DB
    const [users] = await db.query(
      'SELECT id_user FROM users WHERE id_user = ?',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'Akun tidak ditemukan.' });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    await db.query(
      'UPDATE users SET password = ? WHERE id_user = ?',
      [hashedPassword, decoded.id]
    );

    res.json({ message: 'Password berhasil direset. Silakan login dengan password baru.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register, forgotPassword, resetPassword };
