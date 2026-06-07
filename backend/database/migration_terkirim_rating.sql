-- =============================================================
-- MIGRATION: Tambah status "terkirim" & kolom pendukung rating
-- Jalankan di MySQL Workbench / terminal MySQL
-- =============================================================

USE toko_online;

-- 1. Tambah kolom tgl_terkirim ke tabel pesanan
--    Diisi saat admin mengubah status ke 'terkirim'
--    Dipakai untuk menghitung auto-selesai setelah 7 hari

ALTER TABLE pesanan
  ADD COLUMN tgl_terkirim DATETIME NULL DEFAULT NULL
  AFTER no_resi;


-- 2. Tambah kolom id_pesanan ke tabel ulasan
--    Dipakai untuk melacak pesanan mana yang sudah dirating
--    dan mencegah double rating per pesanan

ALTER TABLE ulasan
  ADD COLUMN id_pesanan INT NULL DEFAULT NULL
  AFTER id_user,
  ADD CONSTRAINT fk_ulasan_pesanan
    FOREIGN KEY (id_pesanan) REFERENCES pesanan(id_pesanan)
    ON DELETE SET NULL;


-- 3. Tambah kolom komentar ke tabel ulasan (opsional text review)

ALTER TABLE ulasan
  ADD COLUMN komentar TEXT NULL DEFAULT NULL
  AFTER rating;


-- 4. Verifikasi hasil perubahan
-- (Jalankan ini setelah ALTER berhasil)

-- DESCRIBE pesanan;
-- DESCRIBE ulasan;
