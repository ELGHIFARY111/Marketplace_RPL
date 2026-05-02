const db = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id_produk,
        p.nama_produk AS nama,
        COALESCE(SUM(v.stok), 0) AS stok,
        c.nama_kategori AS kategori
      FROM produk p
      LEFT JOIN kategori c ON p.id_kategori = c.id_kategori
      -- FIX: Relasi menggunakan id_produk, bukan id_varian
      LEFT JOIN varian_produk v ON v.id_produk = p.id_produk 
      GROUP BY p.id_produk, p.nama_produk, c.nama_kategori
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [produk] = await db.query('SELECT * FROM produk WHERE id_produk = ?', [id]);
    if (produk.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const [varian] = await db.query('SELECT harga, stok FROM varian_produk WHERE id_produk = ? LIMIT 1', [id]);
    
    const [foto] = await db.query('SELECT file_foto FROM foto_produk WHERE id_produk = ?', [id]);

    const productData = {
      id_produk: produk[0].id_produk,
      name: produk[0].nama_produk,
      description: produk[0].deskripsi,
      category_id: produk[0].id_kategori,
      price: varian.length > 0 ? varian[0].harga : 0,
      stock: varian.length > 0 ? varian[0].stok : 0,
      images: foto.map(f => f.file_foto) 
    };

    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction(); 

    const { name, description, category_id, price, stock } = req.body;

    const [resultProduk] = await connection.query(
      'INSERT INTO produk (nama_produk, deskripsi, id_kategori) VALUES (?, ?, ?)',
      [name, description, category_id]
    );
    const newProductId = resultProduk.insertId;

    await connection.query(
      'INSERT INTO varian_produk (id_produk, sku, warna, ukuran, harga, stok) VALUES (?, ?, ?, ?, ?, ?)',
      [newProductId, `SKU-${newProductId}`, 'Default', 'All', price || 0, stock || 0]
    );

    if (req.files && req.files.length > 0) {
      const fotoQueries = req.files.map(file => {
        return connection.query(
          'INSERT INTO foto_produk (id_produk, file_foto) VALUES (?, ?)',
          [newProductId, file.filename]
        );
      });
      await Promise.all(fotoQueries);
    }

    await connection.commit();
    res.status(201).json({ message: 'Product created successfully', id: newProductId });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

const updateProduct = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const { id } = req.params;
    const { name, description, category_id, price, stock } = req.body;

    await connection.query(
      'UPDATE produk SET nama_produk = ?, deskripsi = ?, id_kategori = ? WHERE id_produk = ?',
      [name, description, category_id, id]
    );

    await connection.query(
      'UPDATE varian_produk SET harga = ?, stok = ? WHERE id_produk = ? LIMIT 1',
      [price || 0, stock || 0, id]
    );


    if (req.files && req.files.length > 0) {
      const fotoQueries = req.files.map(file => {
        return connection.query(
          'INSERT INTO foto_produk (id_produk, file_foto) VALUES (?, ?)',
          [id, file.filename]
        );
      });
      await Promise.all(fotoQueries);
    }

    await connection.commit();
    res.json({ message: `Product ${id} updated` });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

const deleteProduct = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const { id } = req.params;


    await connection.query('DELETE FROM foto_produk WHERE id_produk = ?', [id]);
    await connection.query('DELETE FROM varian_produk WHERE id_produk = ?', [id]);

    await connection.query('DELETE FROM produk WHERE id_produk = ?', [id]);

    await connection.commit();
    res.json({ message: `Product ${id} deleted` });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};