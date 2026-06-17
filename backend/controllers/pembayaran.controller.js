const midtransClient = require("midtrans-client");
const crypto = require("crypto");
const pool = require("../config/db");

const core = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id || req.user?.userId;
};

const getStatusMapping = (transactionStatus, fraudStatus) => {
  let statusPesanan = "pending_payment";
  let statusBayar = "pending";

  if (transactionStatus === "capture") {
    if (fraudStatus === "accept") {
      statusPesanan = "dibayar";
      statusBayar = "settlement";
    } else {
      statusPesanan = "challenge";
      statusBayar = "challenge";
    }
  } else if (transactionStatus === "settlement") {
    statusPesanan = "dibayar";
    statusBayar = "settlement";
  } else if (transactionStatus === "pending") {
    statusPesanan = "pending_payment";
    statusBayar = "pending";
  } else if (
    transactionStatus === "deny" ||
    transactionStatus === "cancel" ||
    transactionStatus === "expire"
  ) {
    statusPesanan = "gagal";
    statusBayar = transactionStatus;
  }

  return {
    statusPesanan,
    statusBayar,
  };
};

const advancedStatuses = ["diproses", "dikirim", "terkirim", "selesai", "dibatalkan"];



const createCorePayment = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak ditemukan dari token",
      });
    }

    const {
      id_alamat,
      id_voucher,
      kurir_code,
      kurir_service,
      kurir_name,
      ongkir,
      etd,
      subtotal,
      pajak,
      total_pembayaran,
      payment_method,
      bank,
      store,
      items,
      voucher_discount,
    } = req.body;


    if (
      !id_alamat ||
      !kurir_code ||
      !kurir_service ||
      ongkir === undefined ||
      total_pembayaran === undefined ||
      !payment_method
    ) {
      return res.status(400).json({
        message: "Data checkout atau metode pembayaran belum lengkap",
      });
    }

    const allowedMethods = [
      "bank_transfer",
      "qris",
      "gopay",
      "shopeepay",
      "echannel",
      "cstore",
    ];

    if (!allowedMethods.includes(payment_method)) {
      return res.status(400).json({
        message: "Metode pembayaran tidak didukung",
      });
    }

    if (payment_method === "bank_transfer" && !bank) {
      return res.status(400).json({
        message: "Bank wajib dipilih untuk metode Virtual Account",
      });
    }

    if (payment_method === "cstore" && !store) {
      return res.status(400).json({
        message: "Store wajib dipilih untuk metode pembayaran minimarket",
      });
    }

    const grossAmount = Number(total_pembayaran);
    const subtotalAmount = Number(subtotal || 0);
    const ongkirAmount = Number(ongkir || 0);
    const pajakAmount = Number(pajak || 0);

    if (!grossAmount || grossAmount <= 0) {
      return res.status(400).json({
        message: "Total pembayaran tidak valid",
      });
    }

    let id_kurir = null;
    if (kurir_code) {
      const lowerCode = kurir_code.toLowerCase();
      if (lowerCode === "jne") id_kurir = 1;
      else if (lowerCode === "jnt") id_kurir = 2;
      else if (lowerCode === "sicepat") id_kurir = 3;
      else if (lowerCode === "anteraja") id_kurir = 4;
    }

    await connection.beginTransaction();

    const [pesananResult] = await connection.query(
      `INSERT INTO pesanan 
       (id_user, id_alamat, id_kurir, id_voucher, tgl_pesan, total_tagihan, status_pesanan, no_resi)
       VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)`,
      [
        id_user,
        id_alamat,
        id_kurir,
        id_voucher || null,
        grossAmount,
        "pending_payment",
        null,
      ]
    );

    if (id_voucher) {
      const [vRows] = await connection.query(
        "SELECT kuota FROM voucher WHERE id_voucher = ? FOR UPDATE",
        [id_voucher]
      );
      if (vRows.length > 0) {
        if (vRows[0].kuota <= 0) {
          throw new Error("Kuota kupon telah habis");
        }
        await connection.query(
          "UPDATE voucher SET kuota = kuota - 1 WHERE id_voucher = ?",
          [id_voucher]
        );
      }
    }

    const id_pesanan = pesananResult.insertId;
    const order_id = `PESANAN-${id_pesanan}-${Date.now()}`;

    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        await connection.query(
          `INSERT INTO detail_pesanan
           (id_pesanan, id_varian, harga_satuan, qty, subtotal)
           VALUES (?, ?, ?, ?, ?)`,
          [
            id_pesanan,
            item.id_varian,
            Number(item.harga || 0),
            Number(item.qty || 1),
            Number(item.subtotal || 0),
          ]
        );

        // Hapus item dari keranjang user setelah dibeli
        await connection.query(
          `DELETE FROM keranjang WHERE id_user = ? AND id_varian = ?`,
          [id_user, item.id_varian]
        );
      }
    }

    const discountAmount = Number(voucher_discount || 0);

    const itemDetails = [
      {
        id: "subtotal",
        price: subtotalAmount,
        quantity: 1,
        name: "Subtotal Belanja",
      },
      {
        id: "ongkir",
        price: ongkirAmount,
        quantity: 1,
        name: `Ongkir ${kurir_name || kurir_code} ${kurir_service}`,
      },
      {
        id: "pajak",
        price: pajakAmount,
        quantity: 1,
        name: "Pajak (2%)",
      },
      // Diskon voucher sebagai item negatif agar total = gross_amount
      ...(discountAmount > 0
        ? [{
            id: "diskon_voucher",
            price: -discountAmount,
            quantity: 1,
            name: "Diskon Voucher",
          }]
        : []),
    ].filter((item) => item.price !== 0);


    let parameter = {
      payment_type: payment_method,
      transaction_details: {
        order_id,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: req.user?.nama_lengkap || "Customer",
        email: req.user?.email || "customer@email.com",
      },
      item_details: itemDetails,
      custom_field1: String(id_pesanan),
      custom_field2: `${kurir_code}-${kurir_service}`,
      custom_field3: `Estimasi ${etd || "-"}`,
    };

    if (payment_method === "bank_transfer") {
      parameter = {
        ...parameter,
        payment_type: "bank_transfer",
        bank_transfer: {
          bank,
        },
      };
    }

    if (payment_method === "qris") {
      parameter = {
        ...parameter,
        payment_type: "qris",
      };
    }

    if (payment_method === "gopay") {
      parameter = {
        ...parameter,
        payment_type: "gopay",
        gopay: {
          enable_callback: false,
        },
      };
    }

    if (payment_method === "shopeepay") {
      parameter = {
        ...parameter,
        payment_type: "shopeepay",
        shopeepay: {
          callback_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/pesanan/detail`,
        },
      };
    }

    if (payment_method === "echannel") {
      parameter = {
        ...parameter,
        payment_type: "echannel",
        echannel: {
          bill_info1: "Payment For:",
          bill_info2: `Pesanan ${id_pesanan}`,
        },
      };
    }

    if (payment_method === "cstore") {
      parameter = {
        ...parameter,
        payment_type: "cstore",
        cstore: {
          store,
          message: `Pembayaran pesanan ${id_pesanan}`,
        },
      };
    }

    console.log("SERVER KEY:", process.env.MIDTRANS_SERVER_KEY?.slice(0, 15));
    console.log("IS PRODUCTION:", process.env.MIDTRANS_IS_PRODUCTION);
    console.log("MIDTRANS PARAMETER:", JSON.stringify(parameter, null, 2));

    const chargeResponse = await core.charge(parameter);

    const metodeBayar =
      payment_method === "bank_transfer"
        ? `va_${bank}`
        : payment_method === "echannel"
        ? "mandiri_bill"
        : payment_method === "cstore"
        ? store
        : payment_method;

    await connection.query(
      `INSERT INTO pembayaran 
       (
        id_pesanan,
        order_id,
        metode_bayar,
        bukti_transfer,
        transaction_id,
        tgl_bayar,
        status_bayar,
        payment_response
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_pesanan,
        order_id,
        metodeBayar,
        chargeResponse.transaction_id || order_id,
        chargeResponse.transaction_id || null,
        null,
        chargeResponse.transaction_status || "pending",
        JSON.stringify(chargeResponse),
      ]
    );

    await connection.commit();

    res.status(201).json({
      message: "Pembayaran Core API berhasil dibuat",
      id_pesanan,
      order_id,
      payment_method,
      bank: bank || null,
      store: store || null,
      midtrans: chargeResponse,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Midtrans Core API error:", error.ApiResponse || error);

    res.status(500).json({
      message:
        error.ApiResponse?.status_message ||
        "Gagal membuat pembayaran Core API",
      error: error.ApiResponse || error.message,
    });
  } finally {
    connection.release();
  }
};

const midtransNotification = async (req, res) => {
  try {
    const notification = req.body;

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      transaction_id,
      payment_type,
    } = notification;

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return res.status(400).json({
        message: "Payload notifikasi Midtrans tidak lengkap",
      });
    }

    const signature = crypto
      .createHash("sha512")
      .update(
        order_id +
          status_code +
          gross_amount +
          process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (signature !== signature_key) {
      return res.status(403).json({
        message: "Invalid signature key",
      });
    }

    const [paymentRows] = await pool.query(
      "SELECT id_pesanan, payment_response FROM pembayaran WHERE order_id = ? LIMIT 1",
      [order_id]
    );

    if (paymentRows.length === 0) {
      return res.status(404).json({
        message: "Data pembayaran tidak ditemukan",
      });
    }

    const id_pesanan = paymentRows[0].id_pesanan;

    const { statusPesanan, statusBayar } = getStatusMapping(
      transaction_status,
      fraud_status
    );

    const mergedResponse = mergePaymentResponse(
      paymentRows[0].payment_response,
      notification
    );

    const [pesananRowForNotif] = await pool.query(
      "SELECT status_pesanan FROM pesanan WHERE id_pesanan = ? LIMIT 1",
      [id_pesanan]
    );
    const existingStatusForNotif = pesananRowForNotif[0]?.status_pesanan;

    if (!advancedStatuses.includes(existingStatusForNotif)) {
      await pool.query(
        `UPDATE pesanan 
         SET status_pesanan = ?
         WHERE id_pesanan = ?`,
        [statusPesanan, id_pesanan]
      );
    }

    await pool.query(
      `UPDATE pembayaran
       SET status_bayar = ?,
           transaction_id = COALESCE(?, transaction_id),
           tgl_bayar = IF(? = 'settlement', NOW(), tgl_bayar),
           bukti_transfer = COALESCE(?, bukti_transfer),
           payment_response = ?
       WHERE order_id = ?`,
      [
        statusBayar,
        transaction_id || null,
        statusBayar,
        transaction_id || payment_type || order_id,
        JSON.stringify(mergedResponse),
        order_id,
      ]
    );

    res.json({
      message: "Notifikasi Midtrans berhasil diproses",
      order_id,
      transaction_status,
      statusPesanan,
      statusBayar,
    });
  } catch (error) {
    console.error("Midtrans notification error:", error);

    res.status(500).json({
      message: "Gagal memproses notifikasi Midtrans",
      error: error.message,
    });
  }
};

const mergePaymentResponse = (oldResponseText, newResponse) => {
  let oldResponse = {};

  try {
    oldResponse = oldResponseText ? JSON.parse(oldResponseText) : {};
  } catch {
    oldResponse = {};
  }

  return {
    ...oldResponse,
    ...newResponse,
    actions: newResponse.actions || oldResponse.actions,
    va_numbers: newResponse.va_numbers || oldResponse.va_numbers,
    permata_va_number:
      newResponse.permata_va_number || oldResponse.permata_va_number,
  };
};

const getStatusPayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID wajib dikirim",
      });
    }

    const [paymentRows] = await pool.query(
      `
      SELECT 
        id_pesanan,
        order_id,
        payment_response
      FROM pembayaran
      WHERE order_id = ?
      LIMIT 1
      `,
      [orderId]
    );

    if (paymentRows.length === 0) {
      return res.status(404).json({
        message: "Data pembayaran tidak ditemukan di database",
      });
    }

    const statusResponse = await core.transaction.status(orderId);

    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    let statusPesanan = "pending_payment";
    let statusBayar = "pending";

    if (transactionStatus === "capture") {
      if (fraudStatus === "accept") {
        statusPesanan = "dibayar";
        statusBayar = "settlement";
      } else {
        statusPesanan = "challenge";
        statusBayar = "challenge";
      }
    } else if (transactionStatus === "settlement") {
      statusPesanan = "dibayar";
      statusBayar = "settlement";
    } else if (transactionStatus === "pending") {
      statusPesanan = "pending_payment";
      statusBayar = "pending";
    } else if (
      transactionStatus === "deny" ||
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      statusPesanan = "gagal";
      statusBayar = transactionStatus;
    }

    const id_pesanan = paymentRows[0].id_pesanan;

    const mergedResponse = mergePaymentResponse(
      paymentRows[0].payment_response,
      statusResponse
    );

    const [pesananRowForStatus] = await pool.query(
      "SELECT status_pesanan FROM pesanan WHERE id_pesanan = ? LIMIT 1",
      [id_pesanan]
    );
    const existingStatusForStatus = pesananRowForStatus[0]?.status_pesanan;

    if (!advancedStatuses.includes(existingStatusForStatus)) {
      await pool.query(
        "UPDATE pesanan SET status_pesanan = ? WHERE id_pesanan = ?",
        [statusPesanan, id_pesanan]
      );
    } else {
      statusPesanan = existingStatusForStatus;
    }

    await pool.query(
      `
      UPDATE pembayaran
      SET status_bayar = ?,
          transaction_id = COALESCE(?, transaction_id),
          tgl_bayar = IF(? = 'settlement', NOW(), tgl_bayar),
          payment_response = ?
      WHERE order_id = ?
      `,
      [
        statusBayar,
        statusResponse.transaction_id || null,
        statusBayar,
        JSON.stringify(mergedResponse),
        orderId,
      ]
    );

    res.json({
      message: "Status pembayaran berhasil diperbarui",
      order_id: orderId,
      statusPesanan,
      statusBayar,
      midtrans: mergedResponse,
    });
  } catch (error) {
    console.error("Get status Midtrans error:", error.ApiResponse || error);

    res.status(500).json({
      message:
        error.ApiResponse?.status_message ||
        "Gagal mengambil status pembayaran",
      error: error.ApiResponse || error.message,
    });
  }
};

module.exports = {
  createCorePayment,
  midtransNotification,
  getStatusPayment,
  
};