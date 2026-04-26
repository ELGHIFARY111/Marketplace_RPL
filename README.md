# Zenvy Apparel — Marketplace RPL

Website e-commerce fashion berbasis React JS + Node.js + MySQL.

## Struktur Proyek

```
Marketplace_RPL/
├── docs/                        # Dokumentasi SKPL
├── backend/                     # Node.js + Express API
│   ├── config/db.js             # Koneksi MySQL
│   ├── controllers/             # Logic bisnis tiap fitur
│   ├── middleware/              # Auth JWT & Upload file
│   ├── routes/                  # Definisi endpoint API
│   ├── database/schema.sql      # Schema & seed database
│   ├── uploads/                 # Foto produk yang diupload
│   ├── .env.example             # Template variabel lingkungan
│   └── server.js                # Entry point server
└── frontend/                    # React JS (Vite)
    └── src/
        ├── context/AuthContext  # State autentikasi global
        ├── services/api.js      # Axios instance + interceptor
        ├── layouts/             # CustomerLayout, AdminLayout
        ├── components/          # Navbar, Footer, Sidebar, dll
        └── pages/
            ├── auth/            # Login, Register, Forgot/Reset Password
            ├── customer/        # Home, Katalog, Keranjang, Checkout, dll
            └── admin/           # Dashboard, Produk, Pesanan, Promosi, Akun
```

## Setup Backend

```bash
cd backend
cp .env.example .env   # isi DB_PASSWORD dan JWT_SECRET
npm install
# Import schema ke MySQL:
# mysql -u root -p < database/schema.sql
npm run dev
```

## Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints Utama

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | /api/auth/register | Registrasi |
| POST | /api/auth/login | Login |
| GET | /api/produk | Semua produk (+ ?search=&kategori=) |
| GET | /api/produk/:id | Detail produk |
| POST | /api/keranjang | Tambah ke keranjang |
| POST | /api/pesanan | Buat pesanan |
| GET | /api/pesanan/my | Riwayat pesanan saya |
| PUT | /api/pesanan/:id/status | Update status (admin) |

## Tech Stack

- **Frontend:** React JS (Vite), React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL 5.7+
- **Auth:** JWT + Bcrypt
- **Upload:** Multer