-- ============================================================
-- DATABASE: zenvy_apparel
-- ============================================================
CREATE DATABASE IF NOT EXISTS zenvy_apparel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE zenvy_apparel;

-- 1. users
CREATE TABLE users (
  id_user      INT PRIMARY KEY AUTO_INCREMENT,
  nama_lengkap VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  no_telp      VARCHAR(15),
  tgl_daftar   DATE,
  level_akses  VARCHAR(50) DEFAULT 'customer'
);

-- 2. alamat_pengiriman
CREATE TABLE alamat_pengiriman (
  id_alamat      INT PRIMARY KEY AUTO_INCREMENT,
  id_user        INT NOT NULL,
  label_alamat   VARCHAR(50),
  nama_penerima  VARCHAR(100),
  alamat_lengkap TEXT,
  kota           VARCHAR(100),
  kode_pos       VARCHAR(10),
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- 3. kategori
CREATE TABLE kategori (
  id_kategori   INT PRIMARY KEY AUTO_INCREMENT,
  nama_kategori VARCHAR(50) NOT NULL,
  icon_kategori VARCHAR(255)
);

-- 4. produk
CREATE TABLE produk (
  id_produk   INT PRIMARY KEY AUTO_INCREMENT,
  id_kategori INT NOT NULL,
  nama_produk VARCHAR(150) NOT NULL,
  deskripsi   TEXT,
  FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori)
);

-- 5. promosi
CREATE TABLE promosi (
  id_promosi        INT PRIMARY KEY AUTO_INCREMENT,
  id_produk         INT NOT NULL,
  persentase_diskon DECIMAL(5,2) NOT NULL,
  batas_waktu       DATETIME NOT NULL,
  FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE
);

-- 6. foto_produk
CREATE TABLE foto_produk (
  id_foto   INT PRIMARY KEY AUTO_INCREMENT,
  id_produk INT NOT NULL,
  file_foto VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE
);

-- 7. varian_produk
CREATE TABLE varian_produk (
  id_varian INT PRIMARY KEY AUTO_INCREMENT,
  id_produk INT NOT NULL,
  sku       VARCHAR(50) UNIQUE,
  warna     VARCHAR(50),
  ukuran    VARCHAR(10),
  harga     INT NOT NULL,
  stok      INT NOT NULL DEFAULT 0,
  FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE
);

-- 8. keranjang
CREATE TABLE keranjang (
  id_keranjang INT PRIMARY KEY AUTO_INCREMENT,
  id_user      INT NOT NULL,
  id_varian    INT NOT NULL,
  qty          INT NOT NULL DEFAULT 1,
  FOREIGN KEY (id_user)   REFERENCES users(id_user) ON DELETE CASCADE,
  FOREIGN KEY (id_varian) REFERENCES varian_produk(id_varian) ON DELETE CASCADE
);

-- 9. kurir
CREATE TABLE kurir (
  id_kurir     INT PRIMARY KEY AUTO_INCREMENT,
  nama_kurir   VARCHAR(50) NOT NULL,
  ongkos_kirim INT NOT NULL
);

-- 10. voucher
CREATE TABLE voucher (
  id_voucher    INT PRIMARY KEY AUTO_INCREMENT,
  kode_voucher  VARCHAR(20) NOT NULL UNIQUE,
  nominal_diskon INT NOT NULL,
  kuota         INT NOT NULL DEFAULT 1,
  batas_waktu   DATETIME NOT NULL
);

-- 11. pesanan
CREATE TABLE pesanan (
  id_pesanan    INT PRIMARY KEY AUTO_INCREMENT,
  id_user       INT NOT NULL,
  id_alamat     INT NOT NULL,
  id_kurir      INT NOT NULL,
  id_voucher    INT,
  tgl_pesan     DATETIME NOT NULL,
  total_tagihan INT NOT NULL,
  status_pesanan VARCHAR(50) DEFAULT 'Belum Bayar',
  no_resi       VARCHAR(50),
  FOREIGN KEY (id_user)    REFERENCES users(id_user),
  FOREIGN KEY (id_alamat)  REFERENCES alamat_pengiriman(id_alamat),
  FOREIGN KEY (id_kurir)   REFERENCES kurir(id_kurir),
  FOREIGN KEY (id_voucher) REFERENCES voucher(id_voucher)
);

-- 12. detail_pesanan
CREATE TABLE detail_pesanan (
  id_detail    INT PRIMARY KEY AUTO_INCREMENT,
  id_pesanan   INT NOT NULL,
  id_varian    INT NOT NULL,
  harga_satuan INT NOT NULL,
  qty          INT NOT NULL,
  subtotal     INT NOT NULL,
  FOREIGN KEY (id_pesanan) REFERENCES pesanan(id_pesanan) ON DELETE CASCADE,
  FOREIGN KEY (id_varian)  REFERENCES varian_produk(id_varian)
);

-- 13. pembayaran
CREATE TABLE pembayaran (
  id_pembayaran INT PRIMARY KEY AUTO_INCREMENT,
  id_pesanan    INT NOT NULL,
  metode_bayar  VARCHAR(50),
  bukti_transfer VARCHAR(255),
  tgl_bayar     DATETIME,
  status_bayar  VARCHAR(50) DEFAULT 'Pending',
  FOREIGN KEY (id_pesanan) REFERENCES pesanan(id_pesanan) ON DELETE CASCADE
);

-- 14. ulasan
CREATE TABLE ulasan (
  id_ulasan  INT PRIMARY KEY AUTO_INCREMENT,
  id_produk  INT NOT NULL,
  id_user    INT NOT NULL,
  rating     TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  tgl_ulasan DATE,
  FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE,
  FOREIGN KEY (id_user)   REFERENCES users(id_user)
);

-- 15. pesan_cs
CREATE TABLE pesan_cs (
  id_pesan       INT PRIMARY KEY AUTO_INCREMENT,
  id_user        INT NOT NULL,
  subjek         VARCHAR(100),
  isi_pesan      TEXT,
  tgl_kirim      DATETIME,
  status_balasan VARCHAR(50) DEFAULT 'Belum Dibalas',
  FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Seed: Admin default
INSERT INTO users (nama_lengkap, email, password, tgl_daftar, level_akses)
VALUES ('Admin Zenvy', 'admin@zenvy.id', '$2a$10$examplehashedpassword', NOW(), 'admin');

-- Seed: Kurir
INSERT INTO kurir (nama_kurir, ongkos_kirim) VALUES
  ('JNE Regular', 14000),
  ('J&T Express', 12000),
  ('SiCepat', 10000);

-- Seed: Kategori
INSERT INTO kategori (nama_kategori) VALUES
  ('Kaos'), ('Kemeja'), ('Celana'), ('Jaket'), ('Sepatu');
