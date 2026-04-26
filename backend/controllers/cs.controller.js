const db = require('../config/db');

const sendPesan = async (req, res) => {
  try {
    const { subjek, isi_pesan } = req.body;
    await db.query('INSERT INTO pesan_cs (id_user, subjek, isi_pesan, tgl_kirim, status_balasan) VALUES (?,?,?,NOW(),?)',
      [req.user.id_user, subjek, isi_pesan, 'Belum Dibalas']);
    res.status(201).json({ message: 'Pesan terkirim' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getMyPesan = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pesan_cs WHERE id_user=? ORDER BY tgl_kirim DESC', [req.user.id_user]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getAllPesan = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pc.*, u.nama_lengkap FROM pesan_cs pc
      JOIN users u ON pc.id_user=u.id_user ORDER BY pc.tgl_kirim DESC`);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const replyPesan = async (req, res) => {
  try {
    await db.query('UPDATE pesan_cs SET status_balasan=? WHERE id_pesan=?', ['Sudah Dibalas', req.params.id]);
    res.json({ message: 'Pesan ditandai sudah dibalas' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { sendPesan, getMyPesan, getAllPesan, replyPesan };
