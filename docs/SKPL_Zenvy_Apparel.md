<h1 align="center">SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK</h1>

<br>

<p align="center"><strong>ZENVY APPAREL</strong></p>
<p align="center"><em>Website E-Commerce Fashion</em></p>

<br>

<table align="center">
<tr><th>Nama</th><th>NIM</th></tr>
<tr><td>Mohammad Elghifary</td><td>240411100108</td></tr>
<tr><td>Ach Rayyan</td><td>240411100188</td></tr>
<tr><td>Jordan Hutahaean</td><td>230411100071</td></tr>
<tr><td>Raihan Aryanova Narendra</td><td>240411100094</td></tr>
<tr><td>Alisha Salsabila A</td><td>230411100118</td></tr>
<tr><td>Ravi Dian Fahrezi</td><td>240411100056</td></tr>
<tr><td>Tanata Wian Poernomo</td><td>240411100184</td></tr>
</table>

<br>

<p align="center"><strong>Mata Kuliah:</strong> Rekayasa Perangkat Lunak</p>
<p align="center"><strong>Program Studi Teknik Informatika</strong></p>
<p align="center"><strong>Universitas Trunojoyo Madura</strong></p>

---

| Jurusan | Nomor Dokumen | Halaman |
|---|---|---|
| Teknik Informatika UTM | PEIS-15-<<nourut>> | #Ke / #TotalHal |
| | **Revisi** | <<Nomor Revisi>> \| <<Tanggal>> |

---

## DAFTAR PERUBAHAN

| Tanggal | Nomor Revisi | Deskripsi | Pemeriksa |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

## Daftar Halaman Perubahan

| Halaman | Revisi |
|---|---|
| <<Nomor Halaman>> | <<Isi Revisi>> |

---

## DAFTAR ISI

