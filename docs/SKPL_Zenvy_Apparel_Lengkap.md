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
2. **ZALORA Indonesia** â€“ Website Resmi. Platform e-commerce fashion yang menyediakan berbagai produk seperti baju, celana, sepatu, dan aksesoris dari brand lokal maupun internasional.
3. **Contoh Website Toko Online (Dewaweb)**. Artikel yang membahas berbagai contoh website e-commerce, termasuk website fashion seperti Zalora, serta fitur-fitur penting seperti katalog produk, navigasi, dan user experience.

## 1.5 Deskripsi Umum Dokumen (Ikhtisar)

Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini disusun secara sistematis untuk memberikan pemahaman yang jelas mengenai kebutuhan sistem Website Zenvy Apparel. Dokumen ini terdiri dari beberapa bagian utama sebagai berikut:

1. **Pendahuluan** â€” Berisi gambaran umum tentang sistem yang akan dibuat, tujuan penulisan dokumen, ruang lingkup proyek, serta definisi istilah yang digunakan dalam dokumen.
2. **Deskripsi Umum** â€” Menjelaskan gambaran umum sistem Zenvy Apparel, termasuk cara kerja sistem, fungsi utama, karakteristik pengguna (user dan admin), batasan sistem, serta lingkungan operasinya.
3. **Detail Kebutuhan Perangkat Lunak** â€” Menguraikan kebutuhan sistem secara rinci, meliputi kebutuhan fungsional seperti fitur katalog produk, keranjang, dan checkout, serta kebutuhan non-fungsional seperti keamanan dan performa sistem.
4. **Desain Masukan dan Keluaran** â€” Berisi rancangan tampilan sistem seperti struktur menu (sitemap), desain halaman utama, serta desain input dan output yang digunakan dalam sistem.

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

- **User Manual (Panduan Pengguna)** â€” Berisi panduan bagi pengguna (customer) dalam menggunakan sistem, seperti cara registrasi, login, melihat produk, menambahkan ke keranjang, dan melakukan checkout.

## 2.7 Asumsi dan Ketergantungan

### Asumsi

- Sistem digunakan oleh maksimal Â±500 pengguna per hari secara bersamaan
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
# 3. Detail Kebutuhan Perangkat Lunak

## 3.1 Kebutuhan Antarmuka Eksternal

### 3.1.1 Antarmuka Pengguna

Sistem Zenvy Apparel menggunakan antarmuka grafis (GUI) berbasis website yang dirancang responsif, sehingga tampilan dapat menyesuaikan dengan ukuran layar perangkat yang digunakan pengguna (PC, laptop, tablet, atau smartphone).

- **Interaksi Perangkat:** Pengguna dapat berinteraksi dengan sistem menggunakan perangkat mouse dan keyboard (pada PC/Laptop) atau touchscreen (pada perangkat mobile).
- **Konsep Desain:** Sistem menerapkan navigasi yang ramah pengguna (user-friendly) dengan ketersediaan menu utama seperti Beranda, Katalog Produk, Keranjang Belanja, dan Halaman Login/Registrasi.
- **Antarmuka Admin:** Terdapat dashboard khusus bagi Admin untuk melakukan operasi CRUD (tambah, lihat, ubah, hapus) pada data produk dan mengelola status pesanan.

### 3.1.2 Antarmuka Perangkat Keras

Karena Zenvy Apparel merupakan aplikasi berbasis web yang beroperasi secara online murni, sistem ini tidak membutuhkan antarmuka perangkat keras khusus secara langsung (seperti barcode scanner, sensor suhu, mesin EDC, atau customer display di kasir). Sistem murni mengandalkan perangkat keras standar yang ada pada perangkat klien (layar monitor, keyboard, mouse, atau layar sentuh) dan server pendukung untuk hosting.

### 3.1.3 Antarmuka Perangkat Lunak

Sistem Zenvy Apparel memiliki keterhubungan dengan beberapa perangkat lunak pendukung:

