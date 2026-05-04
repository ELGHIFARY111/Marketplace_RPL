const db = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id_produk,
        p.nama_produk AS nama,
        p.deskripsi,
        COALESCE(SUM(v.stok), 0) AS stok,
        COALESCE(MIN(v.harga), 0) AS harga,
        c.nama_kategori AS kategori,
        (SELECT file_foto FROM foto_produk WHERE id_produk = p.id_produk LIMIT 1) AS foto,
        (SELECT ROUND(AVG(rating), 1) FROM ulasan WHERE id_produk = p.id_produk) AS avg_rating,
        (SELECT COUNT(*) FROM ulasan WHERE id_produk = p.id_produk) AS total_ulasan,
        GROUP_CONCAT(DISTINCT v.warna) AS warna_list,
        GROUP_CONCAT(DISTINCT v.ukuran) AS ukuran_list
      FROM produk p
      LEFT JOIN kategori c ON p.id_kategori = c.id_kategori
      LEFT JOIN varian_produk v ON v.id_produk = p.id_produk 
      GROUP BY p.id_produk, p.nama_produk, p.deskripsi, c.nama_kategori
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch produk + kategori
    const [produk] = await db.query(
      `SELECT p.*, c.nama_kategori AS kategori 
       FROM produk p 
       LEFT JOIN kategori c ON p.id_kategori = c.id_kategori 
       WHERE p.id_produk = ?`, 
      [id]
    );
    if (produk.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });

    // Fetch semua varian
    const [varian] = await db.query(
      'SELECT id_varian, warna, ukuran, harga, stok FROM varian_produk WHERE id_produk = ?', 
      [id]
    );
    
    // Fetch semua foto
    const [foto] = await db.query('SELECT file_foto FROM foto_produk WHERE id_produk = ?', [id]);

    // Fetch rata-rata rating
    const [ratingResult] = await db.query(
      'SELECT ROUND(AVG(rating), 1) AS avg_rating, COUNT(*) AS total_ulasan FROM ulasan WHERE id_produk = ?', 
      [id]
    );

    const productData = {
      id_produk: produk[0].id_produk,
      name: produk[0].nama_produk,
      description: produk[0].deskripsi,
      category_id: produk[0].id_kategori,
      kategori: produk[0].kategori,
      price: varian.length > 0 ? Math.min(...varian.map(v => v.harga)) : 0,
      stock: varian.reduce((sum, v) => sum + v.stok, 0),
      images: foto.map(f => f.file_foto),
      varian: varian,
      avg_rating: ratingResult[0]?.avg_rating || 0,
      total_ulasan: ratingResult[0]?.total_ulasan || 0
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

    // Handle existing images deletion
    let existing_images = req.body.existing_images || [];
    if (!Array.isArray(existing_images)) {
      existing_images = [existing_images];
    }

    const [currentPhotos] = await connection.query('SELECT file_foto FROM foto_produk WHERE id_produk = ?', [id]);
    const currentFilenames = currentPhotos.map(p => p.file_foto);
    const photosToDelete = currentFilenames.filter(f => !existing_images.includes(f));

    if (photosToDelete.length > 0) {
      await connection.query('DELETE FROM foto_produk WHERE id_produk = ? AND file_foto IN (?)', [id, photosToDelete]);
    }

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

const getVarianByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const [varians] = await db.query('SELECT * FROM varian_produk WHERE id_produk = ?', [id]);
    res.json(varians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getVarianByProductId
};