- [1. Pendahuluan](#1-pendahuluan)
  - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
  - [1.2 Lingkup Masalah](#12-lingkup-masalah)
  - [1.3 Definisi, Istilah dan Singkatan](#13-definisi-istilah-dan-singkatan)
  - [1.4 Referensi](#14-referensi)
  - [1.5 Deskripsi Umum Dokumen (Ikhtisar)](#15-deskripsi-umum-dokumen-ikhtisar)
- [2. Deskripsi Umum](#2-deskripsi-umum)
  - [2.1 Deskripsi Umum Sistem](#21-deskripsi-umum-sistem)
  - [2.2 Fungsi Produk](#22-fungsi-produk)
  - [2.3 Karakteristik Pengguna](#23-karakteristik-pengguna)
  - [2.4 Batasan](#24-batasan)
  - [2.5 Lingkungan Operasi](#25-lingkungan-operasi)
  - [2.6 Dokumentasi](#26-dokumentasi)
  - [2.7 Asumsi dan Ketergantungan](#27-asumsi-dan-ketergantungan)
- [3. Detail Kebutuhan Perangkat Lunak](#3-detail-kebutuhan-perangkat-lunak)
  - [3.1 Kebutuhan Antarmuka Eksternal](#31-kebutuhan-antarmuka-eksternal)
  - [3.2 Fitur Sistem](#32-fitur-sistem)
  - [3.3 Kebutuhan Data](#33-kebutuhan-data)
  - [3.4 Kebutuhan Non Fungsional](#34-kebutuhan-non-fungsional)
- [4. Desain Masukan Keluaran](#4-desain-masukan-keluaran)
  - [4.1 SiteMap](#41-sitemap)
  - [4.2 Desain Halaman Utama](#42-desain-halaman-utama)
  - [4.3 Desain Masukan](#43-desain-masukan)
  - [4.4 Desain Keluaran](#44-desain-keluaran)
- [LAMPIRAN](#lampiran)

---

# 1. Pendahuluan

Dokumen ini berisi Spesifikasi Kebutuhan Perangkat Lunak (SKPL) untuk sistem **Zenvy Apparel**, yaitu sebuah website e-commerce yang bergerak di bidang penjualan produk fashion seperti baju dan celana.

Dokumen SKPL ini dibuat sebagai acuan dalam proses pengembangan sistem agar sesuai dengan kebutuhan pengguna dan tujuan bisnis. Isi dari dokumen ini mengacu pada standar *Software Requirement Specification* (SRS) yang digunakan dalam pengembangan perangkat lunak.

## 1.1 Tujuan Penulisan Dokumen

Tujuan dari pembuatan dokumen SKPL ini adalah:

- Menjelaskan kebutuhan sistem Zenvy Apparel secara jelas dan terstruktur
- Menjadi acuan bagi developer dalam membangun sistem
- Memudahkan komunikasi antara tim pengembang dan stakeholder
- Menjadi dasar evaluasi sistem yang dikembangkan

Dokumen ini digunakan oleh:

- Developer (programmer)
- Designer UI/UX
- Dosen
- Stakeholder (pemilik sistem)

## 1.2 Lingkup Masalah

Zenvy Apparel merupakan sistem berbasis web yang menyediakan layanan pembelian produk fashion secara online. Sistem ini memungkinkan pengguna untuk melihat katalog produk, melakukan pembelian, serta mengelola pesanan.

**Lingkup sistem meliputi:**

- Pengguna (customer) dapat registrasi dan login
- Pengguna dapat melihat katalog dan detail produk
- Pengguna dapat menambahkan produk ke keranjang
- Pengguna dapat melakukan checkout sederhana
- Admin dapat mengelola produk dan melihat pesanan

**Manfaat sistem:**

- Mempermudah proses jual beli produk fashion
- Meningkatkan efisiensi pengelolaan produk dan pesanan
- Memberikan pengalaman belanja online yang mudah

## 1.3 Definisi, Istilah dan Singkatan

| Definisi / Istilah / Singkatan | Penjelasan |
|---|---|
| **SKPL** | Spesifikasi Kebutuhan Perangkat Lunak atau Software Requirement Specification (SRS) yaitu dokumen hasil analisis sebuah perangkat lunak yang berisi spesifikasi kebutuhan pengguna |
| **Admin** | Pengelola sistem yang memiliki hak akses untuk mengatur data produk, seperti menambah, mengubah, menghapus produk, serta melihat dan mengelola pesanan dari pengguna |
| **User** | Pengguna sistem yang berperan sebagai pembeli, yang dapat melakukan registrasi, login, melihat produk, menambahkan ke keranjang, dan melakukan transaksi pembelian |
| **CRUD** | Singkatan dari Create, Read, Update, Delete, yaitu operasi dasar dalam pengolahan data |
| **Checkout** | Proses akhir dalam transaksi pembelian, dimana pengguna menginput alamat pengiriman, memilih metode pembayaran, dan mengkonfirmasi pesanan |
| **Katalog** | Daftar produk yang ditampilkan dalam sistem, berisi informasi seperti nama produk, harga, foto, dan stok barang |
| **Order** | Data atau informasi mengenai pesanan yang dilakukan oleh pengguna, termasuk detail produk yang dibeli, jumlah, total harga, dan status pesanan |

## 1.4 Referensi

1. IEEE Software Engineering Standards Committee, "*IEEE Std 830-1998, IEEE Recommended Practice for Software Requirements Specifications*", October 20, 1998.
2. **ZALORA Indonesia** – Website Resmi. Platform e-commerce fashion yang menyediakan berbagai produk seperti baju, celana, sepatu, dan aksesoris dari brand lokal maupun internasional.
3. **Contoh Website Toko Online (Dewaweb)**. Artikel yang membahas berbagai contoh website e-commerce, termasuk website fashion seperti Zalora, serta fitur-fitur penting seperti katalog produk, navigasi, dan user experience.

## 1.5 Deskripsi Umum Dokumen (Ikhtisar)

Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini disusun secara sistematis untuk memberikan pemahaman yang jelas mengenai kebutuhan sistem Website Zenvy Apparel. Dokumen ini terdiri dari beberapa bagian utama sebagai berikut:

1. **Pendahuluan** — Berisi gambaran umum tentang sistem yang akan dibuat, tujuan penulisan dokumen, ruang lingkup proyek, serta definisi istilah yang digunakan dalam dokumen.
2. **Deskripsi Umum** — Menjelaskan gambaran umum sistem Zenvy Apparel, termasuk cara kerja sistem, fungsi utama, karakteristik pengguna (user dan admin), batasan sistem, serta lingkungan operasinya.
3. **Detail Kebutuhan Perangkat Lunak** — Menguraikan kebutuhan sistem secara rinci, meliputi kebutuhan fungsional seperti fitur katalog produk, keranjang, dan checkout, serta kebutuhan non-fungsional seperti keamanan dan performa sistem.
4. **Desain Masukan dan Keluaran** — Berisi rancangan tampilan sistem seperti struktur menu (sitemap), desain halaman utama, serta desain input dan output yang digunakan dalam sistem.

---

# 2. Deskripsi Umum

## 2.1 Deskripsi Umum Sistem

Zenvy Apparel merupakan sebuah sistem berbasis website yang bergerak di bidang penjualan produk fashion seperti baju, celana, dan sepatu. Sistem ini dirancang untuk memudahkan pelanggan dalam melakukan pembelian produk secara online tanpa harus datang ke toko.

Website ini menyediakan berbagai fitur seperti katalog produk, keranjang, dan checkout, serta kebutuhan non-fungsional seperti keamanan dan performa sistem.

Dengan adanya sistem ini, diharapkan proses penjualan menjadi lebih efektif, efisien, dan dapat menjangkau pelanggan yang lebih luas.

## 2.2 Fungsi Produk

Fungsi utama yang dimiliki oleh sistem Zenvy Apparel adalah sebagai berikut:

- Registrasi pengguna
- Login pengguna
- Mencari produk
- Melihat katalog produk
- Melihat detail produk
- Menambahkan produk ke keranjang
- Melakukan checkout
- Melihat riwayat pembelian
- Memberi rating pada produk
- Menghubungi customer service
- Pengelolaan data produk (oleh admin)
- Melihat dan mengelola pesanan (oleh admin)

## 2.3 Karakteristik Pengguna

| Kategori Pengguna | Tugas | Hak Akses ke Aplikasi |
|---|---|---|
| **Admin** | Pengelola Sistem | Mengelola data produk (tambah, ubah, hapus), Melihat dan mengelola pesanan |
| **Customer** | Pembeli | Registrasi, login, mencari produk, melihat katalog produk, melihat detail produk, menambahkan ke keranjang, melakukan checkout, melihat riwayat pembelian, memberi rating, dan menghubungi CS |

## 2.4 Batasan

Batasan dalam pengembangan dan penggunaan sistem Zenvy Apparel:

- Sistem hanya menangani penjualan produk fashion seperti baju, celana, dan sepatu
- Sistem berbasis web sehingga hanya dapat digunakan dengan koneksi internet
- Sistem harus berjalan pada berbagai platform (multi platform) seperti Windows, Linux, Android, dan iOS melalui browser
- Sistem menggunakan database MySQL sebagai media penyimpanan data produk dan pesanan
- Sistem tidak terintegrasi secara langsung dengan layanan pengiriman (ekspedisi), pengelolaan pengiriman dilakukan secara manual oleh admin
- Sistem tidak terintegrasi dengan payment gateway, konfirmasi pembayaran dilakukan secara sederhana
- Sistem bergantung pada perangkat keras seperti server dan perangkat pengguna (komputer atau smartphone)
- Data yang digunakan dalam sistem sepenuhnya dikelola oleh admin dan tidak mengambil data dari sistem eksternal lain

## 2.5 Lingkungan Operasi

### 1. Server (Backend System)

| Komponen | Spesifikasi |
|---|---|
| Sistem Operasi | Minimal Windows 10 / Linux (Ubuntu 20.04 atau lebih baru) |
| Web Server | Apache atau Nginx |
| Bahasa Pemrograman | JavaScript, React JS, Node.JS |
| Database | MySQL versi 5.7 atau lebih baru |
| Processor | Minimal Dual Core |
| RAM | Minimal 4 GB |
| Penyimpanan | Minimal 50 GB |

### 2. Client (Pengguna / User & Admin)

| Komponen | Spesifikasi |
|---|---|
| Sistem Operasi | Windows 10+, Linux, Android 8+, iOS 12+ |
| Browser | Google Chrome, Mozilla Firefox, Microsoft Edge (versi terbaru) |
| Perangkat Keras | Smartphone / Laptop / PC, RAM minimal 2 GB |
| Jaringan | Koneksi internet stabil (minimal 1 Mbps) |

## 2.6 Dokumentasi

Untuk mendukung penggunaan dan pengelolaan sistem Zenvy Apparel, diperlukan beberapa dokumentasi sebagai berikut:

- **User Manual (Panduan Pengguna)** — Berisi panduan bagi pengguna (customer) dalam menggunakan sistem, seperti cara registrasi, login, melihat produk, menambahkan ke keranjang, dan melakukan checkout.

## 2.7 Asumsi dan Ketergantungan

### Asumsi

- Sistem digunakan oleh maksimal ±500 pengguna per hari secara bersamaan
- Pengguna memiliki perangkat (smartphone atau komputer) yang mendukung akses website
- Pengguna memiliki koneksi internet yang stabil untuk mengakses sistem
- Admin memiliki kemampuan dasar dalam mengoperasikan komputer dan mengelola data melalui website
- Data produk dan pesanan yang dimasukkan oleh admin dianggap valid dan benar

### Ketergantungan

- Sistem bergantung pada koneksi internet agar dapat diakses oleh pengguna dan admin
- Sistem bergantung pada server hosting untuk menjalankan aplikasi dan menyimpan database
- Sistem bergantung pada database (MySQL) untuk penyimpanan data produk dan pesanan
- Sistem bergantung pada web browser (seperti Google Chrome atau Mozilla Firefox) untuk akses pengguna
- Sistem memiliki ketergantungan pada teknologi pengembangan seperti JavaScript dan framework React JS / Node.js
- Sistem memiliki ketergantungan pada pihak ketiga untuk metode pembayaran (misalnya transfer bank atau e-wallet), meskipun tidak terintegrasi secara otomatis

---
