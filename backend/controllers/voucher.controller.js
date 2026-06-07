const db = require('../config/db');

const getAllVouchers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id_voucher, kode_voucher, nominal_diskon, kuota, batas_waktu FROM voucher ORDER BY id_voucher DESC'
    );
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVoucherById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT id_voucher, kode_voucher, nominal_diskon, kuota, batas_waktu FROM voucher WHERE id_voucher = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Voucher tidak ditemukan' });
    }
    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVoucher = async (req, res) => {
  try {
    const { code, kode, kode_voucher, discount, diskon, nominal_diskon, max_usage, kuota, expiry_date, tanggalKadaluarsa, batas_waktu } = req.body;
    
    const codeVal = code || kode || kode_voucher;
    const discountVal = discount || diskon || nominal_diskon;
    const kuotaVal = max_usage || kuota;
    const expiryVal = expiry_date || tanggalKadaluarsa || batas_waktu;

    if (!codeVal || discountVal === undefined || kuotaVal === undefined || !expiryVal) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    await db.query(
      'INSERT INTO voucher (kode_voucher, nominal_diskon, kuota, batas_waktu) VALUES (?, ?, ?, ?)',
      [codeVal, discountVal, kuotaVal, expiryVal]
    );

    res.status(201).json({ message: 'Voucher created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, kode, kode_voucher, discount, diskon, nominal_diskon, max_usage, kuota, expiry_date, tanggalKadaluarsa, batas_waktu } = req.body;

    const codeVal = code || kode || kode_voucher;
    const discountVal = discount || diskon || nominal_diskon;
    const kuotaVal = max_usage || kuota;
    const expiryVal = expiry_date || tanggalKadaluarsa || batas_waktu;

    if (!codeVal || discountVal === undefined || kuotaVal === undefined || !expiryVal) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const [result] = await db.query(
      'UPDATE voucher SET kode_voucher = ?, nominal_diskon = ?, kuota = ?, batas_waktu = ? WHERE id_voucher = ?',
      [codeVal, discountVal, kuotaVal, expiryVal, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Voucher tidak ditemukan' });
    }

    res.json({ message: `Voucher ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM voucher WHERE id_voucher = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Voucher tidak ditemukan' });
    }

    res.json({ message: `Voucher ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ valid: false, message: 'Kode kupon wajib diisi' });
    }

    const [rows] = await db.query(
      'SELECT id_voucher, kode_voucher, nominal_diskon, kuota, batas_waktu FROM voucher WHERE kode_voucher = ?',
      [code]
    );

    if (rows.length === 0) {
      return res.status(404).json({ valid: false, message: 'Kupon tidak ditemukan' });
    }

    const voucher = rows[0];

    if (voucher.kuota <= 0) {
      return res.status(400).json({ valid: false, message: 'Kuota kupon telah habis' });
    }

    const batasWaktuDate = new Date(voucher.batas_waktu);
    const now = new Date();
    if (batasWaktuDate < now) {
      return res.status(400).json({ valid: false, message: 'Kupon telah kadaluarsa' });
    }

    res.json({
      valid: true,
      message: `Kupon ${code} valid`,
      voucher: {
        id_voucher: voucher.id_voucher,
        kode_voucher: voucher.kode_voucher,
        nominal_diskon: voucher.nominal_diskon
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  validateVoucher
};
