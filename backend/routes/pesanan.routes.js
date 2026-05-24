const express = require("express");
const router = express.Router();

const pesananController = require("../controllers/pesanan.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.get("/riwayat", authenticateToken, pesananController.getRiwayatPesanan);
router.get("/:id", authenticateToken, pesananController.getDetailPesanan);

module.exports = router;