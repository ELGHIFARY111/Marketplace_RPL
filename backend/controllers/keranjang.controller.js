const db = require('../config/db');

const getKeranjang = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT k.id_keranjang, k.qty, v.id_varian, v.warna, v.ukuran, v.harga, v.stok,
        p.id_produk, p.nama_produk,
        (SELECT file_foto FROM foto_produk WHERE id_produk = p.id_produk LIMIT 1) AS foto
      FROM keranjang k
      JOIN varian_produk v ON k.id_varian = v.id_varian
      JOIN produk p ON v.id_produk = p.id_produk
      WHERE k.id_user = ?`, [req.user.id_user]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const addToKeranjang = async (req, res) => {
  try {
    const { id_varian, qty } = req.body;
    const [existing] = await db.query(
      'SELECT id_keranjang, qty FROM keranjang WHERE id_user=? AND id_varian=?',
      [req.user.id_user, id_varian]
    );
    if (existing.length > 0) {
      await db.query('UPDATE keranjang SET qty=? WHERE id_keranjang=?',
        [existing[0].qty + qty, existing[0].id_keranjang]);
    } else {
      await db.query('INSERT INTO keranjang (id_user, id_varian, qty) VALUES (?,?,?)',
        [req.user.id_user, id_varian, qty]);
    }
    res.status(201).json({ message: 'Ditambahkan ke keranjang' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateKeranjang = async (req, res) => {
  try {
    const { qty } = req.body;
    if (qty <= 0) {
      await db.query('DELETE FROM keranjang WHERE id_keranjang=? AND id_user=?', [req.params.id, req.user.id_user]);
    } else {
      await db.query('UPDATE keranjang SET qty=? WHERE id_keranjang=? AND id_user=?', [qty, req.params.id, req.user.id_user]);
    }
    res.json({ message: 'Keranjang diperbarui' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const removeFromKeranjang = async (req, res) => {
  try {
    await db.query('DELETE FROM keranjang WHERE id_keranjang=? AND id_user=?', [req.params.id, req.user.id_user]);
    res.json({ message: 'Item dihapus dari keranjang' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getKeranjang, addToKeranjang, updateKeranjang, removeFromKeranjang };
