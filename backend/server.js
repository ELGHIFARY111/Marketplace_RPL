require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth',     require('./routes/auth.routes'));
app.use('/api/users',    require('./routes/user.routes'));
app.use('/api/produk',   require('./routes/produk.routes'));
app.use('/api/kategori', require('./routes/kategori.routes'));
app.use('/api/keranjang',require('./routes/keranjang.routes'));
app.use('/api/pesanan',  require('./routes/pesanan.routes'));
app.use('/api/promosi',  require('./routes/promosi.routes'));
app.use('/api/voucher',  require('./routes/voucher.routes'));
app.use('/api/ulasan',   require('./routes/ulasan.routes'));
app.use('/api/cs',       require('./routes/cs.routes'));
app.use('/api/kurir',    require('./routes/kurir.routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Zenvy Apparel API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
