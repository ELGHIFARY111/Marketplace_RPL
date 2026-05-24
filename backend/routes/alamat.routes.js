const express = require("express");
const router = express.Router();

const alamatController = require("../controllers/alamat.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.get("/", authenticateToken, alamatController.getAlamatSaya);
router.post("/", authenticateToken, alamatController.tambahAlamat);
router.delete("/:id", authenticateToken, alamatController.hapusAlamat);

module.exports = router;