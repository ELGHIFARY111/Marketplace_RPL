const db = require('../config/db');

const getAllVarians = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM varian_produk');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVarianById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM varian_produk WHERE id_varian = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Varian tidak ditemukan" });
    }

    const varian = rows[0];
    res.json({
      id_varian: varian.id_varian,
      sku: varian.sku,
      warna: varian.warna,
      ukuran: varian.ukuran,
      stok: varian.stok,
      harga: varian.harga,
      product_id: varian.id_produk
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVarian = async (req, res) => {
  try {
    const { sku, warna, ukuran, stok, harga, product_id } = req.body;

    const [result] = await db.query(
      'INSERT INTO varian_produk (id_produk, sku, warna, ukuran, harga, stok) VALUES (?, ?, ?, ?, ?, ?)',
      [product_id, sku, warna, ukuran, harga, stok]
    );

    res.status(201).json({ message: 'Varian created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVarian = async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, warna, ukuran, stok, harga } = req.body;

    await db.query(
      'UPDATE varian_produk SET sku = ?, warna = ?, ukuran = ?, harga = ?, stok = ? WHERE id_varian = ?',
      [sku, warna, ukuran, harga, stok, id]
    );

    res.json({ message: `Varian ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVarian = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM varian_produk WHERE id_varian = ?', [id]);

    res.json({ message: `Varian ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVarians,
  getVarianById,
  createVarian,
  updateVarian,
  deleteVarian
};
