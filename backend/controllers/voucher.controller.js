const db = require('../config/db');

const getAllVoucher = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM voucher ORDER BY batas_waktu DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const validateVoucher = async (req, res) => {
  try {
    const { kode_voucher } = req.body;
    const [rows] = await db.query(
      'SELECT * FROM voucher WHERE kode_voucher=? AND kuota>0 AND batas_waktu>NOW()', [kode_voucher]);
    if (!rows.length) return res.status(404).json({ message: 'Voucher tidak valid atau sudah habis' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createVoucher = async (req, res) => {
  try {
    const { kode_voucher, nominal_diskon, kuota, batas_waktu } = req.body;
    await db.query('INSERT INTO voucher (kode_voucher, nominal_diskon, kuota, batas_waktu) VALUES (?,?,?,?)',
      [kode_voucher, nominal_diskon, kuota, batas_waktu]);
    res.status(201).json({ message: 'Voucher dibuat' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateVoucher = async (req, res) => {
  try {
    const { kode_voucher, nominal_diskon, kuota, batas_waktu } = req.body;
    await db.query('UPDATE voucher SET kode_voucher=?, nominal_diskon=?, kuota=?, batas_waktu=? WHERE id_voucher=?',
      [kode_voucher, nominal_diskon, kuota, batas_waktu, req.params.id]);
    res.json({ message: 'Voucher diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteVoucher = async (req, res) => {
  try {
    await db.query('DELETE FROM voucher WHERE id_voucher=?', [req.params.id]);
    res.json({ message: 'Voucher dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllVoucher, validateVoucher, createVoucher, updateVoucher, deleteVoucher };
