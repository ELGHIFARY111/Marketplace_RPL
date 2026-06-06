import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ClipboardList, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RiwayatPembelianPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetailId, setLoadingDetailId] = useState(null);

  const formatRupiah = (angka) => {
    return `Rp.${Number(angka || 0).toLocaleString("id-ID")},00`;
  };

  const getStatusLabel = (status) => {
    if (!status) return "Menunggu Bayar";

    const statusMap = {
      pending_payment: "Menunggu Bayar",
      pending: "Menunggu Bayar",
      dibayar: "Dibayar",
      settlement: "Dibayar",
      diproses: "Diproses",
      dikirim: "Dikirim",
      selesai: "Selesai",
      gagal: "Gagal",
      expire: "Kedaluwarsa",
      cancel: "Dibatalkan",
      deny: "Ditolak",
      challenge: "Challenge",
    };

    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    if (status === "dibayar" || status === "settlement") {
      return "bg-green-100 text-green-700";
    }

    if (status === "gagal" || status === "expire" || status === "cancel" || status === "deny") {
      return "bg-red-100 text-red-700";
    }

    if (status === "dikirim" || status === "diproses") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "selesai") {
      return "bg-black text-white";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const fetchRiwayatPesanan = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const res = await api.get("/pesanan/riwayat");

      const dataPesanan =
        res.data?.data ||
        res.data?.pesanan ||
        res.data?.orders ||
        res.data ||
        [];

      setOrders(Array.isArray(dataPesanan) ? dataPesanan : []);
    } catch (error) {
      console.error("Gagal memuat riwayat pesanan:", error.response?.data || error);
      if (showLoading) {
        alert(error.response?.data?.message || "Gagal memuat riwayat pesanan");
      }
      setOrders([]);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayatPesanan(true);

    const interval = setInterval(() => {
      fetchRiwayatPesanan(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDetail = async (order) => {
    try {
      setLoadingDetailId(order.id_pesanan);

      const res = await api.get(`/pesanan/${order.id_pesanan}`);

      const detailPesanan = res.data?.data || res.data;

      localStorage.setItem("lastPaymentData", JSON.stringify(detailPesanan));

      navigate("/pesanan/detail", {
        state: detailPesanan,
      });
    } catch (error) {
      console.error("Gagal mengambil detail pesanan:", error.response?.data || error);
      alert(error.response?.data?.message || "Gagal membuka detail pesanan");
    } finally {
      setLoadingDetailId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="w-full bg-[#f3efe9] min-h-screen flex flex-col">
        <Navbar />

        <main className="px-20 py-10 flex-1">
          <div className="mb-4 flex items-center gap-4">
            <h1 className="text-4xl font-serif">Pesanan</h1>
            <ClipboardList size={28} />
          </div>

          <section className="rounded-lg bg-white px-6 py-8">
            {loading ? (
              <div className="py-20 text-center font-serif text-gray-500">
                Memuat riwayat pesanan...
              </div>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center font-serif text-gray-500">
                Belum ada pesanan.
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-black">
                    <th className="pb-8 text-center font-serif text-lg">
                      Kode Pesanan
                    </th>
                    <th className="pb-8 text-center font-serif text-lg">
                      Tanggal
                    </th>
                    <th className="pb-8 text-center font-serif text-lg">
                      Total
                    </th>
                    <th className="pb-8 text-center font-serif text-lg">
                      Status
                    </th>
                    <th className="pb-8 text-center font-serif text-lg">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => {
                    const kodePesanan =
                      order.order_id ||
                      order.kode_pesanan ||
                      `PESANAN-${order.id_pesanan}`;

                    const status =
                      ["diproses", "dikirim", "selesai", "dibatalkan"].includes(order.status_pesanan)
                        ? order.status_pesanan
                        : (order.status_bayar || order.status_pesanan || "pending_payment");


                    return (
                      <tr
                        key={order.id_pesanan}
                        className="border-b border-gray-300 last:border-b-0"
                      >
                        <td className="py-6 text-center font-serif text-lg">
                          {kodePesanan}
                        </td>

                        <td className="py-6 text-center font-serif text-lg">
                          {order.tgl_pesan
                            ? new Date(order.tgl_pesan).toLocaleDateString("id-ID")
                            : "-"}
                        </td>

                        <td className="py-6 text-center font-serif text-lg">
                          {formatRupiah(order.total_tagihan)}
                        </td>

                        <td className="py-6 text-center font-serif text-lg">
                          <span
                            className={`rounded-full px-4 py-2 text-sm font-bold ${getStatusClass(
                              status
                            )}`}
                          >
                            {getStatusLabel(status)}
                          </span>
                        </td>

                        <td className="py-6 text-center">
                          <button
                            onClick={() => handleDetail(order)}
                            disabled={loadingDetailId === order.id_pesanan}
                            className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-2 font-serif text-lg text-white transition hover:bg-[#b89578] hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
                          >
                            <Eye size={18} />
                            {loadingDetailId === order.id_pesanan
                              ? "Memuat..."
                              : "Detail"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}