import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ClipboardList, Eye, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// ─── Konstanta Tab ───────────────────────────────────────────────────────────
const TABS = [
  { key: "semua", label: "Semua" },
  { key: "pending_payment", label: "Belum Dibayar" },
  { key: "diproses", label: "Diproses" },
  { key: "dikirim", label: "Dikirim" },
  { key: "terkirim", label: "Terkirim" },
  { key: "selesai", label: "Selesai" },
  { key: "dibatalkan", label: "Dibatalkan" },
];

// ─── Komponen RatingModal ─────────────────────────────────────────────────────
function RatingModal({ pesanan, onClose, onSubmit, preloadedRatings, preloadedKomentar }) {
  const [ratings, setRatings] = useState({});
  const [komentar, setKomentar] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (preloadedRatings) setRatings(preloadedRatings);
    if (preloadedKomentar) setKomentar(preloadedKomentar);
  }, [preloadedRatings, preloadedKomentar]);

  const items = pesanan?.items || [];

  const setRating = (id_produk, value) => {
    setRatings((prev) => ({ ...prev, [id_produk]: value }));
  };

  const setComment = (id_produk, value) => {
    setKomentar((prev) => ({ ...prev, [id_produk]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      for (const item of items) {
        const r = ratings[item.id_produk];
        if (r) {
          await api.post("/pesanan/ulasan", {
            id_pesanan: pesanan.id_pesanan,
            id_produk: item.id_produk,
            rating: r,
            komentar: komentar[item.id_produk] || "",
          });
        }
      }
      onSubmit();
    } catch (err) {
      console.error("Submit ulasan error:", err);
      alert("Gagal menyimpan ulasan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
            <Star size={22} className="text-yellow-400" />
            Beri Ulasan
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Bagaimana produk yang kamu terima? (opsional, bisa dilewati)
          </p>
        </div>

        {/* Produk list */}
        <div className="px-6 py-4 space-y-6">
          {items.map((item) => (
            <div key={item.id_produk} className="border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                {item.file_foto && (
                  <img
                    src={`http://localhost:5000/uploads/${item.file_foto}`}
                    alt={item.nama_produk}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
                <div>
                  <p className="font-semibold text-sm">{item.nama_produk}</p>
                  <p className="text-xs text-gray-400">{item.warna} / {item.ukuran}</p>
                </div>
              </div>

              {/* Bintang */}
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(item.id_produk, star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={star <= (ratings[item.id_produk] || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>

              {/* Komentar */}
              <textarea
                placeholder="Tulis komentar (opsional)..."
                value={komentar[item.id_produk] || ""}
                onChange={(e) => setComment(item.id_produk, e.target.value)}
                rows={2}
                className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#b89578]"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
          >
            Lewati
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(ratings).length === 0}
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-[#b89578] transition disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Kirim Ulasan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ───────────────────────────────────────────────────────────
export default function RiwayatPembelianPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetailId, setLoadingDetailId] = useState(null);
  const [activeTab, setActiveTab] = useState("semua");
  // preloaded rating & komentar for modal
  const [preloadedRatings, setPreloadedRatings] = useState({});
  const [preloadedKomentar, setPreloadedKomentar] = useState({});

  // State untuk konfirmasi selesai & rating
  const [confirmSelesaiId, setConfirmSelesaiId] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [loadingRatingId, setLoadingRatingId] = useState(null);

  const formatRupiah = (angka) => `Rp.${Number(angka || 0).toLocaleString("id-ID")},00`;

  const getStatusLabel = (status) => {
    const statusMap = {
      pending_payment: "Belum Dibayar",
      pending: "Belum Dibayar",
      dibayar: "Dibayar",
      settlement: "Dibayar",
      diproses: "Diproses",
      dikirim: "Dikirim",
      terkirim: "Terkirim",
      selesai: "Selesai",
      gagal: "Gagal",
      expire: "Kedaluwarsa",
      cancel: "Dibatalkan",
      dibatalkan: "Dibatalkan",
      deny: "Ditolak",
    };
    return statusMap[status] || status || "Menunggu Bayar";
  };

  const getStatusClass = (status) => {
    if (status === "dibayar" || status === "settlement") return "bg-green-100 text-green-700";
    if (["gagal", "expire", "cancel", "deny", "dibatalkan"].includes(status)) return "bg-red-100 text-red-700";
    if (status === "diproses") return "bg-purple-100 text-purple-700";
    if (status === "dikirim") return "bg-blue-100 text-blue-700";
    if (status === "terkirim") return "bg-teal-100 text-teal-700";
    if (status === "selesai") return "bg-black text-white";
    return "bg-yellow-100 text-yellow-700";
  };

  const resolveStatus = (order) => {
    if (["diproses", "dikirim", "terkirim", "selesai", "dibatalkan"].includes(order.status_pesanan)) {
      return order.status_pesanan;
    }
    return order.status_bayar || order.status_pesanan || "pending_payment";
  };

  const fetchRiwayatPesanan = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await api.get("/pesanan/riwayat");
      const dataPesanan = res.data?.data || res.data?.pesanan || res.data?.orders || res.data || [];
      setOrders(Array.isArray(dataPesanan) ? dataPesanan : []);
    } catch (error) {
      console.error("Gagal memuat riwayat pesanan:", error.response?.data || error);
      if (showLoading) alert(error.response?.data?.message || "Gagal memuat riwayat pesanan");
      setOrders([]);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayatPesanan(true);
    const interval = setInterval(() => fetchRiwayatPesanan(false), 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter berdasarkan tab aktif
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "semua") return true;
    const status = resolveStatus(order);
    if (activeTab === "pending_payment") return ["pending_payment", "pending"].includes(status);
    if (activeTab === "dibatalkan") return ["dibatalkan", "cancel"].includes(status);
    return status === activeTab;
  });

  // Hitung badge per tab
  const countByTab = (tabKey) => {
    return orders.filter((order) => {
      const status = resolveStatus(order);
      if (tabKey === "pending_payment") return ["pending_payment", "pending"].includes(status);
      if (tabKey === "dibatalkan") return ["dibatalkan", "cancel"].includes(status);
      return status === tabKey;
    }).length;
  };

  const handleDetail = async (order) => {
    try {
      setLoadingDetailId(order.id_pesanan);
      const res = await api.get(`/pesanan/${order.id_pesanan}`);
      const detailPesanan = res.data?.data || res.data;
      localStorage.setItem("lastPaymentData", JSON.stringify(detailPesanan));
      navigate("/pesanan/detail", { state: detailPesanan });
    } catch (error) {
      console.error("Gagal mengambil detail pesanan:", error.response?.data || error);
      alert(error.response?.data?.message || "Gagal membuka detail pesanan");
    } finally {
      setLoadingDetailId(null);
    }
  };

  // Konfirmasi pesanan selesai
  const handleKonfirmasiSelesai = async (id_pesanan) => {
    try {
      await api.put(`/pesanan/konfirmasi-selesai/${id_pesanan}`);
      setConfirmSelesaiId(null);
      fetchRiwayatPesanan(false);
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengkonfirmasi pesanan");
    }
  };
  // Buka modal rating untuk pesanan selesai
  const handleOpenRating = async (id_pesanan) => {
    try {
      setLoadingRatingId(id_pesanan);
      // Reset preloaded data sebelum fetch
      setPreloadedRatings({});
      setPreloadedKomentar({});

      // fetch order detail
      const res = await api.get(`/pesanan/${id_pesanan}`);
      const detail = res.data?.data || res.data;

      // fetch existing ulasan
      const ulasanRes = await api.get(`/pesanan/ulasan/${id_pesanan}`);
      const ulasanMap = ulasanRes.data?.ulasan || {};
      const initialRatings = {};
      const initialComments = {};
      if (detail?.items) {
        detail.items.forEach(item => {
          const ulasan = ulasanMap[item.id_produk];
          if (ulasan) {
            if (ulasan.rating) initialRatings[item.id_produk] = Number(ulasan.rating);
            if (ulasan.komentar) initialComments[item.id_produk] = ulasan.komentar;
          }
        });
      }

      // Simpan ke state React agar bisa di-pass ke modal sebagai props
      setPreloadedRatings(initialRatings);
      setPreloadedKomentar(initialComments);
      setRatingOrder(detail);
    } catch (error) {
      alert(error.response?.data?.message || "Gagal membuka form rating");
    } finally {
      setLoadingRatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="w-full bg-[#f3efe9] min-h-screen flex flex-col">
        <Navbar />

        <main className="px-20 py-10 flex-1">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <h1 className="text-4xl font-serif">Pesanan</h1>
            <ClipboardList size={28} />
          </div>

          {/* Tab Filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {TABS.map((tab) => {
              const count = tab.key === "semua" ? orders.length : countByTab(tab.key);
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeTab === tab.key
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
                  }`}
                >
                  {tab.label}
                  {count > 0 && tab.key !== "semua" && (
                    <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === tab.key ? "bg-white text-black" : "bg-gray-100 text-gray-500"
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tabel Pesanan */}
          <section className="rounded-lg bg-white px-6 py-8">
            {loading ? (
              <div className="py-20 text-center font-serif text-gray-500">
                Memuat riwayat pesanan...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-20 text-center font-serif text-gray-500">
                {activeTab === "semua" ? "Belum ada pesanan." : `Tidak ada pesanan dengan status "${TABS.find(t => t.key === activeTab)?.label}".`}
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-black">
                    <th className="pb-6 text-center font-serif text-lg">Kode Pesanan</th>
                    <th className="pb-6 text-center font-serif text-lg">Tanggal</th>
                    <th className="pb-6 text-center font-serif text-lg">Total</th>
                    <th className="pb-6 text-center font-serif text-lg">Status</th>
                    <th className="pb-6 text-center font-serif text-lg">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => {
                    const kodePesanan = order.order_id || order.kode_pesanan || `PESANAN-${order.id_pesanan}`;
                    const status = resolveStatus(order);

                    return (
                      <tr
                        key={order.id_pesanan}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <td className="py-5 text-center font-serif">{kodePesanan}</td>

                        <td className="py-5 text-center font-serif">
                          {order.tgl_pesan
                            ? new Date(order.tgl_pesan).toLocaleDateString("id-ID")
                            : "-"}
                        </td>

                        <td className="py-5 text-center font-serif">
                          {formatRupiah(order.total_tagihan)}
                        </td>

                        <td className="py-5 text-center">
                          <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${getStatusClass(status)}`}>
                            {getStatusLabel(status)}
                          </span>
                        </td>

                        <td className="py-5 text-center">
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            {/* Tombol Detail */}
                            <button
                              onClick={() => handleDetail(order)}
                              disabled={loadingDetailId === order.id_pesanan}
                              className="inline-flex items-center gap-1.5 rounded-md bg-black px-4 py-2 font-serif text-sm text-white transition hover:bg-[#b89578] disabled:opacity-60"
                            >
                              <Eye size={16} />
                              {loadingDetailId === order.id_pesanan ? "Memuat..." : "Detail"}
                            </button>

                            {/* Tombol Konfirmasi Selesai — hanya saat status terkirim */}
                            {status === "terkirim" && (
                              <button
                                onClick={() => setConfirmSelesaiId(order.id_pesanan)}
                                className="inline-flex items-center gap-1.5 rounded-md bg-teal-600 px-4 py-2 font-serif text-sm text-white transition hover:bg-teal-700"
                              >
                                <CheckCircle size={16} />
                                Selesai
                              </button>
                            )}

                            {/* Tombol Rating — untuk pesanan selesai */}
                            {status === "selesai" && (
                              <button
                                onClick={() => handleOpenRating(order.id_pesanan)}
                                disabled={loadingRatingId === order.id_pesanan}
                                className="inline-flex items-center gap-1.5 rounded-md bg-yellow-500 px-4 py-2 font-serif text-sm text-white transition hover:bg-yellow-600 disabled:opacity-60"
                              >
                                <Star size={16} />
                                {loadingRatingId === order.id_pesanan ? "Memuat..." : "Rating"}
                              </button>
                            )}
                          </div>
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

      {/* Modal Konfirmasi Selesai */}
      {confirmSelesaiId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[420px]">
            <h3 className="text-xl font-bold mb-2">Konfirmasi Pesanan Selesai</h3>
            <p className="text-gray-600 mb-6">
              Apakah kamu sudah menerima pesanan ini dengan baik? Setelah dikonfirmasi, pesanan tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmSelesaiId(null)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                onClick={() => handleKonfirmasiSelesai(confirmSelesaiId)}
                className="px-5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition font-semibold"
              >
                Ya, Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Rating */}
      {ratingOrder && (
        <RatingModal
          pesanan={ratingOrder}
          preloadedRatings={preloadedRatings}
          preloadedKomentar={preloadedKomentar}
          onClose={() => { setRatingOrder(null); setPreloadedRatings({}); setPreloadedKomentar({}); }}
          onSubmit={() => {
            setRatingOrder(null);
            setPreloadedRatings({});
            setPreloadedKomentar({});
            fetchRiwayatPesanan(false);
          }}
        />
      )}
    </div>
  );
}