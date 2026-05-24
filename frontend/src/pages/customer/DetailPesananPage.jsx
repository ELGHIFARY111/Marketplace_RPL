import { useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShoppingCart,
  QrCode,
  Landmark,
  Wallet,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function DetailPesananPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const paymentData = useMemo(() => {
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

  const midtrans = paymentData?.midtrans;

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
      alert("Berhasil disalin");
    } catch {
      alert("Gagal menyalin");
    }
  };
  const refreshStatus = async () => {
    try {
      const res = await api.get(`/pembayaran/status/${paymentData.order_id}`);

      const updatedData = {
        ...paymentData,
        midtrans: {
          ...paymentData.midtrans,
          ...res.data.midtrans,
        },
        status_bayar: res.data.statusBayar,
        status_pesanan: res.data.statusPesanan,
      };

      localStorage.setItem("lastPaymentData", JSON.stringify(updatedData));
      window.location.reload();
    } catch (error) {
      console.error("Gagal refresh status:", error.response?.data || error);
      alert(error.response?.data?.message || "Gagal refresh status pembayaran");
    }
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
                    {midtrans?.transaction_status || "pending"}
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

                <p>
                  {paymentData.pengiriman?.kurir_name || "-"} -{" "}
                  {paymentData.pengiriman?.kurir_service || "-"}
                </p>

                <p>Estimasi: {paymentData.pengiriman?.etd || "-"}</p>
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

              {redirectActions.length > 0 && (
                <div className="mt-4 space-y-2 font-serif">
                  {redirectActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-md bg-black px-4 py-3 text-center text-white hover:bg-[#b89578] transition"
                    >
                      <ExternalLink size={18} />
                      {action.name || "Buka Pembayaran"}
                    </a>
                  ))}
                </div>
              )}

              {!vaInfo && !qrAction && redirectActions.length === 0 && (
                <div className="rounded-md bg-yellow-50 px-4 py-3 font-serif text-sm text-yellow-700">
                  Instruksi pembayaran belum tersedia. Coba kembali ke checkout
                  dan buat pembayaran ulang.
                </div>
              )}

              <div className="mt-5 rounded-md bg-[#f3efe9] px-4 py-3 font-serif text-sm">
                <p>
                  Status Pembayaran:{" "}
                  <span className="font-bold">
                    {midtrans?.transaction_status || "pending"}
                  </span>
                </p>

                {midtrans?.expiry_time && (
                  <p>
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
                className="mt-4 w-full rounded-md bg-black py-3 font-serif text-white hover:bg-[#b89578] transition"
              >
                Refresh Status Pembayaran
              </button>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}