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

#### Tabel 3.1 — `users`

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

#### Tabel 3.2 — `alamat_pengiriman`

| **Nama Tabel** | alamat_pengiriman |
|---|---|
| **Fungsi** | Menyimpan daftar alamat pengiriman pelanggan |
| **Kunci Utama** | id_alamat |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_alamat | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key → users |
| 3 | label_alamat | Varchar(50) | Label tempat (Rumah, Kantor) |
| 4 | nama_penerima | Varchar(100) | Nama penerima paket |
| 5 | alamat_lengkap | Text | Rincian jalan, RT/RW, kelurahan |
| 6 | kota | Varchar(100) | Kota/Kabupaten tujuan |
| 7 | kode_pos | Varchar(10) | Kode pos wilayah tujuan |

#### Tabel 3.3 — `kategori`

| **Nama Tabel** | kategori |
|---|---|
| **Fungsi** | Menyimpan pengelompokan jenis produk |
| **Kunci Utama** | id_kategori |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_kategori | Int | Primary Key, auto_increment |
| 2 | nama_kategori | Varchar(50) | Nama label kategori produk |
| 3 | icon_kategori | Varchar(255) | URL/Nama file gambar icon kategori |

#### Tabel 3.4 — `produk`

| **Nama Tabel** | produk |
|---|---|
| **Fungsi** | Menyimpan data katalog (induk barang) utama |
| **Kunci Utama** | id_produk |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_produk | Int | Primary Key, auto_increment |
| 2 | id_kategori | Int | Foreign Key → kategori |
| 3 | nama_produk | Varchar(150) | Nama barang/produk |
| 4 | deskripsi | Text | Penjelasan detail produk |

#### Tabel 3.5 — `promosi`

| **Nama Tabel** | promosi |
|---|---|
| **Fungsi** | Menyimpan data diskon persentase untuk produk tertentu |
| **Kunci Utama** | id_promosi |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_promosi | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key → produk |
| 3 | persentase_diskon | Decimal | Nilai persentase potongan harga |
| 4 | batas_waktu | Datetime | Waktu kedaluwarsa masa promosi |

#### Tabel 3.6 — `foto_produk`

| **Nama Tabel** | foto_produk |
|---|---|
| **Fungsi** | Menyimpan galeri foto untuk tiap produk (maks 10 foto) |
| **Kunci Utama** | id_foto |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_foto | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key → produk |
| 3 | file_foto | Varchar(255) | URL/Nama file gambar produk |

#### Tabel 3.7 — `varian_produk`

| **Nama Tabel** | varian_produk |
|---|---|
| **Fungsi** | Menyimpan spesifikasi SKU, harga, warna, ukuran, dan stok |
| **Kunci Utama** | id_varian |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_varian | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key → produk |
| 3 | sku | Varchar(50) | Kode unik barang (Otomatis via Trigger) |
| 4 | warna | Varchar(50) | Varian warna (Hitam, Putih) |
| 5 | ukuran | Varchar(10) | Varian ukuran (S, M, L, XL) |
| 6 | harga | Int | Harga jual untuk varian ini |
| 7 | stok | Int | Ketersediaan jumlah barang spesifik |

#### Tabel 3.8 — `keranjang`

| **Nama Tabel** | keranjang |
|---|---|
| **Fungsi** | Menyimpan data belanjaan sementara pelanggan |
| **Kunci Utama** | id_keranjang |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_keranjang | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key → users |
| 3 | id_varian | Int | Foreign Key → varian_produk |
| 4 | qty | Int | Jumlah barang yang dimasukkan |

#### Tabel 3.9 — `kurir`

| **Nama Tabel** | kurir |
|---|---|
| **Fungsi** | Menyimpan master data jasa pengiriman logistik |
| **Kunci Utama** | id_kurir |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_kurir | Int | Primary Key, auto_increment |
| 2 | nama_kurir | Varchar(50) | Nama ekspedisi (JNE, J&T) |
| 3 | ongkos_kirim | Int | Biaya pengiriman standar |

#### Tabel 3.10 — `voucher`

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

#### Tabel 3.11 — `pesanan`

| **Nama Tabel** | pesanan |
|---|---|
| **Fungsi** | Menyimpan data header (invoice) transaksi utama |
| **Kunci Utama** | id_pesanan |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_pesanan | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key → users |
| 3 | id_alamat | Int | Foreign Key → alamat_pengiriman |
| 4 | id_kurir | Int | Foreign Key → kurir |
| 5 | id_voucher | Int | Foreign Key → voucher (nullable) |
| 6 | tgl_pesan | Datetime | Waktu pesanan dibuat |
| 7 | total_tagihan | Int | Total biaya keseluruhan pesanan |
| 8 | status_pesanan | Varchar(50) | Status (Belum Bayar, Diproses, Selesai) |
| 9 | no_resi | Varchar(50) | Nomor resi ekspedisi |

#### Tabel 3.12 — `detail_pesanan`

| **Nama Tabel** | detail_pesanan |
|---|---|
| **Fungsi** | Menyimpan rincian varian produk yang dibeli per transaksi |
| **Kunci Utama** | id_detail |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_detail | Int | Primary Key, auto_increment |
| 2 | id_pesanan | Int | Foreign Key → pesanan |
| 3 | id_varian | Int | Foreign Key → varian_produk |
| 4 | harga_satuan | Int | Harga produk saat transaksi terjadi |
| 5 | qty | Int | Jumlah barang yang dibeli |
| 6 | subtotal | Int | Hasil kali qty dengan harga_satuan |

#### Tabel 3.13 — `pembayaran`

| **Nama Tabel** | pembayaran |
|---|---|
| **Fungsi** | Menyimpan konfirmasi dan bukti pembayaran transaksi |
| **Kunci Utama** | id_pembayaran |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_pembayaran | Int | Primary Key, auto_increment |
| 2 | id_pesanan | Int | Foreign Key → pesanan |
| 3 | metode_bayar | Varchar(50) | Transfer Bank, e-Wallet |
| 4 | bukti_transfer | Varchar(255) | Nama file unggahan bukti bayar |
| 5 | tgl_bayar | Datetime | Waktu pelanggan melakukan pembayaran |
| 6 | status_bayar | Varchar(50) | Status (Pending, Lunas, Ditolak) |

#### Tabel 3.14 — `ulasan`

| **Nama Tabel** | ulasan |
|---|---|
| **Fungsi** | Menyimpan penilaian (rating) untuk produk |
| **Kunci Utama** | id_ulasan |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_ulasan | Int | Primary Key, auto_increment |
| 2 | id_produk | Int | Foreign Key → produk |
| 3 | id_user | Int | Foreign Key → users |
| 4 | rating | Tinyint | Nilai bintang (1 hingga 5) |
| 5 | tgl_ulasan | Date | Waktu penilaian diberikan |

#### Tabel 3.15 — `pesan_cs`

| **Nama Tabel** | pesan_cs |
|---|---|
| **Fungsi** | Menyimpan riwayat keluhan atau tiket bantuan pelanggan |
| **Kunci Utama** | id_pesan |

| No | Field | Type | Keterangan |
|---|---|---|---|
| 1 | id_pesan | Int | Primary Key, auto_increment |
| 2 | id_user | Int | Foreign Key → users |
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

- Sistem harus melakukan **backup** keseluruhan basis data secara otomatis setiap **1×24 jam** (misalnya pada pukul 00:00 WIB).
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