- **Sistem Manajemen Basis Data (DBMS):** Berinteraksi dengan MySQL (minimal versi 5.7) untuk menyimpan dan mengelola keseluruhan data pengguna, produk, dan transaksi pesanan.
- **Web Server:** Menggunakan Nginx atau Apache (bertindak sebagai reverse proxy) untuk menerima permintaan HTTP dari pengguna dan meneruskannya ke server backend.
- **Web Browser:** Membutuhkan peramban web (seperti Google Chrome, Mozilla Firefox, Safari, atau Microsoft Edge versi terbaru) di sisi client.
- **Lingkungan Runtime & Bahasa Pemrograman:** Keseluruhan sistem menggunakan JavaScript sebagai bahasa pemrograman utama.
  - **Frontend (Sisi Pengguna):** Dibangun menggunakan library React JS untuk menciptakan antarmuka pengguna yang interaktif, dinamis, dan responsif.
  - **Backend (Sisi Server):** Berjalan di atas lingkungan Node.js dengan menggunakan framework seperti Express.js. Sistem backend ini bertindak sebagai penyedia Application Programming Interface (API) RESTful.
- **Package Manager:** Membutuhkan NPM (Node Package Manager) atau Yarn untuk mengelola pustaka (library) serta dependensi aplikasi.

### 3.1.4 Antarmuka Komunikasi dan Jaringan

Sistem ini dirancang untuk beroperasi melalui jaringan internet dengan arsitektur Client-Server.

- **Protokol Komunikasi:** Menggunakan protokol HTTP/HTTPS untuk menjamin keamanan komunikasi dan pertukaran data antara browser pengguna dengan server Zenvy Apparel.
- **Kebutuhan Jaringan:** Membutuhkan koneksi internet berbasis TCP/IP dari sisi pengguna agar dapat mengakses website dan melakukan transaksi.

---

## 3.2 Fitur Sistem

### 3.2.1 Deskripsi Fungsional

> *Gambar 1: Use Case Diagram*

Pada Use Case Diagram, sistem e-commerce Zenvy Apparel melibatkan dua aktor utama: **Customer** dan **Admin**.

**Sisi Customer:**
- Aktivitas tanpa login: mendaftarkan akun baru, melihat katalog produk
- Ekstensi pada katalog: mencari produk tertentu, melihat detail produk
- Aktivitas yang wajib login (include): memasukkan barang ke keranjang, melakukan checkout, melihat riwayat pembelian, menghubungi CS
- Ekstensi pada riwayat pembelian: memberikan rating/ulasan pada pesanan selesai

**Sisi Admin:**
- Seluruh aktivitas wajib login (include)
- Mengelola data produk di katalog
- Mengatur program promo/diskon
- Memantau dan memperbarui status pesanan
- Mengelola data akun terdaftar
- Merespons pesan layanan pelanggan dari Customer

### 3.2.2 Kebutuhan Fungsional

#### 3.2.2.1 Kebutuhan Customer

##### 1. Registrasi Akun

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer memilih menu "Daftar/Registrasi" |
| **Response** | Sistem menampilkan form isian identitas (Nama, E-mail, Password, dll) |
| **Stimulus** | Customer mengisi data identitas, kemudian klik "Simpan/Daftar" |
| **Response** | Sistem memunculkan tampilan data tersimpan dan mengirimkan link verifikasi ke e-mail Customer |
| **Stimulus** | Customer membuka pesan di e-mail, kemudian klik link yang dikirimkan |
| **Response** | Sistem memverifikasi link. Jika benar, keanggotaan diaktifkan dan dibuatkan ID Member |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-01 | Sistem mampu menampilkan form pendaftaran member baru yang berisi isian data diri |
| NF-02 | Sistem mampu membuat dan mengirimkan link verifikasi ke e-mail Customer |
| NF-03 | Sistem mampu memverifikasi link dan meng-generate ID member baru ke dalam database |

##### 2. Login

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer memilih menu "Login" dan mengisikan E-mail serta Password, lalu klik "Masuk" |
| **Response** | Sistem memvalidasi data dengan database. Jika valid, membuat sesi login dan mengarahkan ke halaman utama. Jika salah, menampilkan pesan error |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-04 | Sistem menyediakan antarmuka form Login (E-mail dan Password) |
| NF-05 | Sistem mampu memvalidasi kredensial pengguna berdasarkan data di database |
| NF-06 | Sistem mampu menyimpan sesi (session) login Customer |

##### 3. Melihat Katalog Produk

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer mengakses halaman utama sistem |
| **Response** | Sistem menampilkan halaman katalog berisi daftar produk (foto, nama, harga) |
| **Stimulus** | Customer mengetikkan kata kunci di kolom pencarian (extend) |
| **Response** | Sistem memfilter dan menampilkan produk yang sesuai dengan kata kunci |
| **Stimulus** | Customer mengklik salah satu gambar produk (extend) |
| **Response** | Sistem memunculkan halaman Detail Produk (deskripsi lengkap, stok, varian) |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-07 | Sistem mampu memuat dan menampilkan data produk dari database ke dalam bentuk katalog |
| NF-08 | Sistem menyediakan fungsi pencarian (filter) produk |
| NF-09 | Sistem mampu menampilkan halaman detail spesifik untuk setiap ID Produk |

