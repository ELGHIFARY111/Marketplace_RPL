# 4. Desain Masukan Keluaran

## 4.1 SiteMap (Web Base)

> *Gambar 1: Sitemap Website Zenvy Apparel*

### Penjelasan Sitemap

Sitemap pada gambar menggambarkan struktur navigasi dan hubungan antar halaman pada sistem website Zenvy Apparel secara menyeluruh.

#### 1. Struktur Menu Utama

Halaman utama yang dapat diakses langsung oleh pengguna:

- **Beranda** — Halaman awal dengan highlight produk
- **Tentang Kami** — Profil dan informasi perusahaan
- **Produk** — Pusat katalog barang
  - Katalog Produk
  - Detail Produk
  - Pencarian Produk
- **Promo** — Penawaran diskon
- **Lokasi** — Alamat atau informasi tempat
- **Hubungi CS** — Komunikasi dengan layanan pelanggan

#### 2. Sistem Autentikasi

- Registrasi → Membuat akun baru
- Login → Masuk ke dalam sistem
- Lupa Password → Reset Password (pemulihan akun)

#### 3. Alur Pengguna (User Flow)

Setelah berhasil login, pengguna dapat mengakses:

- Profil Customer
- Keranjang → Checkout → Detail Pesanan
- Riwayat Pembelian → Ulasan / Rating

#### 4. Admin Panel

Fitur pada Admin Panel setelah login:

- **Dashboard Admin** — Ringkasan data
- **Profil Admin** — Kelola data akun admin
- **Produk dan Stok** — Daftar / Detail / Tambah / Edit Produk, Variasi Produk
- **Pesanan** — Daftar / Detail / Update Status Pesanan
- **Promosi** — Promo dan Kupon (Tambah/Edit)
- **Akun dan Akses** — Daftar / Tambah / Edit Akun

---

## 4.2 Desain Halaman Utama

> *Gambar 2: Homepage Zenvy*

### Komponen Halaman Utama:

**1. Header (Bagian Atas — Sticky)**
- Logo Zenvy (sudut kiri atas)
- Menu Navigasi: Home, About Us, Product, Promo, Location
- Search Bar, Ikon Keranjang, Ikon Profil/Akun

**2. Hero Section**
- Gambar latar belakang produk berkualitas tinggi
- Headline & Slogan: "Rasa Autentik, Kualitas Premium"
- Tombol CTA "Mulai Pesanan"

**3. Fitur Utama Website**
- Navigasi simpel & intuitif
- Pencarian cepat (search bar)
- Desain visual minimalis & elegan

**4. Bagian Produk / Layanan Promo**
- Katalog / Produk Unggulan
- Highlight Promo / Banner diskon

**5. Footer**
- Navigasi penting (About Us, Location, Hubungi CS, Privacy Policy)
- Kontak (WhatsApp, email)
- Media Sosial (Instagram, TikTok, Facebook)

---

## 4.3 Desain Masukan

### 1. Halaman Masuk (Login)

> *Gambar 2: Halaman Login*

| Komponen | Deskripsi |
|---|---|
| Area Branding | Logo "Zenvy", slogan, gambar produk fashion |
| Judul | "Masuk" — "Masukkan Detail Anda Dibawah" |
| Form Input | Email dan Password |
| Tautan Pemulihan | "Lupa kata sandi? Klik disini" |
| Tombol Aksi | "Masuk" — memverifikasi kredensial dan mengarahkan ke halaman utama |
| Navigasi Tambahan | "Belum punya akun? Registrasi disini" |

### 2. Halaman Registrasi

> *Gambar 3: Halaman Registrasi*

| Komponen | Deskripsi |
|---|---|
| Area Branding | Identik dengan halaman Masuk |
| Judul | "Registrasi" — "Enter Your Detail Below" |
| Form Input | Username, Email, Password |
| Tombol Aksi | "Registrasi" — membuat akun baru di basis data |
| Navigasi Tambahan | "Sudah punya akun? Masuk disini" |

### 3. Halaman Lupa Password

> *Gambar 4: Halaman Lupa Password*

| Komponen | Deskripsi |
|---|---|
| Judul | "Lupa Password?" |
| Form Input | Email terdaftar |
| Tombol Aksi | "Kirim" — mengirim link/kode OTP reset password |
| Navigasi | "← Kembali Ke halaman Login" |

