const db = require('../config/db');
const bcrypt = require('bcryptjs');
const cache = require('../utils/cache');

// Ambil profil admin
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId; // dari verifyAdmin middleware
    const [admins] = await db.query(
      "SELECT id_user, nama_lengkap, email, no_telp, level_akses FROM users WHERE id_user = ? AND level_akses = 'admin'",
      [adminId]
    );

    if (admins.length === 0) {
      return res.status(404).json({ message: 'Admin tidak ditemukan' });
    }

    res.json(admins[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update profil admin
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { nama_lengkap, email, no_telp, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        "UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ?, password = ? WHERE id_user = ? AND level_akses = 'admin'",
        [nama_lengkap, email, no_telp, hashedPassword, adminId]
      );
    } else {
      await db.query(
        "UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ? WHERE id_user = ? AND level_akses = 'admin'",
        [nama_lengkap, email, no_telp, adminId]
      );
    }

    const [updatedAdmins] = await db.query(
      "SELECT id_user, nama_lengkap, email, no_telp, level_akses FROM users WHERE id_user = ? AND level_akses = 'admin'",
      [adminId]
    );

    res.json({ message: 'Profil admin berhasil diperbarui', admin: updatedAdmins[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hapus admin (opsional)
const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.adminId;
    await db.query("DELETE FROM users WHERE id_user = ? AND level_akses = 'admin'", [adminId]);
    res.json({ message: `Admin ${adminId} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const CACHE_KEY = 'dashboard:stats';
    const cached = cache.get(CACHE_KEY);
    if (cached) return res.json(cached);

    // 1. Total Customer
    const [customerRows] = await db.query(
      "SELECT COUNT(*) AS total FROM users WHERE level_akses = 'customer'"
    );
    const totalCustomers = customerRows[0]?.total || 0;

    // 2. Orders Today
    const [ordersTodayRows] = await db.query(
      'SELECT COUNT(*) AS total FROM pesanan WHERE DATE(tgl_pesan) = CURDATE()'
    );
    const ordersToday = ordersTodayRows[0]?.total || 0;

    // 3. Revenue Month
    const [revenueMonthRows] = await db.query(
      `SELECT COALESCE(SUM(total_tagihan), 0) AS total FROM pesanan 
       WHERE MONTH(tgl_pesan) = MONTH(CURDATE()) AND YEAR(tgl_pesan) = YEAR(CURDATE())
       AND status_pesanan NOT IN ('dibatalkan', 'gagal')`
    );
    const revenueMonth = revenueMonthRows[0]?.total || 0;

    // 4. Total Products
    const [productRows] = await db.query('SELECT COUNT(*) AS total FROM produk');
    const totalProducts = productRows[0]?.total || 0;

    // 5. Sales Monthly (6 months)
    const [salesMonthlyRows] = await db.query(
      `SELECT DATE_FORMAT(tgl_pesan, '%b') AS month, COALESCE(SUM(total_tagihan), 0) AS sales
       FROM pesanan
       WHERE tgl_pesan >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
       AND status_pesanan NOT IN ('dibatalkan', 'gagal')
       GROUP BY YEAR(tgl_pesan), MONTH(tgl_pesan), DATE_FORMAT(tgl_pesan, '%b')
       ORDER BY YEAR(tgl_pesan) ASC, MONTH(tgl_pesan) ASC`
    );

    // 6. Order Status
    const [orderStatusRows] = await db.query(
      'SELECT status_pesanan AS name, COUNT(*) AS value FROM pesanan GROUP BY status_pesanan'
    );

    // 7. Weekly Orders (7 days)
    const [weeklyOrdersRows] = await db.query(
      `SELECT DATE_FORMAT(tgl_pesan, '%a') AS day, COUNT(*) AS total
       FROM pesanan
       WHERE tgl_pesan >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       GROUP BY DATE(tgl_pesan), DATE_FORMAT(tgl_pesan, '%a')
       ORDER BY DATE(tgl_pesan) ASC`
    );

    // 8. Best Selling Products
    const [bestSellingRows] = await db.query(
      `SELECT p.nama_produk AS name, SUM(dp.qty) AS sold
       FROM detail_pesanan dp
       JOIN varian_produk vp ON dp.id_varian = vp.id_varian
       JOIN produk p ON vp.id_produk = p.id_produk
       GROUP BY p.id_produk, p.nama_produk
       ORDER BY sold DESC
       LIMIT 5`
    );

    // 9. Recent Activity
    const [recentOrders] = await db.query(
      `SELECT id_pesanan, total_tagihan, status_pesanan, tgl_pesan
       FROM pesanan ORDER BY id_pesanan DESC LIMIT 5`
    );

    const [lowStockItems] = await db.query(
      `SELECT p.nama_produk, vp.warna, vp.ukuran, vp.stok
       FROM varian_produk vp
       JOIN produk p ON vp.id_produk = p.id_produk
       WHERE vp.stok <= 5 LIMIT 3`
    );

    const result = {
      stats: {
        totalCustomers,
        ordersToday,
        revenueMonth,
        totalProducts,
      },
      salesMonthly: salesMonthlyRows.length > 0 ? salesMonthlyRows : [
        { month: 'Jan', sales: 0 },
        { month: 'Feb', sales: 0 },
        { month: 'Mar', sales: 0 },
        { month: 'Apr', sales: 0 },
        { month: 'Mei', sales: 0 },
        { month: 'Jun', sales: 0 },
      ],
      orderStatus: orderStatusRows.length > 0 ? orderStatusRows : [
        { name: 'selesai', value: 0 },
        { name: 'diproses', value: 0 },
        { name: 'dibatalkan', value: 0 },
      ],
      weeklyOrders: weeklyOrdersRows.length > 0 ? weeklyOrdersRows : [
        { day: 'Sen', total: 0 },
        { day: 'Sel', total: 0 },
        { day: 'Rab', total: 0 },
        { day: 'Kam', total: 0 },
        { day: 'Jum', total: 0 },
        { day: 'Sab', total: 0 },
        { day: 'Min', total: 0 },
      ],
      bestSelling: bestSellingRows.length > 0 ? bestSellingRows : [
        { name: 'Belum ada data', sold: 0 }
      ],
      recentOrders,
      lowStockItems,
    };

    cache.set(CACHE_KEY, result, 120); // cache 2 menit
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id_user, nama_lengkap, email, no_telp, tgl_daftar, level_akses FROM users ORDER BY id_user DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      'SELECT id_user, nama_lengkap, email, no_telp, level_akses FROM users WHERE id_user = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nama, email, telpon, level, password } = req.body;
    if (!nama || !email || !password || !level) {
      return res.status(400).json({ message: 'Mohon lengkapi semua field wajib' });
    }

    const [existing] = await db.query('SELECT id_user FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      'INSERT INTO users (nama_lengkap, email, no_telp, password, level_akses) VALUES (?, ?, ?, ?, ?)',
      [nama, email, telpon || '', hashedPassword, level]
    );

    res.status(201).json({ message: 'User berhasil dibuat', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, telpon, level, password } = req.body;

    if (!nama || !email || !level) {
      return res.status(400).json({ message: 'Mohon lengkapi nama, email, dan level akses' });
    }

    if (password && password.trim() !== '' && !password.startsWith('***')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        'UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ?, level_akses = ?, password = ? WHERE id_user = ?',
        [nama, email, telpon || '', level, hashedPassword, id]
      );
    } else {
      await db.query(
        'UPDATE users SET nama_lengkap = ?, email = ?, no_telp = ?, level_akses = ? WHERE id_user = ?',
        [nama, email, telpon || '', level, id]
      );
    }

    res.json({ message: 'User berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id) === Number(req.adminId)) {
      return res.status(400).json({ message: 'Anda tidak dapat menghapus akun Anda sendiri dari sini' });
    }
    const [result] = await db.query('DELETE FROM users WHERE id_user = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
  deleteAdmin,
  getDashboardStats,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserAdmin
};