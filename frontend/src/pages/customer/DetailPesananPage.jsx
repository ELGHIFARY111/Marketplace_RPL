import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShoppingCart,
  QrCode,
  Landmark,
  Wallet,
  Copy,
  ExternalLink,
  Store,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PopupAlert from "../../components/PopupAlert";
import useAlert from "../../components/useAlert";

export default function DetailPesananPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();

  const initialPaymentData = useMemo(() => {
    if (location.state) {
      return location.state;
    }

    const savedData = localStorage.getItem("lastPaymentData");

    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch {
        return null;
      }
    }

    return null;
  }, [location.state]);

  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [pollingActive, setPollingActive] = useState(true);
  const pollingRef = useRef(null);
  // Ref to always have fresh paymentData inside callbacks (fix stale closure)
  const paymentDataRef = useRef(initialPaymentData);
  useEffect(() => { paymentDataRef.current = paymentData; }, [paymentData]);

  const midtrans = paymentData?.midtrans;

  const FINAL_STATUSES = ["settlement", "capture", "deny", "cancel", "expire"];

  const checkStatus = useCallback(async () => {
    const current = paymentDataRef.current;
    if (!current?.order_id) return;

    try {
      const res = await api.get(`/pembayaran/status/${current.order_id}`);

      const updatedData = {
        ...current,
        midtrans: {
          ...current.midtrans,
          ...res.data.midtrans,
        },
        status_bayar: res.data.statusBayar,
        status_pesanan: res.data.statusPesanan,
      };

      localStorage.setItem("lastPaymentData", JSON.stringify(updatedData));
      setPaymentData(updatedData);

      const isPaymentFinal = FINAL_STATUSES.includes(res.data.statusBayar);
      const isOrderFinal = ["selesai", "dibatalkan"].includes(res.data.statusPesanan);

      if (isPaymentFinal && isOrderFinal) {
        setPollingActive(false);
      }
    } catch (error) {
      console.error("Auto-polling gagal:", error.response?.data || error);
    }
  }, []);

  useEffect(() => {
    const currentStatus = midtrans?.transaction_status;
    const currentOrderStatus = paymentData?.status_pesanan;
    const isPaymentFinal = FINAL_STATUSES.includes(currentStatus) || FINAL_STATUSES.includes(paymentData?.status_bayar);
    const isOrderFinal = ["selesai", "dibatalkan"].includes(currentOrderStatus);

    if (!pollingActive || (isPaymentFinal && isOrderFinal)) {
      setPollingActive(false);
      return;
    }

    pollingRef.current = setInterval(() => {
      checkStatus();
    }, 5000);

    return () => clearInterval(pollingRef.current);
  }, [pollingActive, checkStatus, midtrans?.transaction_status, paymentData?.status_bayar, paymentData?.status_pesanan]);


  const formatRupiah = (angka) => {
    return `Rp.${Number(angka || 0).toLocaleString("id-ID")},00`;
  };

  const formatAlamat = (alamat) => {
    if (!alamat) return "-";

    return [
      alamat.desa,
      alamat.kecamatan,
      alamat.kabupaten_kota,
      alamat.provinsi,
      alamat.kode_pos,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const getPaymentLabel = () => {
    if (!paymentData) return "-";

    if (paymentData.payment_method === "qris") return "QRIS";
    if (paymentData.payment_method === "gopay") return "GoPay";

    if (paymentData.payment_method === "bank_transfer") {
      return `${String(paymentData.bank || "").toUpperCase()} Virtual Account`;
    }

    return paymentData.payment_method || "-";
  };

  const getQrAction = () => {
    return midtrans?.actions?.find((action) => {
      const method = String(action.method || "GET").toUpperCase();
      const name = String(action.name || "").toLowerCase();
      const url = String(action.url || "").toLowerCase();

      return (
        method === "GET" &&
        (name.includes("qr") ||
          name.includes("generate") ||
          url.includes("qr-code") ||
          url.includes("qris"))
      );
    });
  };

  const getRedirectActions = () => {
    return (
      midtrans?.actions?.filter((action) => {
        const method = String(action.method || "GET").toUpperCase();
        const name = String(action.name || "").toLowerCase();

        return (
          method === "GET" &&
          !name.includes("generate-qr") &&
          !name.includes("qr-code")
        );
      }) || []
    );
  };

  const getVaInfo = () => {
    if (midtrans?.va_numbers?.length > 0) {
      return {
        bank: midtrans.va_numbers[0].bank?.toUpperCase(),
        va_number: midtrans.va_numbers[0].va_number,
      };
    }

    if (midtrans?.permata_va_number) {
      return {
        bank: "PERMATA",
        va_number: midtrans.permata_va_number,
      };
    }

    return null;
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showAlert("Berhasil disalin", "success");
    } catch {
      showAlert("Gagal menyalin", "error");
    }
  };
  const refreshStatus = async () => {
    await checkStatus();
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-[#e5e5e5] text-black">
        <div className="w-full bg-[#f3efe9] min-h-screen flex flex-col">
          <Navbar />

          <main className="px-20 py-10 flex-1">
            <section className="rounded-md bg-white px-8 py-8 font-serif">
              <h1 className="mb-3 text-3xl font-bold">Detail Pesanan</h1>
              <p className="text-gray-600">
                Data pembayaran tidak ditemukan. Silakan lakukan checkout
                kembali.
              </p>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-5 rounded-md bg-black px-6 py-3 text-white hover:bg-[#b89578] transition"
              >
                Kembali ke Checkout
              </button>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    );
  }

  const qrAction = getQrAction();
  const redirectActions = getRedirectActions();
  const vaInfo = getVaInfo();

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div className="w-full bg-[#f3efe9] min-h-screen flex flex-col">
        <Navbar />

        <main className="px-20 py-10 flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-serif">Detail Pesanan</h1>
            <ShoppingCart size={28} />
          </div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-8">
            {/* DETAIL PESANAN */}
            <section className="rounded-md bg-white px-8 py-6">
              <h2 className="mb-5 font-serif text-2xl font-bold">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-3 font-serif">
                <p>
                  ID Pesanan:{" "}
                  <span className="font-bold">
                    {paymentData.order_id || `PESANAN-${paymentData.id_pesanan}`}
                  </span>
                </p>

                <p>
                  Status:{" "}
                  <span className="font-bold">
                    {(() => {
                      const st = ["diproses", "dikirim", "selesai", "dibatalkan"].includes(paymentData.status_pesanan)
                        ? paymentData.status_pesanan
                        : (paymentData.status_bayar || midtrans?.transaction_status);
                      const statusMap = {
                        pending_payment: "Menunggu Bayar",
                        pending: "Menunggu Bayar",
                        dibayar: "Dibayar",
                        settlement: "Dibayar",
                        capture: "Dibayar",
                        diproses: "Diproses",
                        dikirim: "Dikirim",
                        selesai: "Selesai",
                        gagal: "Gagal",
                        expire: "Kedaluwarsa",
                        cancel: "Dibatalkan",
                        deny: "Ditolak",
                      };
                      return statusMap[st] || st || "pending";
                    })()}
                  </span>
                </p>


                <p>
                  Metode Pembayaran:{" "}
                  <span className="font-bold">{getPaymentLabel()}</span>
                </p>

                <p>
                  Subtotal:{" "}
                  <span className="font-bold">
                    {formatRupiah(paymentData.subtotal)}
                  </span>
                </p>

                <p>
                  Ongkir:{" "}
                  <span className="font-bold">
                    {formatRupiah(paymentData.pengiriman?.ongkir)}
                  </span>
                </p>

                <p>
                  Pajak:{" "}
                  <span className="font-bold">
                    {formatRupiah(paymentData.pajak)}
                  </span>
                </p>

                {paymentData.kode_voucher && (
                  <p className="text-green-700 font-semibold">
                    Diskon Kupon ({paymentData.kode_voucher}):{" "}
                    <span className="font-bold">
                      -{formatRupiah(paymentData.nominal_voucher)}
                    </span>
                  </p>
                )}

                <p>
                  Total Pembayaran:{" "}
                  <span className="font-bold">
                    {formatRupiah(paymentData.total_pembayaran)}
                  </span>
                </p>
              </div>

              <hr className="my-5 border-black" />

              <div className="font-serif">
                <h3 className="mb-2 font-bold">Alamat Pengiriman</h3>

                <p className="font-bold">
                  {paymentData.alamat?.label_alamat || "Alamat"} -{" "}
                  {paymentData.alamat?.nama_penerima || "-"}
                </p>

                <p>No. Telp: {paymentData.alamat?.no_telp_penerima || "-"}</p>

                <p className="mt-2">
                  <span className="font-bold">Info tambahan:</span>{" "}
                  {paymentData.alamat?.informasi_tambahan || "-"}
                </p>

                <p>{formatAlamat(paymentData.alamat)}</p>
              </div>

              <hr className="my-5 border-black" />

              <div className="font-serif">
                <h3 className="mb-2 font-bold">Pengiriman</h3>

                {(() => {
                  // fallback: parse from midtrans custom_field2 = "kurir_code-kurir_service"
                  const cf2 = paymentData.midtrans?.custom_field2 || "";
                  const cf3 = paymentData.midtrans?.custom_field3 || "";
                  const [cfCode, cfService] = cf2.split("-");
                  const cfEtd = cf3.replace("Estimasi ", "");

                  const kurirName =
                    paymentData.pengiriman?.kurir_name ||
                    paymentData.pengiriman?.kurir_code ||
                    cfCode?.toUpperCase() ||
                    "-";

                  const kurirService =
                    paymentData.pengiriman?.kurir_service ||
                    cfService?.toUpperCase() ||
                    "-";

                  const etd =
                    paymentData.pengiriman?.etd || cfEtd || "-";

                  const ongkir =
                    paymentData.pengiriman?.ongkir ||
                    paymentData.ongkir ||
                    0;

                  return (
                    <>
                      <p>
                        {kurirName} - {kurirService}
                      </p>
                      <p>Estimasi: {etd}</p>
                      {ongkir > 0 && (
                        <p>Ongkir: {formatRupiah(ongkir)}</p>
                      )}
                    </>
                  );
                })()}
              </div>
            </section>

            {/* INSTRUKSI PEMBAYARAN */}
            <section className="h-fit rounded-md bg-white px-8 py-6">
              <h2 className="mb-5 font-serif text-2xl font-bold">
                Instruksi Pembayaran
              </h2>

              {paymentData.payment_method === "bank_transfer" && vaInfo && (
                <div className="rounded-md bg-[#f3efe9] px-5 py-5 font-serif">
                  <div className="mb-4 flex items-center gap-3">
                    <Landmark size={28} />
                    <div>
                      <p className="font-bold">
                        {vaInfo.bank} Virtual Account
                      </p>
                      <p className="text-sm text-gray-600">
                        Gunakan nomor VA berikut untuk melakukan pembayaran.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md bg-white px-4 py-4">
                    <p className="text-sm text-gray-600">Nomor Virtual Account</p>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xl font-bold">{vaInfo.va_number}</p>

                      <button
                        type="button"
                        onClick={() => copyText(vaInfo.va_number)}
                        className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-[#b89578] transition"
                      >
                        <Copy size={16} />
                        Salin
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentData.payment_method === "qris" && qrAction && (
                <div className="rounded-md bg-[#f3efe9] px-5 py-5 font-serif text-center">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <QrCode size={28} />
                    <p className="font-bold">QRIS</p>
                  </div>

                  <p className="mb-4 text-sm text-gray-600">
                    Scan QR berikut menggunakan aplikasi pembayaran yang
                    mendukung QRIS.
                  </p>

                  <img
                    src={qrAction.url}
                    alt="QRIS Pembayaran"
                    className="mx-auto max-w-[260px] rounded-md bg-white p-3"
                  />
                </div>
              )}

              {paymentData.payment_method === "gopay" && (
                <div className="rounded-md bg-[#f3efe9] px-5 py-5 font-serif">
                  <div className="mb-4 flex items-center gap-3">
                    <Wallet size={28} />
                    <div>
                      <p className="font-bold">GoPay</p>
                      <p className="text-sm text-gray-600">
                        Gunakan tombol pembayaran GoPay berikut.
                      </p>
                    </div>
                  </div>

                  {qrAction && (
                    <div className="mb-4 rounded-md bg-white px-4 py-4 text-center">
                      <p className="mb-3 font-bold">Scan QR GoPay</p>
                      <img
                        src={qrAction.url}
                        alt="QR GoPay"
                        className="mx-auto max-w-[240px] rounded-md"
                      />
                    </div>
                  )}
                </div>
              )}

              {paymentData.payment_method === "cstore" && midtrans?.payment_code && (
                <div className="rounded-md bg-[#f3efe9] px-5 py-5 font-serif">
                  <div className="mb-4 flex items-center gap-3">
                    <Store size={28} />
                    <div>
                      <p className="font-bold">
                        {paymentData.store === "alfamart" ? "Alfamart" : "Indomaret"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tunjukkan kode pembayaran ini ke kasir.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md bg-white px-4 py-4">
                    <p className="text-sm text-gray-600">Kode Pembayaran</p>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xl font-bold">{midtrans.payment_code}</p>

                      <button
                        type="button"
                        onClick={() => copyText(midtrans.payment_code)}
                        className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-[#b89578] transition"
                      >
                        <Copy size={16} />
                        Salin
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentData.payment_method === "echannel" && midtrans?.biller_code && (
                <div className="rounded-md bg-[#f3efe9] px-5 py-5 font-serif">
                  <div className="mb-4 flex items-center gap-3">
                    <Landmark size={28} />
                    <div>
                      <p className="font-bold">Mandiri Bill Payment</p>
                      <p className="text-sm text-gray-600">
                        Gunakan kode perusahaan dan kode bayar berikut.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md bg-white px-4 py-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Kode Perusahaan (Biller Code)</p>
                      <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="text-xl font-bold">{midtrans.biller_code}</p>
                        <button
                          type="button"
                          onClick={() => copyText(midtrans.biller_code)}
                          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-[#b89578] transition"
                        >
                          <Copy size={16} />
                          Salin
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Kode Bayar (Bill Key)</p>
                      <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="text-xl font-bold">{midtrans.bill_key}</p>
                        <button
                          type="button"
                          onClick={() => copyText(midtrans.bill_key)}
                          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-[#b89578] transition"
                        >
                          <Copy size={16} />
                          Salin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Deeplink / redirect dipindah ke Admin */}

              {!vaInfo && !qrAction && paymentData.payment_method !== "cstore" && paymentData.payment_method !== "echannel" && (
                <div className="rounded-md bg-yellow-50 px-4 py-3 font-serif text-sm text-yellow-700">
                  Instruksi pembayaran belum tersedia. Coba kembali ke checkout
                  dan buat pembayaran ulang.
                </div>
              )}

              <div className="mt-5 rounded-md bg-[#f3efe9] px-4 py-3 font-serif text-sm">
                <div className="flex items-center justify-between">
                  <p>
                    Status Pembayaran:{" "}
                    <span
                      className={`font-bold ${
                        midtrans?.transaction_status === "settlement" ||
                        midtrans?.transaction_status === "capture"
                          ? "text-green-600"
                          : midtrans?.transaction_status === "deny" ||
                            midtrans?.transaction_status === "cancel" ||
                            midtrans?.transaction_status === "expire"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {midtrans?.transaction_status || "pending"}
                    </span>
                  </p>

                  {pollingActive && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400" />
                      Memantau otomatis...
                    </span>
                  )}
                </div>

                {midtrans?.expiry_time && (
                  <p className="mt-1">
                    Batas Pembayaran:{" "}
                    <span className="font-bold">{midtrans.expiry_time}</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => navigate("/pesanan")}
                className="mt-6 w-full rounded-md bg-black py-3 font-serif text-white hover:bg-[#b89578] transition"
              >
                Lihat Riwayat Pesanan
              </button>
              <button
                type="button"
                onClick={refreshStatus}
                className="mt-4 w-full rounded-md border border-black bg-transparent py-3 font-serif text-black hover:bg-black hover:text-white transition"
              >
                Refresh Manual
              </button>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}