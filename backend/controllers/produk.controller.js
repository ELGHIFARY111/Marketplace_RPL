const db = require('../config/db');

const getAllProduk = async (req, res) => {
  try {
    const { search, kategori } = req.query;
    let query = `
      SELECT p.*, k.nama_kategori,
        (SELECT file_foto FROM foto_produk WHERE id_produk = p.id_produk LIMIT 1) AS foto_utama,
        IFNULL(pr.persentase_diskon, 0) AS diskon,
        MIN(v.harga) AS harga_min
      FROM produk p
      LEFT JOIN kategori k ON p.id_kategori = k.id_kategori
      LEFT JOIN promosi pr ON pr.id_produk = p.id_produk AND pr.batas_waktu > NOW()
      LEFT JOIN varian_produk v ON v.id_produk = p.id_produk
      WHERE 1=1
    `;
    const params = [];
    if (search) { query += ' AND p.nama_produk LIKE ?'; params.push(`%${search}%`); }
    if (kategori) { query += ' AND p.id_kategori = ?'; params.push(kategori); }
    query += ' GROUP BY p.id_produk';
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getProdukById = async (req, res) => {
  try {
    const [produk] = await db.query(`
      SELECT p.*, k.nama_kategori, IFNULL(pr.persentase_diskon,0) AS diskon
      FROM produk p
      LEFT JOIN kategori k ON p.id_kategori = k.id_kategori
      LEFT JOIN promosi pr ON pr.id_produk = p.id_produk AND pr.batas_waktu > NOW()
      WHERE p.id_produk = ?`, [req.params.id]);
    if (!produk.length) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const [foto] = await db.query('SELECT * FROM foto_produk WHERE id_produk = ?', [req.params.id]);
    const [varian] = await db.query('SELECT * FROM varian_produk WHERE id_produk = ?', [req.params.id]);
    const [ulasan] = await db.query(`
      SELECT u.*, us.nama_lengkap FROM ulasan u
      JOIN users us ON u.id_user = us.id_user
      WHERE u.id_produk = ? ORDER BY u.tgl_ulasan DESC`, [req.params.id]);

    res.json({ ...produk[0], foto, varian, ulasan });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createProduk = async (req, res) => {
  try {
    const { nama_produk, id_kategori, deskripsi } = req.body;
    const [result] = await db.query(
      'INSERT INTO produk (nama_produk, id_kategori, deskripsi) VALUES (?,?,?)',
      [nama_produk, id_kategori, deskripsi]
    );
    res.status(201).json({ message: 'Produk dibuat', id_produk: result.insertId });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateProduk = async (req, res) => {
  try {
    const { nama_produk, id_kategori, deskripsi } = req.body;
    await db.query('UPDATE produk SET nama_produk=?, id_kategori=?, deskripsi=? WHERE id_produk=?',
      [nama_produk, id_kategori, deskripsi, req.params.id]);
    res.json({ message: 'Produk diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteProduk = async (req, res) => {
  try {
    await db.query('DELETE FROM produk WHERE id_produk = ?', [req.params.id]);
    res.json({ message: 'Produk dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const addFoto = async (req, res) => {
  try {
    const files = req.files.map(f => [req.params.id, f.filename]);
    await db.query('INSERT INTO foto_produk (id_produk, file_foto) VALUES ?', [files]);
    res.status(201).json({ message: 'Foto ditambahkan' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteFoto = async (req, res) => {
  try {
    await db.query('DELETE FROM foto_produk WHERE id_foto = ?', [req.params.id_foto]);
    res.json({ message: 'Foto dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getVarianByProduk = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM varian_produk WHERE id_produk = ?', [req.params.id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const addVarian = async (req, res) => {
  try {
    const { warna, ukuran, harga, stok } = req.body;
    const sku = `${ukuran}_${Date.now()}`;
    await db.query('INSERT INTO varian_produk (id_produk, sku, warna, ukuran, harga, stok) VALUES (?,?,?,?,?,?)',
      [req.params.id, sku, warna, ukuran, harga, stok]);
    res.status(201).json({ message: 'Varian ditambahkan' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateVarian = async (req, res) => {
  try {
    const { warna, ukuran, harga, stok } = req.body;
    await db.query('UPDATE varian_produk SET warna=?, ukuran=?, harga=?, stok=? WHERE id_varian=?',
      [warna, ukuran, harga, stok, req.params.id_varian]);
    res.json({ message: 'Varian diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteVarian = async (req, res) => {
  try {
    await db.query('DELETE FROM varian_produk WHERE id_varian = ?', [req.params.id_varian]);
    res.json({ message: 'Varian dihapus' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = {
  getAllProduk, getProdukById, createProduk, updateProduk, deleteProduk,
  addFoto, deleteFoto,
  getVarianByProduk, addVarian, updateVarian, deleteVarian
};
