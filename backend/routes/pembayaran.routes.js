const express = require("express");
const router = express.Router();

const pembayaranController = require("../controllers/pembayaran.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/core", authenticateToken, pembayaranController.createCorePayment);

router.get(
  "/status/:orderId",
  authenticateToken,
  pembayaranController.getStatusPayment
);

router.post(
  "/midtrans/notification",
  pembayaranController.midtransNotification
);

router.get("/midtrans/notification", (req, res) => {
  res.json({
    message: "Webhook Midtrans aktif. Endpoint ini menerima POST dari Midtrans.",
  });
});

module.exports = router;