### 4. Halaman Reset Password

> *Gambar 5: Halaman Reset Password*

| Komponen | Deskripsi |
|---|---|
| Judul | "Lupa Password?" |
| Form Input | Password Baru, Konfirmasi Password Baru |
| Tombol Aksi | "Kirim" — menyimpan password baru ke database |
| Navigasi | "← Kembali Ke halaman Login" |

### 5. Halaman Profil Pelanggan (Edit)

> *Gambar 6: Halaman Edit Profil*

| Komponen | Deskripsi |
|---|---|
| Header Profil | Avatar default + nama pengguna |
| Form Data Diri | Nama, Kata Sandi, Email, No Telepon |
| Tombol Aksi | "Simpan" — memperbarui data di database |

### 6. Halaman Checkout

> *Gambar 7: Halaman Checkout*

| Komponen | Deskripsi |
|---|---|
| Form Input (Kiri) | Alamat, Jasa Kirim (dropdown), Kupon Diskon + tombol "Gunakan", Metode Pembayaran (dropdown) |
| Ringkasan Pesanan (Kanan) | Subtotal, Biaya pengirim, Pajak, Total Pembayaran |
| Tombol Aksi | "BAYAR" — memproses pesanan dan mengarahkan ke payment |

### 7–10. Panel Admin — Produk dan Stok

> *Gambar 9–12: Panel Admin Produk*

| Halaman | Komponen Utama |
|---|---|
| **Daftar Produk** | Tabel (ID, Nama Produk, Kategori), Pencarian, Tombol Detail/Edit/Hapus/Tambah |
| **Tambah Produk** | Form (Nama, Kategori dropdown, Deskripsi), Upload Foto, Tombol Simpan/Batal |
| **Edit Produk** | Form terisi data produk, Upload/Hapus Foto, Tombol Simpan/Batal |
| **Detail Produk** | Info produk (read-only), Galeri foto, Tabel variasi (ID, SKU, Warna, Ukuran, Stok, Harga) + aksi Detail/Edit/Hapus/Tambah |

### 11–12. Panel Admin — Pesanan (Update Status)

> *Gambar 13–14: Panel Admin Pesanan*

| Halaman | Komponen Utama |
|---|---|
| **Update Status** | Tabel pesanan dengan checkbox, status berwarna, "Pilih Semua", Tombol Perbarui/Batal |
| **Pop-up Konfirmasi** | ID pesanan, pilihan status (radio button: Diproses/Dikirim/Dibatalkan/Pembayaran/Selesai), Tombol Konfirmasi |

### 13–14. Panel Admin — Variasi Produk

> *Gambar 15–16: Panel Admin Variasi*

| Halaman | Komponen Utama |
|---|---|
| **Edit Variasi** | Form (SKU, Warna dropdown, Ukuran dropdown, Stok ±, Harga ±), Tabel referensi variasi |
| **Tambah Variasi** | Form input identik dengan edit, Tabel referensi variasi yang sudah ada |

### 15–18. Panel Admin — Promosi (Kupon & Promo)

> *Gambar 17–20: Panel Admin Promosi*

| Halaman | Komponen Utama |
|---|---|
| **Tambah Kupon** | Form (Kode Kupon, Tanggal Kadaluarsa, Kuota ±, Persentase Diskon ±) |
| **Tambah Promo** | Form (Pilih Produk, Tanggal Kadaluarsa, Persentase Diskon ±) |
| **Edit Kupon** | Form terisi data kupon (ID, Kode, Tanggal, Kuota, Diskon) |
| **Edit Promo** | Form terisi data promo (ID Produk, Nama Produk, Tanggal, Diskon) |

### 19–20. Panel Admin — Akun dan Akses

> *Gambar 21–22: Panel Admin Akun*

| Halaman | Komponen Utama |
|---|---|
| **Tambah Akun** | Form (Nama Lengkap, Email, No. Telpon, Level Akses dropdown, Password) |
| **Edit Akun** | Form terisi (ID read-only, Nama, Email, No. Telpon, Level Akses, Password) |

---

## 4.4 Desain Keluaran

### 1. Halaman Detail Produk

> *Gambar 23: Detail Produk*

