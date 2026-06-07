const db = require('../config/db');

// Helper to make sure `balasan` column exists in the database table
const checkBalasanColumn = async () => {
  try {
    const [columns] = await db.query("SHOW COLUMNS FROM pesan_cs LIKE 'balasan'");
    if (columns.length === 0) {
      await db.query("ALTER TABLE pesan_cs ADD COLUMN balasan TEXT");
      console.log("Added column 'balasan' to 'pesan_cs' table successfully.");
    }
  } catch (err) {
    console.error("Error checking or adding column 'balasan':", err);
  }
};

checkBalasanColumn();

const getAllMessages = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, u.nama_lengkap, u.email 
       FROM pesan_cs p 
       JOIN users u ON p.id_user = u.id_user 
       ORDER BY p.id_pesan DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userId = req.user.id || req.user.id_user || req.user.userId;
    const [rows] = await db.query(
      'SELECT * FROM pesan_cs WHERE id_user = ? ORDER BY id_pesan DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const userId = req.user.id || req.user.id_user || req.user.userId;
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ message: 'Subjek dan isi pesan wajib diisi' });
    }
    await db.query(
      'INSERT INTO pesan_cs (id_user, subjek, isi_pesan, tgl_kirim, status_balasan) VALUES (?, ?, ?, NOW(), ?)',
      [userId, subject, message, 'belum dibalas']
    );
    res.status(201).json({ message: 'Pesan berhasil dikirim ke CS' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const replyMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    if (!reply) {
      return res.status(400).json({ message: 'Isi balasan wajib diisi' });
    }
    const [result] = await db.query(
      'UPDATE pesan_cs SET balasan = ?, status_balasan = ? WHERE id_pesan = ?',
      [reply, 'dibalas', id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pesan tidak ditemukan' });
    }
    res.json({ message: 'Pesan berhasil dibalas' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT p.*, u.nama_lengkap, u.email 
       FROM pesan_cs p 
       JOIN users u ON p.id_user = u.id_user 
       WHERE p.id_pesan = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pesan tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMessages,
  getUserMessages,
  createMessage,
  replyMessage,
  getMessageById
};
