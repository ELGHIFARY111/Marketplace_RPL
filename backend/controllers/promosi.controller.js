const db = require('../config/db');

const getAllPromos = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT pr.id_promosi, pr.id_produk, pr.persentase_diskon, pr.batas_waktu, p.nama_produk 
       FROM promosi pr 
       LEFT JOIN produk p ON pr.id_produk = p.id_produk 
       ORDER BY pr.id_promosi DESC`
    );
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPromoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT pr.id_promosi, pr.id_produk, pr.persentase_diskon, pr.batas_waktu, p.nama_produk 
       FROM promosi pr 
       LEFT JOIN produk p ON pr.id_produk = p.id_produk 
       WHERE pr.id_promosi = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Diskon tidak ditemukan' });
    }
    res.json({ data: rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPromo = async (req, res) => {
  try {
    const { id_produk, produk, persentase_diskon, diskon, batas_waktu, tanggalKadaluarsa } = req.body;
    
    const productIdVal = id_produk || produk;
    const discountVal = persentase_diskon || diskon;
    const expiryVal = batas_waktu || tanggalKadaluarsa;

    if (!productIdVal || discountVal === undefined || !expiryVal) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    await db.query(
      'INSERT INTO promosi (id_produk, persentase_diskon, batas_waktu) VALUES (?, ?, ?)',
      [productIdVal, discountVal, expiryVal]
    );

    res.status(201).json({ message: 'Promo created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_produk, produk, persentase_diskon, diskon, batas_waktu, tanggalKadaluarsa } = req.body;

    const productIdVal = id_produk || produk;
    const discountVal = persentase_diskon || diskon;
    const expiryVal = batas_waktu || tanggalKadaluarsa;

    if (!productIdVal || discountVal === undefined || !expiryVal) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const [result] = await db.query(
      'UPDATE promosi SET id_produk = ?, persentase_diskon = ?, batas_waktu = ? WHERE id_promosi = ?',
      [productIdVal, discountVal, expiryVal, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Diskon tidak ditemukan' });
    }

    res.json({ message: `Promo ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM promosi WHERE id_promosi = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Diskon tidak ditemukan' });
    }

    res.json({ message: `Promo ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo
};
