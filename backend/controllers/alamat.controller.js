const pool = require("../config/db");

const getUserId = (req) => {
return req.user?.id_user || req.user?.id || req.user?.userId;
};

const getAlamatSaya = async (req, res) => {
try {
    const id_user = getUserId(req);

    const [rows] = await pool.query(
    "SELECT * FROM alamat_pengiriman WHERE id_user = ? ORDER BY id_alamat DESC",
    [id_user]
    );

    res.json(rows);
} catch (error) {
    res.status(500).json({
    message: "Gagal mengambil alamat",
    error: error.message,
    });
}
};

const tambahAlamat = async (req, res) => {
try {
    const id_user = getUserId(req);

    if (!id_user) {
    return res.status(401).json({
        message: "User tidak ditemukan dari token",
    });
    }

    const {
    label_alamat,
    nama_penerima,
    no_telp_penerima,
    informasi_tambahan,
    provinsi,
    kabupaten_kota,
    kecamatan,
    desa,
    kota,
    kode_pos,
    destination_id,
    } = req.body;

    if (
    !nama_penerima ||
    !no_telp_penerima ||
    !informasi_tambahan ||
    !provinsi ||
    !kabupaten_kota ||
    !kecamatan ||
    !kode_pos ||
    !destination_id
    ) {
    return res.status(400).json({
        message:
        "Nama penerima, no telepon, informasi tambahan, provinsi, kabupaten/kota, kecamatan, kode pos, dan lokasi RajaOngkir wajib diisi",
    });
    }

    const [result] = await pool.query(
    `INSERT INTO alamat_pengiriman 
    (
        id_user,
        destination_id,
        label_alamat,
        nama_penerima,
        no_telp_penerima,
        informasi_tambahan,
        provinsi,
        kabupaten_kota,
        kecamatan,
        desa,
        kota,
        kode_pos
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        id_user,
        destination_id,
        label_alamat || "Rumah",
        nama_penerima,
        no_telp_penerima,
        informasi_tambahan,
        provinsi,
        kabupaten_kota,
        kecamatan,
        desa || null,
        kota || kabupaten_kota,
        kode_pos,
    ]
    );

    res.status(201).json({
    message: "Alamat berhasil ditambahkan",
    id_alamat: result.insertId,
    });
} catch (error) {
    res.status(500).json({
    message: "Gagal menambahkan alamat",
    error: error.message,
    });
}
};

const hapusAlamat = async (req, res) => {
try {
    const id_user = getUserId(req);
    const { id } = req.params;

    const [result] = await pool.query(
    "DELETE FROM alamat_pengiriman WHERE id_alamat = ? AND id_user = ?",
    [id, id_user]
    );

    if (result.affectedRows === 0) {
    return res.status(404).json({
        message: "Alamat tidak ditemukan",
    });
    }

    res.json({
    message: "Alamat berhasil dihapus",
    });
} catch (error) {
    res.status(500).json({
    message: "Gagal menghapus alamat",
    error: error.message,
    });
}
};

module.exports = {
getAlamatSaya,
tambahAlamat,
hapusAlamat,
};