CREATE DATABASE IF NOT EXISTS toko_online;
USE toko_online;

CREATE TABLE users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  nama_lengkap VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  no_telp VARCHAR(15),
  tgl_daftar DATE,
  level_akses VARCHAR(50)
);

CREATE TABLE alamat_pengiriman (
  id_alamat INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  label_alamat VARCHAR(50),
  nama_penerima VARCHAR(100),
  alamat_lengkap TEXT,
  kota VARCHAR(100),
  kode_pos VARCHAR(10),
  CONSTRAINT fk_alamat_user
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE kategori (
  id_kategori INT AUTO_INCREMENT PRIMARY KEY,
  nama_kategori VARCHAR(50),
  icon_kategori VARCHAR(255)
);

CREATE TABLE produk (
  id_produk INT AUTO_INCREMENT PRIMARY KEY,
  id_kategori INT,
  nama_produk VARCHAR(150),
  deskripsi TEXT,
  CONSTRAINT fk_produk_kategori
    FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori)
);

CREATE TABLE promosi (
  id_promosi INT AUTO_INCREMENT PRIMARY KEY,
  id_produk INT,
  persentase_diskon DECIMAL(5,2),
  batas_waktu DATETIME,
  CONSTRAINT fk_promosi_produk
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
);

CREATE TABLE foto_produk (
  id_foto INT AUTO_INCREMENT PRIMARY KEY,
  id_produk INT,
  file_foto VARCHAR(255),
  CONSTRAINT fk_foto_produk
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
);

CREATE TABLE varian_produk (
  id_varian INT AUTO_INCREMENT PRIMARY KEY,
  id_produk INT,
  sku VARCHAR(50),
  warna VARCHAR(50),
  ukuran VARCHAR(10),
  harga INT,
  stok INT,
  CONSTRAINT fk_varian_produk
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
);

CREATE TABLE keranjang (
  id_keranjang INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_varian INT,
  qty INT,
  CONSTRAINT fk_keranjang_user
    FOREIGN KEY (id_user) REFERENCES users(id_user),
  CONSTRAINT fk_keranjang_varian
    FOREIGN KEY (id_varian) REFERENCES varian_produk(id_varian)
);

CREATE TABLE kurir (
  id_kurir INT AUTO_INCREMENT PRIMARY KEY,
  nama_kurir VARCHAR(50),
  ongkos_kirim INT
);

CREATE TABLE voucher (
  id_voucher INT AUTO_INCREMENT PRIMARY KEY,
  kode_voucher VARCHAR(20),
  nominal_diskon INT,
  kuota INT,
  batas_waktu DATETIME
);

CREATE TABLE pesanan (
  id_pesanan INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_alamat INT,
  id_kurir INT,
  id_voucher INT,
  tgl_pesan DATETIME,
  total_tagihan INT,
  status_pesanan VARCHAR(50),
  no_resi VARCHAR(50),
  CONSTRAINT fk_pesanan_user
    FOREIGN KEY (id_user) REFERENCES users(id_user),
  CONSTRAINT fk_pesanan_alamat
    FOREIGN KEY (id_alamat) REFERENCES alamat_pengiriman(id_alamat),
  CONSTRAINT fk_pesanan_kurir
    FOREIGN KEY (id_kurir) REFERENCES kurir(id_kurir),
  CONSTRAINT fk_pesanan_voucher
    FOREIGN KEY (id_voucher) REFERENCES voucher(id_voucher)
);

CREATE TABLE detail_pesanan (
  id_detail INT AUTO_INCREMENT PRIMARY KEY,
  id_pesanan INT,
  id_varian INT,
  harga_satuan INT,
  qty INT,
  subtotal INT,
  CONSTRAINT fk_detail_pesanan
    FOREIGN KEY (id_pesanan) REFERENCES pesanan(id_pesanan),
  CONSTRAINT fk_detail_varian
    FOREIGN KEY (id_varian) REFERENCES varian_produk(id_varian)
);

CREATE TABLE pembayaran (
  id_pembayaran INT AUTO_INCREMENT PRIMARY KEY,
  id_pesanan INT,
  metode_bayar VARCHAR(50),
  bukti_transfer VARCHAR(255),
  tgl_bayar DATETIME,
  status_bayar VARCHAR(50),
  CONSTRAINT fk_pembayaran_pesanan
    FOREIGN KEY (id_pesanan) REFERENCES pesanan(id_pesanan)
);

CREATE TABLE ulasan (
  id_ulasan INT AUTO_INCREMENT PRIMARY KEY,
  id_produk INT,
  id_user INT,
  rating TINYINT,
  tgl_ulasan DATE,
  CONSTRAINT fk_ulasan_produk
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk),
  CONSTRAINT fk_ulasan_user
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE pesan_cs (
  id_pesan INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  subjek VARCHAR(100),
  isi_pesan TEXT,
  tgl_kirim DATETIME,
  status_balasan VARCHAR(50),
  CONSTRAINT fk_pesan_cs_user
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);