| Komponen | Deskripsi |
|---|---|
| Galeri Visual | Gambar utama besar + thumbnail |
| Info Produk | Nama, jumlah terjual, rating bintang, jumlah ulasan |
| Harga | Harga diskon + harga asli dicoret |
| Opsi Variasi | Pilihan warna (lingkaran warna) + Pilihan ukuran (S–XXL) |
| Tombol Aksi | "Checkout" dan ikon Keranjang |

### 2. Halaman Profil Pengguna (View)

> *Gambar 24: Profil Pengguna*

| Komponen | Deskripsi |
|---|---|
| Header | Avatar + nama pengguna |
| Data Akun (read-only) | Nama, Email, Kata Sandi (masked), No Telepon |
| Tombol Aksi | "Edit Profil" dan "Keluar" (logout) |

### 3. Halaman Keranjang Belanja

> *Gambar 25: Keranjang Belanja*

| Komponen | Deskripsi |
|---|---|
| Daftar Produk (Kiri) | Kartu item (gambar, nama, variasi, harga, kontrol qty ±, tombol Remove, checkbox) |
| Ringkasan Biaya (Kanan) | Subtotal, Biaya pengiriman, Pajak, Total Pembayaran |
| Tombol Aksi | "BAYAR" — menuju checkout final |

### 4. Halaman Dashboard Admin

> *Gambar 26: Dashboard Admin*

| Komponen | Deskripsi |
|---|---|
| Sidebar | Menu navigasi admin (Profil, Dashboard, Produk, Pesanan, Promosi, Akun) |
| Statistik Utama | Total Konsumen, Total Pesanan Hari Ini, Status Pesanan (Diproses / Selesai) |
| Ringkasan Finansial | Total Pendapatan/Bulan |
| Panel Notifikasi | Stok Kritis (kuning), Stok Habis (merah), Pengingat Pengiriman |

### 5. Halaman Profil Admin

> *Gambar 27: Profil Admin*

| Komponen | Deskripsi |
|---|---|
| Sidebar | Menu navigasi admin (Profil aktif) |
| Data Akun (read-only) | Nama, Email, Kata Sandi (masked), No Telepon |
| Tombol Aksi | "Edit Profil" dan "Keluar" |

### 6. Detail Pesanan (Customer)

> *Gambar 28: Detail Pesanan*

| Komponen | Deskripsi |
|---|---|
| Info Pesanan | ID pesanan, Subtotal, Status ("Belum Dibayar"), Metode pembayaran, No rekening tujuan |
| Daftar Produk | Item yang dipesan beserta jumlah |
| Form Konfirmasi Pembayaran | Nama Pengirim, Bank Pengirim, Jumlah Transfer, Upload Bukti Transfer |
| Tombol Aksi | "Kirim Verifikasi" |

### 7. Panel Admin — Daftar Pesanan

> *Gambar 29: Daftar Pesanan Admin*

| Komponen | Deskripsi |
|---|---|
| Tabel Pesanan | ID, Customer, Tanggal, Total, Status (warna), Aksi (Detail/Hapus) |
| Fitur | Pencarian, Tombol "Perbarui Status" |

### 8. Panel Admin — Detail Pesanan

> *Gambar 30: Detail Pesanan Admin*

| Komponen | Deskripsi |
|---|---|
| Info Pesanan | Nama Customer, Metode Pembayaran, Alamat lengkap |
| Tabel Barang | No, Nama Produk, Varian, Qty, Harga |

### 9. Panel Admin — Variasi Detail

> *Gambar 31: Detail Variasi Produk*

| Komponen | Deskripsi |
|---|---|
| Info Variasi (read-only) | SKU, Warna, Ukuran, Stok, Harga |
| Tabel Variasi | Semua variasi produk (ID, SKU, Warna, Ukuran, Stok, Harga, Aksi) |
| Tombol Aksi | "Edit" |

### 10. Panel Admin — Daftar Kupon

> *Gambar 32: Daftar Kupon*

| Komponen | Deskripsi |
|---|---|
| Tabel Kupon | ID, Kode Kupon, Batas Waktu, Kuota, Diskon |
| Fitur | Pencarian, Tombol Tambah/Edit/Hapus |

### 11. Panel Admin — Daftar Promo

> *Gambar 33: Daftar Promo*