##### 4. Menambah ke Keranjang

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer memilih varian produk, menentukan jumlah, dan mengklik "Tambah ke Keranjang" |
| **Response** | Sistem menyimpan data pilihan ke keranjang dan memperbarui indikator jumlah barang |
| **Stimulus** | Customer mengklik ikon keranjang |
| **Response** | Sistem menampilkan rincian barang beserta subtotal harganya |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-10 | Sistem mampu menyimpan sementara data produk yang dipilih ke dalam session atau database keranjang |
| NF-11 | Sistem mampu melakukan kalkulasi subtotal harga barang di dalam keranjang |

##### 5. Melakukan Checkout

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer menekan tombol "Checkout" di halaman keranjang |
| **Response** | Sistem mengecek status Login, menampilkan form ringkasan pesanan, pilihan kurir, dan metode pembayaran |
| **Stimulus** | Customer melengkapi form pengiriman dan pembayaran, lalu klik "Buat Pesanan" |
| **Response** | Sistem menyimpan pesanan ke database, mengurangi stok barang, dan menampilkan ID Pesanan beserta instruksi pembayaran |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-12 | Sistem mampu mencegah proses checkout jika pengguna belum login |
| NF-13 | Sistem menyediakan formulir pemilihan alamat, kurir, dan metode pembayaran |
| NF-14 | Sistem mampu membuat rekaman data pesanan (order) baru ke dalam database |
| NF-15 | Sistem mampu mengurangi ketersediaan stok produk secara otomatis setelah pesanan dibuat |

##### 6. Melihat Riwayat Pembelian & Memberi Rating

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer mengklik menu "Riwayat Pembelian" |
| **Response** | Sistem mengecek status Login, menampilkan daftar riwayat pesanan milik Customer |
| **Stimulus** | Customer memilih pesanan berstatus selesai dan mengklik "Beri Rating" (extend) |
| **Response** | Sistem menampilkan form ulasan (bintang dan komentar teks) |
| **Stimulus** | Customer mengisi form ulasan dan mengklik "Kirim" |
| **Response** | Sistem menyimpan rating ke database dan memperbarui nilai ulasan pada halaman detail produk |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-16 | Sistem mampu menampilkan riwayat transaksi yang difilter berdasarkan ID Customer yang sedang login |
| NF-17 | Sistem menyediakan antarmuka form pengisian ulasan (bintang dan teks) |
| NF-18 | Sistem mampu menyimpan dan menampilkan akumulasi rating ke masing-masing data produk |

##### 7. Menghubungi CS

| Stimulus / Response | Deskripsi |
|---|---|
| **Stimulus** | Customer mengklik menu "Hubungi CS" |
| **Response** | Sistem mengecek status Login, menampilkan antarmuka obrolan (chat) atau pengisian tiket bantuan |
| **Stimulus** | Customer mengetikkan pesan keluhan dan mengklik "Kirim" |
| **Response** | Sistem meneruskan pesan ke database Admin dan memberikan notifikasi bahwa pesan terkirim |

**Kebutuhan Fungsional:**

| Kode | Kebutuhan |
|---|---|
| NF-19 | Sistem menyediakan fitur formulir pesan kontak atau live chat untuk Customer |
| NF-20 | Sistem mampu menyimpan riwayat percakapan/pesan agar dapat diakses oleh Admin |

---

## 3.3 Kebutuhan Data

### 3.3.1 ERD

> *Gambar: Entity Relationship Diagram*

### 3.3.2 Rancangan Simpanan Data

Sistem yang dibuat menggunakan **15 (lima belas) buah tabel** yang kesemuanya saling berelasi: `users`, `alamat_pengiriman`, `kategori`, `produk`, `promosi`, `foto_produk`, `varian_produk`, `keranjang`, `kurir`, `voucher`, `pesanan`, `detail_pesanan`, `pembayaran`, `ulasan`, dan `pesan_cs`.

#### Tabel 3.1 â€” `users`

