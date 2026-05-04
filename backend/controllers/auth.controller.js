const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'zenvy_secret_key_2024';

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

module.exports = { login, register };
