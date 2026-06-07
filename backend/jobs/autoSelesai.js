const db = require("../config/db");

/**
 * Auto-complete job: Pesanan dengan status 'terkirim' selama >= 7 hari
 * akan otomatis diubah ke 'selesai'.
 * Job ini dijalankan setiap 1 jam sekali.
 */
const runAutoSelesai = async () => {
  try {
    const [result] = await db.query(`
      UPDATE pesanan
      SET status_pesanan = 'selesai'
      WHERE status_pesanan = 'terkirim'
        AND tgl_terkirim IS NOT NULL
        AND tgl_terkirim <= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);

    if (result.affectedRows > 0) {
      console.log(`[AutoSelesai] ${result.affectedRows} pesanan otomatis diselesaikan (>7 hari terkirim)`);
    }
  } catch (error) {
    console.error("[AutoSelesai] Error:", error.message);
  }
};

const startAutoSelesaiJob = () => {
  // Jalankan sekali saat server start
  runAutoSelesai();

  // Jalankan setiap 1 jam
  const INTERVAL_MS = 60 * 60 * 1000; // 1 jam
  setInterval(runAutoSelesai, INTERVAL_MS);

  console.log("[AutoSelesai] Job started - cek setiap 1 jam");
};

module.exports = { startAutoSelesaiJob };