| **Nama Tabel** | users |
|---|---|
| **Fungsi** | Menyimpan identitas dasar pengguna (pelanggan maupun admin) |
| **Kunci Utama** | id_user |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_user | Int | Primary Key, auto_increment |
| 2 | nama_lengkap | Varchar(100) | Nama lengkap pengguna |
| 3 | email | Varchar(100) | Alamat email (unik) |
| 4 | password | Varchar(255) | Kata sandi pengguna (terenkripsi) |
| 5 | no_telp | Varchar(15) | Nomor telepon/WhatsApp |
| 6 | tgl_daftar | Date | Tanggal registrasi akun |
| 7 | level_akses | Varchar(50) | Hak akses ('admin' atau 'customer') |

#### Tabel 3.2 â€” `alamat_pengiriman`

| **Nama Tabel** | alamat_pengiriman |
|---|---|
| **Fungsi** | Menyimpan daftar alamat pengiriman pelanggan |
| **Kunci Utama** | id_alamat |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_alamat | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key â†’ users |
| 3 | label_alamat | Varchar(50) | Label tempat (Rumah, Kantor) |
| 4 | nama_penerima | Varchar(100) | Nama penerima paket |
| 5 | alamat_lengkap | Text | Rincian jalan, RT/RW, kelurahan |
| 6 | kota | Varchar(100) | Kota/Kabupaten tujuan |
| 7 | kode_pos | Varchar(10) | Kode pos wilayah tujuan |

#### Tabel 3.3 â€” `kategori`

| **Nama Tabel** | kategori |
|---|---|
| **Fungsi** | Menyimpan pengelompokan jenis produk |
| **Kunci Utama** | id_kategori |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_kategori | Int | Primary Key, auto_increment |
| 2 | nama_kategori | Varchar(50) | Nama label kategori produk |
| 3 | icon_kategori | Varchar(255) | URL/Nama file gambar icon kategori |

#### Tabel 3.4 â€” `produk`

| **Nama Tabel** | produk |
|---|---|
| **Fungsi** | Menyimpan data katalog (induk barang) utama |
| **Kunci Utama** | id_produk |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_produk | Int | Primary Key, auto_increment |
| 2 | id_kategori | Int | Foreign Key â†’ kategori |
| 3 | nama_produk | Varchar(150) | Nama barang/produk |
| 4 | deskripsi | Text | Penjelasan detail produk |

#### Tabel 3.5 â€” `promosi`

| **Nama Tabel** | promosi |
|---|---|
| **Fungsi** | Menyimpan data diskon persentase untuk produk tertentu |
| **Kunci Utama** | id_promosi |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_promosi | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key â†’ produk |
| 3 | persentase_diskon | Decimal | Nilai persentase potongan harga |
| 4 | batas_waktu | Datetime | Waktu kedaluwarsa masa promosi |

#### Tabel 3.6 â€” `foto_produk`

| **Nama Tabel** | foto_produk |
|---|---|
| **Fungsi** | Menyimpan galeri foto untuk tiap produk (maks 10 foto) |
| **Kunci Utama** | id_foto |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_foto | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key â†’ produk |
| 3 | file_foto | Varchar(255) | URL/Nama file gambar produk |

#### Tabel 3.7 â€” `varian_produk`

| **Nama Tabel** | varian_produk |
|---|---|
| **Fungsi** | Menyimpan spesifikasi SKU, harga, warna, ukuran, dan stok |
| **Kunci Utama** | id_varian |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_varian | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key â†’ produk |
| 3 | sku | Varchar(50) | Kode unik barang (Otomatis via Trigger) |
| 4 | warna | Varchar(50) | Varian warna (Hitam, Putih) |
| 5 | ukuran | Varchar(10) | Varian ukuran (S, M, L, XL) |
| 6 | harga | Int | Harga jual untuk varian ini |
| 7 | stok | Int | Ketersediaan jumlah barang spesifik |

#### Tabel 3.8 â€” `keranjang`

| **Nama Tabel** | keranjang |
|---|---|
| **Fungsi** | Menyimpan data belanjaan sementara pelanggan |
| **Kunci Utama** | id_keranjang |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_keranjang | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key â†’ users |
| 3 | id_varian | Int | Foreign Key â†’ varian_produk |
| 4 | qty | Int | Jumlah barang yang dimasukkan |

#### Tabel 3.9 â€” `kurir`

