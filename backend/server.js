const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/produk', require('./routes/produk.routes'));
app.use('/api/varian', require('./routes/varian.routes'));
app.use('/api/categories', require('./routes/kategori.routes'));
app.use('/api/keranjang', require('./routes/keranjang.routes'));
app.use('/api/pesanan', require('./routes/pesanan.routes'));
app.use('/api/ulasan', require('./routes/ulasan.routes'));
app.use('/api/promo', require('./routes/promosi.routes'));
app.use('/api/voucher', require('./routes/voucher.routes'));
app.use('/api/kurir', require('./routes/kurir.routes'));
app.use('/api/cs', require('./routes/cs.routes'));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
