const express = require("express");
const router = express.Router();

const pesananController = require("../controllers/pesanan.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const { verifyAdmin } = require("../middleware/admin.middleware");

// Admin routes
router.get("/admin/semua", verifyAdmin, pesananController.getAllPesananAdmin);
router.get("/admin/:id", verifyAdmin, pesananController.getDetailPesananAdmin);
router.put("/admin/update-status", verifyAdmin, pesananController.updateStatusPesananAdmin);

// Customer routes
router.get("/riwayat", authenticateToken, pesananController.getRiwayatPesanan);
router.get("/ulasan/:id", authenticateToken, pesananController.getUlasanByPesanan);  // cek ulasan per pesanan
router.put("/konfirmasi-selesai/:id", authenticateToken, pesananController.konfirmasiSelesai);
router.post("/ulasan", authenticateToken, pesananController.submitUlasan);
router.get("/:id", authenticateToken, pesananController.getDetailPesanan);

module.exports = router;