| **Nama Tabel** | kurir |
|---|---|
| **Fungsi** | Menyimpan master data jasa pengiriman logistik |
| **Kunci Utama** | id_kurir |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_kurir | Int | Primary Key, auto_increment |
| 2 | nama_kurir | Varchar(50) | Nama ekspedisi (JNE, J&T) |
| 3 | ongkos_kirim | Int | Biaya pengiriman standar |

#### Tabel 3.10 â€” `voucher`

| **Nama Tabel** | voucher |
|---|---|
| **Fungsi** | Menyimpan data kupon potongan harga spesifik |
| **Kunci Utama** | id_voucher |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_voucher | Int | Primary Key, auto_increment |
| 2 | kode_voucher | Varchar(20) | Kode unik (ZENVY100) |
| 3 | nominal_diskon | Int | Potongan harga (dalam Rupiah) |
| 4 | kuota | Int | Sisa batas penggunaan voucher |
| 5 | batas_waktu | Datetime | Waktu kedaluwarsa voucher |

#### Tabel 3.11 â€” `pesanan`

| **Nama Tabel** | pesanan |
|---|---|
| **Fungsi** | Menyimpan data header (invoice) transaksi utama |
| **Kunci Utama** | id_pesanan |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_pesanan | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key â†’ users |
| 3 | id_alamat | Int | Foreign Key â†’ alamat_pengiriman |
| 4 | id_kurir | Int | Foreign Key â†’ kurir |
| 5 | id_voucher | Int | Foreign Key â†’ voucher (nullable) |
| 6 | tgl_pesan | Datetime | Waktu pesanan dibuat |
| 7 | total_tagihan | Int | Total biaya keseluruhan pesanan |
| 8 | status_pesanan | Varchar(50) | Status (Belum Bayar, Diproses, Selesai) |
| 9 | no_resi | Varchar(50) | Nomor resi ekspedisi |

#### Tabel 3.12 â€” `detail_pesanan`

| **Nama Tabel** | detail_pesanan |
|---|---|
| **Fungsi** | Menyimpan rincian varian produk yang dibeli per transaksi |
| **Kunci Utama** | id_detail |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_detail | Int | Primary Key, auto_increment |
| 2 | id_pesanan | Int | Foreign Key â†’ pesanan |
| 3 | id_varian | Int | Foreign Key â†’ varian_produk |
| 4 | harga_satuan | Int | Harga produk saat transaksi terjadi |
| 5 | qty | Int | Jumlah barang yang dibeli |
| 6 | subtotal | Int | Hasil kali qty dengan harga_satuan |

#### Tabel 3.13 â€” `pembayaran`

| **Nama Tabel** | pembayaran |
|---|---|
| **Fungsi** | Menyimpan konfirmasi dan bukti pembayaran transaksi |
| **Kunci Utama** | id_pembayaran |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_pembayaran | Int | Primary Key, auto_increment |
| 2 | id_pesanan | Int | Foreign Key â†’ pesanan |
| 3 | metode_bayar | Varchar(50) | Transfer Bank, e-Wallet |
| 4 | bukti_transfer | Varchar(255) | Nama file unggahan bukti bayar |
| 5 | tgl_bayar | Datetime | Waktu pelanggan melakukan pembayaran |
| 6 | status_bayar | Varchar(50) | Status (Pending, Lunas, Ditolak) |

#### Tabel 3.14 â€” `ulasan`

| **Nama Tabel** | ulasan |
|---|---|
| **Fungsi** | Menyimpan penilaian (rating) untuk produk |
| **Kunci Utama** | id_ulasan |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_ulasan | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key â†’ produk |
| 3 | id_user | Int | Foreign Key â†’ users |
| 4 | rating | Tinyint | Nilai bintang (1 hingga 5) |
| 5 | tgl_ulasan | Date | Waktu penilaian diberikan |

#### Tabel 3.15 â€” `pesan_cs`

| **Nama Tabel** | pesan_cs |
|---|---|
| **Fungsi** | Menyimpan riwayat keluhan atau tiket bantuan pelanggan |
| **Kunci Utama** | id_pesan |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_pesan | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key â†’ users |
| 3 | subjek | Varchar(100) | Topik keluhan/pertanyaan |
| 4 | isi_pesan | Text | Rincian pesan dari pengguna |
| 5 | tgl_kirim | Datetime | Waktu pesan dikirimkan |
| 6 | status_balasan | Varchar(50) | Status (Belum Dibalas, Sudah Dibalas) |

### 3.3.3 Relasi Antar Tabel

> *Gambar: Diagram Relasi Antar Tabel*

