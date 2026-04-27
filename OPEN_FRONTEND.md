# Cara Membuka Halaman Frontend

Berikut adalah langkah-langkah untuk membuka halaman frontend proyek ini:

## Prasyarat
1. Pastikan Anda telah menginstal **Node.js** di komputer Anda.
2. Pastikan Anda telah menginstal **npm** (Node Package Manager).
3. Pastikan Anda berada di direktori `Marketplace_RPL/frontend`.

## Langkah-langkah

1. **Instalasi Dependensi**
   Jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:
   ```bash
   npm install
   ```

2. **Menjalankan Server Frontend**
   Jalankan perintah berikut untuk memulai server frontend:
   ```bash
   npm run dev
   ```

3. **Akses Halaman Frontend**
   Setelah server berjalan, buka browser Anda dan akses halaman frontend melalui URL berikut:
   ```
   http://localhost:5173
   ```

   > Catatan: Port default adalah `5173`. Jika port tersebut sudah digunakan, periksa terminal untuk URL yang benar.

## Membuka Halaman Secara Spesifik

Untuk membuka halaman tertentu di frontend, Anda dapat menambahkan path spesifik setelah URL dasar. Berikut adalah beberapa contoh halaman yang dapat diakses:

1. **Halaman Home**
   ```
   http://localhost:5173/
   ```

2. **Halaman Login**
   ```
   http://localhost:5173/auth/login
   ```

3. **Halaman Register**
   ```
   http://localhost:5173/auth/register
   ```

4. **Halaman Keranjang**
   ```
   http://localhost:5173/customer/keranjang
   ```

5. **Halaman Checkout**
   ```
   http://localhost:5173/customer/checkout
   ```

6. **Halaman Admin Dashboard**
   ```
   http://localhost:5173/admin/dashboard
   ```

> Catatan: Pastikan Anda telah menjalankan server frontend sebelum mencoba mengakses halaman-halaman ini.

## Membuka Semua Halaman Frontend

Berikut adalah daftar lengkap halaman frontend yang dapat diakses beserta URL-nya:

### Halaman Utama
- **Home**:  
  ```
  http://localhost:5173/
  ```

### Halaman Autentikasi
- **Login**:  
  ```
  http://localhost:5173/auth/login
  ```
- **Register**:  
  ```
  http://localhost:5173/auth/register
  ```
- **Forgot Password**:  
  ```
  http://localhost:5173/auth/forgot-password
  ```
- **Reset Password**:  
  ```
  http://localhost:5173/auth/reset-password
  ```

### Halaman Customer
- **Keranjang**:  
  ```
  http://localhost:5173/customer/keranjang
  ```
- **Checkout**:  
  ```
  http://localhost:5173/customer/checkout
  ```
- **Detail Pesanan**:  
  ```
  http://localhost:5173/customer/detail-pesanan
  ```
- **Detail Produk**:  
  ```
  http://localhost:5173/customer/detail-produk
  ```
- **Hubungi CS**:  
  ```
  http://localhost:5173/customer/hubungi-cs
  ```
- **Katalog**:  
  ```
  http://localhost:5173/customer/katalog
  ```
- **Lokasi**:  
  ```
  http://localhost:5173/customer/lokasi
  ```
- **Profil**:  
  ```
  http://localhost:5173/customer/profil
  ```
- **Promo**:  
  ```
  http://localhost:5173/customer/promo
  ```
- **Riwayat Pembelian**:  
  ```
  http://localhost:5173/customer/riwayat-pembelian
  ```
- **Tentang Kami**:  
  ```
  http://localhost:5173/customer/tentang-kami
  ```

### Halaman Admin
- **Dashboard**:  
  ```
  http://localhost:5173/admin/dashboard
  ```
- **Profil Admin**:  
  ```
  http://localhost:5173/admin/admin-profil
  ```
- **Produk List**:  
  ```
  http://localhost:5173/admin/produk-list
  ```

#### Halaman Admin - Akun
- **Akun List**:  
  ```
  http://localhost:5173/admin/akun/akun-list
  ```
- **Akun Tambah**:  
  ```
  http://localhost:5173/admin/akun/akun-tambah
  ```
- **Akun Edit**:  
  ```
  http://localhost:5173/admin/akun/akun-edit
  ```

#### Halaman Admin - CS
- **Pesan CS List**:  
  ```
  http://localhost:5173/admin/cs/pesan-cs-list
  ```
- **Pesan CS Detail**:  
  ```
  http://localhost:5173/admin/cs/pesan-cs-detail
  ```

#### Halaman Admin - Kategori
- **Kategori List**:  
  ```
  http://localhost:5173/admin/kategori/kategori-list
  ```
- **Kategori Form**:  
  ```
  http://localhost:5173/admin/kategori/kategori-form
  ```

> Catatan: Pastikan server frontend berjalan sebelum mengakses halaman-halaman ini.

## Troubleshooting
- Jika terdapat error saat menjalankan `npm install`, pastikan versi Node.js dan npm Anda sudah sesuai dengan yang direkomendasikan di dokumentasi proyek.
- Jika halaman tidak terbuka, pastikan tidak ada firewall atau aplikasi lain yang memblokir port `5173`.