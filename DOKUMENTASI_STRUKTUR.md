# 📋 Dokumentasi Struktur Marketplace RPL (Zenfy)

## 📑 Daftar Isi
1. [Gambaran Umum](#gambaran-umum)
2. [Struktur Folder](#struktur-folder)
3. [Backend - Node.js/Express](#backend---nodejs-express)
4. [Frontend - React/Vite](#frontend---reactvite)
5. [Alur Kerja Aplikasi](#alur-kerja-aplikasi)
6. [Teknologi yang Digunakan](#teknologi-yang-digunakan)

---

## 🎯 Gambaran Umum

**Zenfy Marketplace** adalah aplikasi e-commerce yang terdiri dari:
- **Backend API**: REST API menggunakan Node.js + Express
- **Frontend**: Single Page Application (SPA) menggunakan React + Vite
- **Database**: MySQL untuk penyimpanan data

Aplikasi ini mendukung dua jenis pengguna:
- **Admin**: Mengelola produk, pesanan, kurir, promosi, customer service
- **Customer**: Browsing produk, keranjang belanja, checkout, riwayat pembelian

---

## 📁 Struktur Folder

```
Marketplace_RPL/
│
├── 📄 README.md                    # Dokumentasi awal
├── 📄 SETUP_LENGKAP.md            # Panduan setup lengkap
├── 📄 QUICK_START.md              # Quick start guide
├── 📄 OPEN_FRONTEND.md            # Petunjuk membuka frontend
├── 📄 CHECKLIST.md                # Checklist development
│
├── 📂 backend/                    # BACKEND SERVER
│   ├── 📄 server.js               # Entry point server
│   ├── 📄 package.json            # Dependencies backend
│   ├── 📄 .env                    # Variabel lingkungan (JANGAN COMMIT)
│   │
│   ├── 📂 config/
│   │   └── db.js                  # Konfigurasi koneksi MySQL
│   │
│   ├── 📂 database/
│   │   └── schema.sql             # Skema database SQL
│   │
│   ├── 📂 middleware/             # Middleware Express
│   │   ├── auth.middleware.js     # Verifikasi JWT token
│   │   └── upload.middleware.js   # Upload file images
│   │
│   ├── 📂 controllers/            # Business Logic (Logika Bisnis)
│   │   ├── auth.controller.js     # Login, Register, Logout
│   │   ├── user.controller.js     # Manajemen profil user
│   │   ├── produk.controller.js   # CRUD produk
│   │   ├── kategori.controller.js # CRUD kategori produk
│   │   ├── keranjang.controller.js# Manajemen keranjang belanja
│   │   ├── pesanan.controller.js  # Manajemen pesanan/transaksi
│   │   ├── kurir.controller.js    # Manajemen kurir pengiriman
│   │   ├── promosi.controller.js  # Manajemen promosi & diskon
│   │   ├── voucher.controller.js  # Manajemen voucher/kupon
│   │   ├── ulasan.controller.js   # Manajemen review produk
│   │   └── cs.controller.js       # Customer Service management
│   │
│   └── 📂 routes/                 # API Routes
│       ├── auth.routes.js         # POST /api/auth/* (login, register)
│       ├── user.routes.js         # GET/PUT /api/users/* (profil)
│       ├── produk.routes.js       # GET/POST/PUT/DELETE /api/produk/*
│       ├── kategori.routes.js     # GET/POST/PUT/DELETE /api/kategori/*
│       ├── keranjang.routes.js    # GET/POST/DELETE /api/keranjang/*
│       ├── pesanan.routes.js      # GET/POST/PUT /api/pesanan/*
│       ├── kurir.routes.js        # GET/POST /api/kurir/*
│       ├── promosi.routes.js      # GET/POST/PUT/DELETE /api/promosi/*
│       ├── voucher.routes.js      # GET/POST/PUT/DELETE /api/voucher/*
│       ├── ulasan.routes.js       # GET/POST /api/ulasan/*
│       └── cs.routes.js           # GET/POST/PUT /api/cs/*
│
└── 📂 frontend/                   # FRONTEND APPLICATION
    ├── 📄 index.html              # HTML template utama
    ├── 📄 vite.config.js          # Konfigurasi Vite bundler
    ├── 📄 tailwind.config.js      # Tailwind CSS config
    ├── 📄 postcss.config.js       # PostCSS config untuk Tailwind
    ├── 📄 eslint.config.js        # Code linting rules
    ├── 📄 package.json            # Dependencies frontend
    │
    ├── 📂 public/                 # Aset statis (tidak diproses)
    │   └── 📂 icon/               # Icon untuk app
    │
    └── 📂 src/                    # SOURCE CODE UTAMA
        ├── 📄 main.jsx            # Entry point React
        ├── 📄 App.jsx             # Root component dengan routing
        ├── 📄 App.css             # Global CSS
        ├── 📄 index.css           # Base styles
        │
        ├── 📂 services/           # API Communication
        │   └── api.js             # Axios instance & interceptor
        │
        ├── 📂 context/            # State Management (Context API)
        │   └── AuthContext.jsx    # Authentication context
        │
        ├── 📂 components/         # Reusable Components
        │   ├── Navbar.jsx         # Navigation bar
        │   ├── Footer.jsx         # Footer
        │   ├── AdminSidebar.jsx   # Admin sidebar menu
        │   ├── ProductCard.jsx    # Kartu produk
        │   ├── LoadingSpinner.jsx # Loading indicator
        │   └── ...                # Komponen lainnya
        │
        ├── 📂 layouts/            # Layout Templates
        │   ├── CustomerLayout.jsx # Layout untuk customer
        │   ├── CustomerLayout.css # Styles untuk layout customer
        │   ├── AdminLayout.jsx    # Layout untuk admin
        │   └── AdminLayout.css    # Styles untuk layout admin
        │
        └── 📂 pages/              # Page Components
            ├── 📂 auth/           # Authentication pages
            │   ├── Login.jsx
            │   ├── Register.jsx
            │   ├── ForgotPassword.jsx
            │   └── ResetPassword.jsx
            │
            ├── 📂 customer/       # Customer/User pages
            │   ├── HomePage.jsx
            │   ├── KatalogPage.jsx
            │   ├── DetailProdukPage.jsx
            │   ├── KeranjangPage.jsx
            │   ├── CheckoutPage.jsx
            │   ├── ProfilPage.jsx
            │   ├── RiwayatPembelianPage.jsx
            │   ├── DetailPesananPage.jsx
            │   ├── PromoPage.jsx
            │   ├── HubungiCSPage.jsx
            │   ├── TentangKamiPage.jsx
            │   └── LokasiPage.jsx
            │
            └── 📂 admin/          # Admin pages
                ├── DashboardPage.jsx
                ├── AdminProfilPage.jsx
                ├── 📂 produk/
                │   ├── ProdukListPage.jsx
                │   └── ProdukFormPage.jsx
                ├── 📂 kategori/
                │   ├── KategoriListPage.jsx
                │   └── KategoriFormPage.jsx
                ├── 📂 akun/
                │   ├── AkunListPage.jsx
                │   ├── AkunEditPage.jsx
                │   └── AkunTambahPage.jsx
                ├── 📂 pesanan/
                │   └── PesananListPage.jsx
                ├── 📂 cs/
                │   ├── PesanCSListPage.jsx
                │   └── PesanCSDetailPage.jsx
                ├── 📂 kurir/
                │   └── KurirListPage.jsx
                ├── 📂 promosi/
                │   └── PromoListPage.jsx
                ├── 📂 voucher/
                └── 📂 ulasan/
```

---

## 🔧 Backend - Node.js/Express

### Deskripsi
Backend adalah REST API server yang menangani semua logika bisnis dan komunikasi dengan database.

### Teknologi
- **Express.js**: Framework web server
- **MySQL2**: Driver MySQL untuk Node.js
- **JWT (JSON Web Token)**: Authentication
- **Bcryptjs**: Enkripsi password
- **Multer**: Upload file/images
- **CORS**: Cross-Origin Resource Sharing

### Struktur Folder Backend

#### 📄 **server.js** - Entry Point
```javascript
// Inisialisasi Express app
// Setup middleware
// Mount routes
// Error handling
```

**Apa yang dilakukan:**
- Membuat instance Express app
- Setup middleware CORS, JSON parser, URL encoder
- Mount semua API routes
- Setup error handling middleware
- Listen ke port (default 5000)

---

#### 📁 **config/db.js** - Database Configuration
**Fungsi**: Konfigurasi koneksi ke MySQL database

```javascript
const mysql = require('mysql2/promise');

// Membuat connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

**Keuntungan Connection Pool:**
- Reuse koneksi (lebih efisien)
- Handle multiple requests simultaneously
- Auto reconnect jika koneksi putus

---

#### 📁 **database/schema.sql** - Database Schema
**Fungsi**: Struktur tabel database

Tabel utama:
- `users` - Data pengguna (customer & admin)
- `produk` - Data produk
- `kategori` - Kategori produk
- `keranjang` - Shopping cart items
- `pesanan` - Order/Transaction
- `pesanan_item` - Item dalam pesanan
- `kurir` - Shipping courier data
- `promosi` - Promosi/diskon
- `voucher` - Voucher/coupon codes
- `ulasan` - Product reviews
- `pesan_cs` - Customer service messages

---

#### 📁 **middleware/** - Middleware

##### **auth.middleware.js** - JWT Authentication
**Fungsi**: Verifikasi token JWT untuk protected routes

```javascript
const authenticateToken = (req, res, next) => {
  // 1. Ambil token dari header Authorization: Bearer <token>
  // 2. Verify token dengan JWT_SECRET
  // 3. Jika valid, attach user info ke req.user
  // 4. Jika invalid, reject dengan status 403
};
```

**Cara Kerja:**
1. Client login → server return JWT token
2. Client simpan token di localStorage
3. Client kirim token di setiap request: `Authorization: Bearer token`
4. Middleware verifikasi token
5. Jika valid → lanjut ke controller, jika tidak → reject

##### **upload.middleware.js** - File Upload
**Fungsi**: Handle file upload untuk gambar produk, profil, dll

```javascript
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
```

---

#### 📁 **controllers/** - Business Logic

Setiap controller berisi functions untuk handle operasi tertentu.

##### Contoh: **produk.controller.js**

```javascript
// GET - Ambil semua produk
exports.getAllProduk = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produk');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - Ambil 1 produk by ID
exports.getProdukById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * FROM produk WHERE id = ?', [id]);
  res.json(rows[0]);
};

// POST - Buat produk baru
exports.createProduk = async (req, res) => {
  const { nama, harga, stok, kategori_id } = req.body;
  // Insert ke database
};

// PUT - Update produk
exports.updateProduk = async (req, res) => {
  const { id } = req.params;
  // Update database
};

// DELETE - Hapus produk
exports.deleteProduk = async (req, res) => {
  const { id } = req.params;
  // Delete dari database
};
```

**Operasi CRUD (Create, Read, Update, Delete):**
- **CREATE**: Tambah data baru
- **READ**: Ambil/lihat data
- **UPDATE**: Ubah data
- **DELETE**: Hapus data

---

#### 📁 **routes/** - API Routes

Route menghubungkan HTTP requests ke controller functions.

##### Contoh: **produk.routes.js**

```javascript
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const ProdukController = require('../controllers/produk.controller');

// Public routes
router.get('/', ProdukController.getAllProduk);
router.get('/:id', ProdukController.getProdukById);

// Protected routes (admin only)
router.post('/', authenticateToken, ProdukController.createProduk);
router.put('/:id', authenticateToken, ProdukController.updateProduk);
router.delete('/:id', authenticateToken, ProdukController.deleteProduk);

module.exports = router;
```

**HTTP Methods:**
- `GET` - Ambil data
- `POST` - Buat data baru
- `PUT` - Update data
- `DELETE` - Hapus data

**API Endpoints:**
```
GET    /api/produk              - Dapatkan semua produk
GET    /api/produk/:id          - Dapatkan produk by ID
POST   /api/produk              - Buat produk baru (Admin)
PUT    /api/produk/:id          - Update produk (Admin)
DELETE /api/produk/:id          - Hapus produk (Admin)

GET    /api/kategori            - Dapatkan semua kategori
POST   /api/kategori            - Buat kategori (Admin)
PUT    /api/kategori/:id        - Update kategori (Admin)
DELETE /api/kategori/:id        - Hapus kategori (Admin)

POST   /api/auth/login          - Login user
POST   /api/auth/register       - Register user baru
POST   /api/auth/logout         - Logout user

GET    /api/pesanan             - Dapatkan pesanan user
POST   /api/pesanan             - Buat pesanan baru
PUT    /api/pesanan/:id         - Update status pesanan

GET    /api/keranjang           - Dapatkan items keranjang
POST   /api/keranjang           - Add item ke keranjang
DELETE /api/keranjang/:id       - Hapus dari keranjang

POST   /api/ulasan              - Buat review produk
GET    /api/ulasan/:produk_id   - Dapatkan review produk

GET    /api/promosi             - Dapatkan promosi aktif
POST   /api/promosi             - Buat promosi (Admin)

GET    /api/voucher             - Dapatkan voucher
POST   /api/voucher/validate    - Validasi voucher code
```

---

## 🎨 Frontend - React/Vite

### Deskripsi
Frontend adalah Single Page Application (SPA) yang dibangun dengan React. Vite digunakan sebagai build tool karena lebih cepat dari Webpack.

### Teknologi
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client untuk API calls
- **Context API**: State management
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool & dev server

### Struktur Folder Frontend

#### 📄 **main.jsx** - Entry Point
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Fungsi**: Render React App ke DOM element dengan ID 'root'

---

#### 📄 **App.jsx** - Root Component & Routing

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Customer routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/katalog" element={<KatalogPage />} />
        <Route path="/produk/:id" element={<DetailProdukPage />} />
        <Route path="/keranjang" element={<KeranjangPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/produk" element={<ProdukListPage />} />
        <Route path="/admin/pesanan" element={<PesananListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Fungsi**: Define semua routes aplikasi

---

#### 📁 **services/api.js** - API Communication

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - Attach token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Fungsi**:
- Membuat Axios instance dengan base URL backend
- Auto-attach JWT token ke setiap request
- Centralized API calls

**Cara Menggunakan:**
```javascript
import api from '@/services/api';

// GET request
const { data } = await api.get('/produk');

// POST request
const { data } = await api.post('/auth/login', { email, password });

// PUT request
await api.put(`/produk/${id}`, { nama, harga });

// DELETE request
await api.delete(`/produk/${id}`);
```

---

#### 📁 **context/AuthContext.jsx** - State Management

```javascript
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Fungsi**: Manage authentication state globally

**Cara Menggunakan:**
```javascript
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

---

#### 📁 **components/** - Reusable Components

Komponen yang digunakan di multiple places.

##### **Navbar.jsx**
- Menampilkan navigation menu
- Link ke berbagai halaman
- User profile dropdown
- Keranjang belanja icon

##### **Footer.jsx**
- Informasi footer
- Links penting
- Social media

##### **ProductCard.jsx**
- Kartu produk di katalog
- Nama, harga, gambar
- Add to cart button

##### **AdminSidebar.jsx**
- Menu sidebar untuk admin
- Links ke halaman admin
- Logout button

##### **LoadingSpinner.jsx**
- Loading indicator
- Ditampilkan saat data sedang diload

---

#### 📁 **layouts/** - Page Layouts

Layout template yang dibungkus di sekitar pages.

##### **CustomerLayout.jsx**
```javascript
export default function CustomerLayout({ children }) {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

Digunakan untuk membungkus customer pages.

##### **AdminLayout.jsx**
```javascript
export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
```

Digunakan untuk membungkus admin pages.

---

#### 📁 **pages/** - Page Components

Setiap file adalah satu halaman/screen aplikasi.

##### **pages/auth/Login.jsx**
- Form login
- Validasi email & password
- Call `/api/auth/login`
- Simpan token
- Redirect ke home

##### **pages/customer/HomePage.jsx**
- Menampilkan featured products
- Banner/hero section
- Product carousel

##### **pages/customer/KatalogPage.jsx**
- List semua produk
- Filter by kategori
- Search functionality
- Pagination

##### **pages/customer/DetailProdukPage.jsx**
- Detail produk (nama, harga, deskripsi, gambar)
- Quantity selector
- Add to cart button
- Reviews/ulasan produk

##### **pages/customer/KeranjangPage.jsx**
- List items di keranjang
- Update quantity
- Remove items
- Tampil total harga
- Checkout button

##### **pages/customer/CheckoutPage.jsx**
- Confirm order items
- Input alamat pengiriman
- Pilih kurir
- Input voucher/discount code
- Finalize order

##### **pages/customer/ProfilPage.jsx**
- Tampil profil user
- Edit profil
- Change password

##### **pages/customer/RiwayatPembelianPage.jsx**
- Tampil list pesanan user
- Status pesanan
- Detail pesanan link

##### **pages/admin/DashboardPage.jsx**
- Overview statistik
- Chart penjualan
- Recent orders

##### **pages/admin/produk/ProdukListPage.jsx**
- Table semua produk
- Edit & delete buttons
- Add produk button

##### **pages/admin/produk/ProdukFormPage.jsx**
- Form buat/edit produk
- Upload gambar
- Input harga, stok, dll

##### **pages/admin/akun/AkunListPage.jsx**
- List semua user accounts
- Edit & delete buttons

##### **pages/admin/pesanan/PesananListPage.jsx**
- List semua pesanan
- Filter by status
- Update status button

##### **pages/admin/cs/PesanCSListPage.jsx**
- List customer service messages
- Reply button

---

## 🔄 Alur Kerja Aplikasi

### 1. Authentication Flow (Login)

```
┌─────────────┐
│   Customer  │
│   Login     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Frontend: pages/auth/Login.jsx      │
│ - Input email & password            │
│ - Call api.post('/auth/login')      │
└──────┬──────────────────────────────┘
       │
       ▼ HTTP POST
┌──────────────────────────────────────┐
│ Backend: routes/auth.routes.js       │
│ - Route: POST /api/auth/login        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│ Backend: controllers/auth.controller │
│ - Cari user di DB by email          │
│ - Verifikasi password dengan hash   │
│ - Generate JWT token                │
│ - Return token & user data          │
└──────┬───────────────────────────────┘
       │
       ▼ Token
┌──────────────────────────────────────┐
│ Frontend: AuthContext.jsx            │
│ - Simpan token ke localStorage      │
│ - Update isAuthenticated state      │
│ - Redirect ke home                  │
└──────────────────────────────────────┘
```

### 2. Browse Product Flow

```
┌────────────────────┐
│ Customer Browse    │
│ Product Katalog    │
└────────┬───────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Frontend: pages/customer/Katalog   │
│ - Mount: Call api.get('/produk')   │
└────────┬─────────────────────────┬─┘
         │ Token in header         │
         ▼                         ▼
┌────────────────────────────────────┐
│ Backend: routes/produk.routes.js   │
│ - Route: GET /api/produk           │
│ - No auth needed (public)          │
└────────┬─────────────────────────┬─┘
         │ SQL Query               │
         ▼                         ▼
┌────────────────────────────────────┐
│ Backend: controllers/produk.js     │
│ - Query: SELECT * FROM produk     │
│ - Return list produk to frontend  │
└────────┬──────────────────────────┘
         │
         ▼ Product Array
┌────────────────────────────────────┐
│ Frontend: Display Product List     │
│ - Map through produk array        │
│ - Render ProductCard component   │
└────────────────────────────────────┘
```

### 3. Add to Cart & Checkout Flow

```
┌──────────────────┐
│ Click Add to Cart│
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ api.post('/keranjang', {     │
│   produk_id: 1,              │
│   quantity: 2                │
│ })                           │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ Backend: controllers/keranjang.js    │
│ - Check user ID dari JWT token      │
│ - Insert/Update ke tabel keranjang  │
│ - Return updated cart               │
└────────┬──────────────────────────┬──┘
         │                          │
         ▼                          ▼
┌──────────────────────────────────────┐
│ Frontend: Update CartContext state   │
│ - Update cart items                 │
│ - Show success notification         │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ User clicks Checkout                │
│ - Go to CheckoutPage                │
└────────┬──────────────────────────┬──┘
         │                          │
         ▼                          ▼
┌──────────────────────────────────────┐
│ Frontend: CheckoutPage               │
│ - Input alamat pengiriman           │
│ - Pilih kurir                       │
│ - Input voucher (optional)          │
│ - Review order sebelum payment      │
└────────┬─────────────────────────┬──┘
         │                         │
         ▼                         ▼
┌───────────────────────────────────────┐
│ api.post('/pesanan', {                │
│   alamat_pengiriman,                  │
│   kurir_id,                           │
│   voucher_code,                       │
│   items: [...]                        │
│ })                                    │
└────────┬────────────────────────┬────┘
         │                        │
         ▼                        ▼
┌───────────────────────────────────────┐
│ Backend: controllers/pesanan.js       │
│ - Validate voucher                   │
│ - Calculate total harga               │
│ - Create pesanan record               │
│ - Create pesanan_item records        │
│ - Clear keranjang items              │
│ - Return pesanan with order_id       │
└────────┬────────────────────────┬────┘
         │                        │
         ▼                        ▼
┌───────────────────────────────────────┐
│ Frontend: Success Page                │
│ - Show order_id                      │
│ - Show payment info                  │
│ - Redirect ke RiwayatPembelian       │
└───────────────────────────────────────┘
```

### 4. Admin Manage Product Flow

```
┌──────────────────┐
│ Admin Dashboard  │
│ Klik "Produk"    │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Frontend: admin/produk/List         │
│ - Mount: Call api.get('/produk')    │
│ - Middleware will attach JWT token  │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Backend: auth.middleware.js         │
│ - Verify JWT token                 │
│ - Check if user is admin           │
│ - Attach user info ke req.user     │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Backend: controllers/produk.js      │
│ - Get all produk from DB           │
│ - Return produk list               │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Frontend: Render Table of Products  │
│ - Nama, Harga, Stok, Action buttons │
│ - Edit button → ProdukFormPage      │
│ - Delete button → api.delete(...)   │
│ - Tambah Produk → ProdukFormPage    │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Frontend: admin/produk/FormPage     │
│ - Form input: nama, harga, deskripsi│
│ - Upload gambar                     │
│ - Submit form                       │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ api.post('/produk', formData)  OR   │
│ api.put('/produk/:id', formData)    │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Backend: Middleware check auth      │
│ - Verify JWT token                 │
│ - Check user role is admin         │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Backend: controllers/produk.js      │
│ - createProduk() atau updateProduk()│
│ - Save to DB                       │
│ - Save image file                  │
│ - Return success response           │
└────────┬────────────────────────┬───┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────┐
│ Frontend: Success                   │
│ - Show success message              │
│ - Redirect to list page             │
└─────────────────────────────────────┘
```

---

## 🛠️ Teknologi yang Digunakan

### Backend Dependencies
| Package | Versi | Fungsi |
|---------|-------|--------|
| `express` | ^4.18.2 | Web framework |
| `mysql2` | ^3.6.0 | MySQL driver |
| `dotenv` | ^16.0.3 | Environment variables |
| `bcryptjs` | ^2.4.3 | Password hashing |
| `jsonwebtoken` | ^9.0.0 | JWT authentication |
| `multer` | ^1.4.5 | File upload |
| `cors` | ^2.8.5 | Cross-origin requests |
| `nodemon` | ^2.0.20 | Auto-restart dev server |

### Frontend Dependencies
| Package | Versi | Fungsi |
|---------|-------|--------|
| `react` | ^18.2.0 | UI library |
| `react-dom` | ^18.2.0 | React DOM binding |
| `react-router-dom` | ^6.30.3 | Client-side routing |
| `axios` | ^1.4.0 | HTTP client |
| `tailwindcss` | ^3.4.19 | CSS framework |
| `vite` | ^4.3.4 | Build tool |
| `eslint` | ^8.40.0 | Linting |
| `lucide-react` | ^1.11.0 | Icon library |

---

## 📊 Database Relationships

```
users (1) ──────────── (N) pesanan
  │                         │
  │                         └─── (1) kurir
  │
  ├──── (N) keranjang ────── (1) produk
  │
  ├──── (N) ulasan ────────── (1) produk
  │
  └──── (N) pesan_cs

produk (1) ────────── (N) pesanan_item ────── (1) pesanan
  │
  └──── (1) kategori
```

---

## 🔐 Security Notes

### Password Security
- Password di-hash menggunakan bcryptjs sebelum disimpan
- Never simpan plain text password

### JWT Token
- Token generated saat login
- Token disimpan di localStorage (frontend)
- Token dikirim di setiap request via Authorization header
- Token di-verify di server sebelum execute protected endpoints
- Token expire time bisa dikonfigurasi

### File Upload
- Validasi file type (hanya image)
- Validasi file size
- Simpan di server disk, bukan di database

### CORS
- Hanya allow requests dari frontend URL
- Prevent unauthorized cross-origin requests

---

## 🚀 Cara Menjalankan Project

### Backend
```bash
cd backend
npm install
# Setup .env file
npm run dev
# Server running di http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App running di http://localhost:5173
```

---

## 📝 Kesimpulan

**Zenfy Marketplace** adalah aplikasi full-stack yang dibangun dengan:
- **Backend**: Express.js REST API untuk handle business logic
- **Frontend**: React SPA untuk user interface
- **Database**: MySQL untuk data persistence
- **Authentication**: JWT token-based

Aplikasi ini mengikuti best practices:
- Separation of concerns (routes, controllers, services)
- Middleware untuk cross-cutting concerns
- Reusable components di frontend
- Context API untuk global state management
- API interceptor untuk automatic token handling

---

*Dokumentasi ini dibuat untuk membantu memahami struktur dan cara kerja Zenfy Marketplace.*