---

## 3.4 Kebutuhan Non Fungsional

### 3.4.1 Kebutuhan Kinerja

- Waktu respons (response time) sistem untuk memuat halaman utama, katalog produk, dan hasil pencarian maksimal adalah **3 hingga 5 detik** pada koneksi internet standar (4G/Wi-Fi stabil).
- Sistem harus mampu menangani setidaknya **500 pengguna aktif** yang mengakses dan melakukan transaksi secara bersamaan (concurrent users) tanpa mengalami penurunan performa yang signifikan.

### 3.4.2 Kebutuhan Keselamatan Data

- Sistem harus melakukan **backup** keseluruhan basis data secara otomatis setiap **1Ã—24 jam** (misalnya pada pukul 00:00 WIB).
- Sistem harus memiliki mekanisme **data recovery** yang memungkinkan Administrator untuk memulihkan (restore) data ke titik backup terakhir apabila terjadi kerusakan sistem.

### 3.4.3 Kebutuhan Perlindungan Keamanan

- Sistem harus menggunakan protokol enkripsi jaringan **SSL/TLS (HTTPS)** untuk memastikan keamanan pengiriman data.
- Password harus dienkripsi menggunakan algoritma hashing yang kuat (seperti **Bcrypt** atau **Argon2**) di dalam basis data.
- Sistem harus menerapkan **manajemen hak akses (Access Control)**. Customer tidak memiliki akses untuk membuka URL dasbor Admin, dan sistem harus otomatis memblokir serta mengalihkan (redirect) percobaan akses paksa tersebut.

### 3.4.4 Atribut Kualitas Perangkat Lunak

| Atribut | Deskripsi |
|---|---|
| **Availability** | Sistem harus siap beroperasi 24/7 dengan tingkat uptime server minimal 99%. Downtime hanya diperbolehkan saat maintenance terjadwal. |
| **Reliability** | Sistem harus kebal terhadap bug fatal yang merusak kalkulasi harga. Jika terjadi error, sistem menampilkan pesan error yang user-friendly (bukan source code). |
| **Ergonomy** | Antarmuka harus dibangun dengan prinsip Responsive Web Design, sehingga tampilan menyesuaikan di PC/Laptop, Tablet, maupun Smartphone. |
| **Portability** | Sistem berbasis web sehingga dapat diakses dan berfungsi penuh di berbagai browser modern (Chrome, Firefox, Safari, Edge) dan berbagai OS (Windows, macOS, Android, iOS). |
# 4. Desain Masukan Keluaran

## 4.1 SiteMap (Web Base)

> *Gambar 1: Sitemap Website Zenvy Apparel*

### Penjelasan Sitemap

Sitemap pada gambar menggambarkan struktur navigasi dan hubungan antar halaman pada sistem website Zenvy Apparel secara menyeluruh.

#### 1. Struktur Menu Utama

Halaman utama yang dapat diakses langsung oleh pengguna:

- **Beranda** â€” Halaman awal dengan highlight produk
- **Tentang Kami** â€” Profil dan informasi perusahaan
- **Produk** â€” Pusat katalog barang
  - Katalog Produk
  - Detail Produk
  - Pencarian Produk
- **Promo** â€” Penawaran diskon
- **Lokasi** â€” Alamat atau informasi tempat
- **Hubungi CS** â€” Komunikasi dengan layanan pelanggan

#### 2. Sistem Autentikasi

- Registrasi â†’ Membuat akun baru
- Login â†’ Masuk ke dalam sistem
- Lupa Password â†’ Reset Password (pemulihan akun)

#### 3. Alur Pengguna (User Flow)

Setelah berhasil login, pengguna dapat mengakses:

- Profil Customer
- Keranjang â†’ Checkout â†’ Detail Pesanan
- Riwayat Pembelian â†’ Ulasan / Rating

#### 4. Admin Panel

Fitur pada Admin Panel setelah login:

- **Dashboard Admin** â€” Ringkasan data
- **Profil Admin** â€” Kelola data akun admin
- **Produk dan Stok** â€” Daftar / Detail / Tambah / Edit Produk, Variasi Produk
- **Pesanan** â€” Daftar / Detail / Update Status Pesanan
- **Promosi** â€” Promo dan Kupon (Tambah/Edit)
- **Akun dan Akses** â€” Daftar / Tambah / Edit Akun

---

## 4.2 Desain Halaman Utama

> *Gambar 2: Homepage Zenvy*