| Komponen | Deskripsi |
|---|---|
| Tabel Promo | ID, Nama Produk, Diskon, Batas Waktu |
| Fitur | Pencarian, Tombol Tambah/Edit/Hapus |

### 12. Panel Admin — Daftar Akun

> *Gambar 34: Daftar Akun*

| Komponen | Deskripsi |
|---|---|
| Tabel Akun | ID, Nama Lengkap, Email, Password (masked), No. Telp, Tgl Daftar, Level Akses |
| Fitur | Pencarian, Tombol Tambah/Edit/Hapus |

---

# LAMPIRAN

## Ringkasan Kebutuhan Fungsional

| Kode | Kebutuhan | Keterangan |
|---|---|---|
| F-01 | Menampilkan form pendaftaran member baru | Form berisi identitas utama seperti nama, alamat, dan email |
| F-02 | Membuat dan mengirimkan link verifikasi email | Link dikirim ke email customer setelah registrasi |
| F-03 | Memverifikasi link dan generate ID member baru | Membuat record user baru di database |
| F-04 | Menyediakan form Login | Form berisi Email dan Password |
| F-05 | Memvalidasi kredensial pengguna | Pencocokan dengan data di database |
| F-06 | Menyimpan sesi (session) login | Session management untuk autentikasi |
| F-07 | Memuat dan menampilkan katalog produk | Menampilkan foto, nama, harga dari database |
| F-08 | Menyediakan fungsi pencarian (filter) produk | Pencarian berdasarkan kata kunci |
| F-09 | Menampilkan halaman detail produk | Detail berdasarkan ID Produk |
| F-10 | Menyimpan data ke keranjang belanja | Penyimpanan sementara via session/database |
| F-11 | Kalkulasi subtotal harga keranjang | Perhitungan otomatis harga × qty |
| F-12 | Mencegah checkout jika belum login | Redirect ke halaman login |
| F-13 | Formulir pemilihan alamat, kurir, metode bayar | Form checkout lengkap |
| F-14 | Membuat rekaman pesanan (order) baru | Insert ke tabel pesanan dan detail_pesanan |
| F-15 | Mengurangi stok otomatis setelah pesanan dibuat | Update stok di tabel varian_produk |
| F-16 | Menampilkan riwayat transaksi per customer | Filter berdasarkan ID Customer |
| F-17 | Form pengisian ulasan (bintang dan teks) | Rating 1–5 dan komentar |
| F-18 | Menyimpan dan menampilkan akumulasi rating | Rata-rata rating per produk |
| F-19 | Fitur formulir pesan kontak / live chat | Form kontak untuk customer |
| F-20 | Menyimpan riwayat percakapan/pesan CS | Histori pesan tersimpan di database admin |

## Ringkasan Kebutuhan Non Fungsional

| Kode | Kebutuhan | Keterangan |
|---|---|---|
| NF-01 | Waktu respons halaman maksimal 3–5 detik | Pada koneksi 4G/Wi-Fi stabil |
| NF-02 | Mendukung 500 concurrent users | Tanpa penurunan performa signifikan |
| NF-03 | Backup database otomatis setiap 24 jam | Pencadangan pada pukul 00:00 WIB |
| NF-04 | Mekanisme data recovery | Restore ke titik backup terakhir |
| NF-05 | Enkripsi jaringan SSL/TLS (HTTPS) | Keamanan pengiriman data |
| NF-06 | Password di-hash (Bcrypt/Argon2) | Tidak disimpan plaintext |
| NF-07 | Manajemen hak akses (Access Control) | Customer tidak bisa akses URL admin |
| NF-08 | Uptime server minimal 99% | Operasi 24/7 |
| NF-09 | Error message yang user-friendly | Tidak menampilkan source code |
| NF-10 | Responsive Web Design | Kompatibel di PC, Tablet, Smartphone |
| NF-11 | Cross-browser & cross-platform | Chrome, Firefox, Safari, Edge di berbagai OS |

---

## Metodologi Pengembangan

> *Penjelasan mengenai metodologi penelitian yang digunakan*

## Time Schedule

> *Jadwal pengembangan (jika diperlukan)*

## Flowchart

> *Diagram alur proses sistem (jika ada)*

---

<p align="center"><em>— Akhir Dokumen —</em></p>