### Komponen Halaman Utama:

**1. Header (Bagian Atas â€” Sticky)**
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
| Judul | "Masuk" â€” "Masukkan Detail Anda Dibawah" |
| Form Input | Email dan Password |
| Tautan Pemulihan | "Lupa kata sandi? Klik disini" |
| Tombol Aksi | "Masuk" â€” memverifikasi kredensial dan mengarahkan ke halaman utama |
| Navigasi Tambahan | "Belum punya akun? Registrasi disini" |

### 2. Halaman Registrasi

> *Gambar 3: Halaman Registrasi*

| Komponen | Deskripsi |
|---|---|
| Area Branding | Identik dengan halaman Masuk |
| Judul | "Registrasi" â€” "Enter Your Detail Below" |
| Form Input | Username, Email, Password |
| Tombol Aksi | "Registrasi" â€” membuat akun baru di basis data |
| Navigasi Tambahan | "Sudah punya akun? Masuk disini" |

### 3. Halaman Lupa Password

> *Gambar 4: Halaman Lupa Password*

| Komponen | Deskripsi |
|---|---|
| Judul | "Lupa Password?" |
| Form Input | Email terdaftar |
| Tombol Aksi | "Kirim" â€” mengirim link/kode OTP reset password |
| Navigasi | "â† Kembali Ke halaman Login" |

### 4. Halaman Reset Password

> *Gambar 5: Halaman Reset Password*

| Komponen | Deskripsi |
|---|---|
| Judul | "Lupa Password?" |
| Form Input | Password Baru, Konfirmasi Password Baru |
| Tombol Aksi | "Kirim" â€” menyimpan password baru ke database |
| Navigasi | "â† Kembali Ke halaman Login" |

### 5. Halaman Profil Pelanggan (Edit)

> *Gambar 6: Halaman Edit Profil*

| Komponen | Deskripsi |
|---|---|
| Header Profil | Avatar default + nama pengguna |
| Form Data Diri | Nama, Kata Sandi, Email, No Telepon |
| Tombol Aksi | "Simpan" â€” memperbarui data di database |

### 6. Halaman Checkout

> *Gambar 7: Halaman Checkout*

| Komponen | Deskripsi |
|---|---|
| Form Input (Kiri) | Alamat, Jasa Kirim (dropdown), Kupon Diskon + tombol "Gunakan", Metode Pembayaran (dropdown) |
| Ringkasan Pesanan (Kanan) | Subtotal, Biaya pengirim, Pajak, Total Pembayaran |
| Tombol Aksi | "BAYAR" â€” memproses pesanan dan mengarahkan ke payment |

### 7â€“10. Panel Admin â€” Produk dan Stok

> *Gambar 9â€“12: Panel Admin Produk*

| Halaman | Komponen Utama |
|---|---|
| **Daftar Produk** | Tabel (ID, Nama Produk, Kategori), Pencarian, Tombol Detail/Edit/Hapus/Tambah |
| **Tambah Produk** | Form (Nama, Kategori dropdown, Deskripsi), Upload Foto, Tombol Simpan/Batal |
| **Edit Produk** | Form terisi data produk, Upload/Hapus Foto, Tombol Simpan/Batal |
| **Detail Produk** | Info produk (read-only), Galeri foto, Tabel variasi (ID, SKU, Warna, Ukuran, Stok, Harga) + aksi Detail/Edit/Hapus/Tambah |

### 11â€“12. Panel Admin â€” Pesanan (Update Status)

> *Gambar 13â€“14: Panel Admin Pesanan*

| Halaman | Komponen Utama |
|---|---|
| **Update Status** | Tabel pesanan dengan checkbox, status berwarna, "Pilih Semua", Tombol Perbarui/Batal |
| **Pop-up Konfirmasi** | ID pesanan, pilihan status (radio button: Diproses/Dikirim/Dibatalkan/Pembayaran/Selesai), Tombol Konfirmasi |

### 13â€“14. Panel Admin â€” Variasi Produk

> *Gambar 15â€“16: Panel Admin Variasi*

| Halaman | Komponen Utama |
|---|---|
| **Edit Variasi** | Form (SKU, Warna dropdown, Ukuran dropdown, Stok Â±, Harga Â±), Tabel referensi variasi |
| **Tambah Variasi** | Form input identik dengan edit, Tabel referensi variasi yang sudah ada |

### 15â€“18. Panel Admin â€” Promosi (Kupon & Promo)

> *Gambar 17â€“20: Panel Admin Promosi*

| Halaman | Komponen Utama |
|---|---|
| **Tambah Kupon** | Form (Kode Kupon, Tanggal Kadaluarsa, Kuota Â±, Persentase Diskon Â±) |
| **Tambah Promo** | Form (Pilih Produk, Tanggal Kadaluarsa, Persentase Diskon Â±) |
| **Edit Kupon** | Form terisi data kupon (ID, Kode, Tanggal, Kuota, Diskon) |
| **Edit Promo** | Form terisi data promo (ID Produk, Nama Produk, Tanggal, Diskon) |

### 19â€“20. Panel Admin â€” Akun dan Akses

> *Gambar 21â€“22: Panel Admin Akun*

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
| Opsi Variasi | Pilihan warna (lingkaran warna) + Pilihan ukuran (Sâ€“XXL) |
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
| Daftar Produk (Kiri) | Kartu item (gambar, nama, variasi, harga, kontrol qty Â±, tombol Remove, checkbox) |
| Ringkasan Biaya (Kanan) | Subtotal, Biaya pengiriman, Pajak, Total Pembayaran |
| Tombol Aksi | "BAYAR" â€” menuju checkout final |

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

### 7. Panel Admin â€” Daftar Pesanan

> *Gambar 29: Daftar Pesanan Admin*

| Komponen | Deskripsi |
|---|---|
| Tabel Pesanan | ID, Customer, Tanggal, Total, Status (warna), Aksi (Detail/Hapus) |
| Fitur | Pencarian, Tombol "Perbarui Status" |

### 8. Panel Admin â€” Detail Pesanan

> *Gambar 30: Detail Pesanan Admin*

| Komponen | Deskripsi |
|---|---|
| Info Pesanan | Nama Customer, Metode Pembayaran, Alamat lengkap |
| Tabel Barang | No, Nama Produk, Varian, Qty, Harga |

### 9. Panel Admin â€” Variasi Detail

> *Gambar 31: Detail Variasi Produk*

| Komponen | Deskripsi |
|---|---|
| Info Variasi (read-only) | SKU, Warna, Ukuran, Stok, Harga |
| Tabel Variasi | Semua variasi produk (ID, SKU, Warna, Ukuran, Stok, Harga, Aksi) |
| Tombol Aksi | "Edit" |

### 10. Panel Admin â€” Daftar Kupon

> *Gambar 32: Daftar Kupon*

| Komponen | Deskripsi |
|---|---|
| Tabel Kupon | ID, Kode Kupon, Batas Waktu, Kuota, Diskon |
| Fitur | Pencarian, Tombol Tambah/Edit/Hapus |

### 11. Panel Admin â€” Daftar Promo

> *Gambar 33: Daftar Promo*

| Komponen | Deskripsi |
|---|---|
| Tabel Promo | ID, Nama Produk, Diskon, Batas Waktu |
| Fitur | Pencarian, Tombol Tambah/Edit/Hapus |

### 12. Panel Admin â€” Daftar Akun

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
| F-11 | Kalkulasi subtotal harga keranjang | Perhitungan otomatis harga Ã— qty |
| F-12 | Mencegah checkout jika belum login | Redirect ke halaman login |
| F-13 | Formulir pemilihan alamat, kurir, metode bayar | Form checkout lengkap |
| F-14 | Membuat rekaman pesanan (order) baru | Insert ke tabel pesanan dan detail_pesanan |
| F-15 | Mengurangi stok otomatis setelah pesanan dibuat | Update stok di tabel varian_produk |
| F-16 | Menampilkan riwayat transaksi per customer | Filter berdasarkan ID Customer |
| F-17 | Form pengisian ulasan (bintang dan teks) | Rating 1â€“5 dan komentar |
| F-18 | Menyimpan dan menampilkan akumulasi rating | Rata-rata rating per produk |
| F-19 | Fitur formulir pesan kontak / live chat | Form kontak untuk customer |
| F-20 | Menyimpan riwayat percakapan/pesan CS | Histori pesan tersimpan di database admin |

## Ringkasan Kebutuhan Non Fungsional

| Kode | Kebutuhan | Keterangan |
|---|---|---|
| NF-01 | Waktu respons halaman maksimal 3â€“5 detik | Pada koneksi 4G/Wi-Fi stabil |
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

<p align="center"><em>â€” Akhir Dokumen â€”</em></p>
