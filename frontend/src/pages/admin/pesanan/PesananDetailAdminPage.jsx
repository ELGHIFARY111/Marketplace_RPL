import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import PopupAlert from "../../../components/PopupAlert";
import useAlert from "../../../components/useAlert";
import { API_BASE_URL } from "../../../services/config";
import { SectionLoader } from "../../../components/Loading";

const STATUS_COLORS = {
  dibayar: "bg-blue-500",
  diproses: "bg-purple-500",
  dikirim: "bg-blue-400",
  selesai: "bg-green-500",
  dibatalkan: "bg-red-700",
  pending_payment: "bg-yellow-500",
  gagal: "bg-red-900",
};

export default function PesananDetailAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { alerts, showAlert, closeAlert } = useAlert();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const token = localStorage.getItem("token");

  const fetchDetail = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/pesanan/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPesanan(data.data || null);
      if (data.data) {
        setSelectedStatus(data.data.status_pesanan);
      }
    } catch (err) {
      console.error("Gagal fetch detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!selectedStatus || selectedStatus === pesanan.status_pesanan) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`${API_BASE_URL}/pesanan/admin/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: [pesanan.id_pesanan], status: selectedStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        showAlert(data.message || "Status berhasil diperbarui", "success");
        fetchDetail();
      } else {
        showAlert(data.message || "Gagal memperbarui status", "error");
      }
    } catch (err) {
      showAlert("Gagal memperbarui status", "error");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const formatRupiah = (n) => `Rp. ${Number(n || 0).toLocaleString("id-ID")}`;

  if (loading) {
    return (
      <AdminLayout>
        <SectionLoader message="Memuat data pesanan..." />
      </AdminLayout>
    );
  }

  if (!pesanan) {
    return (
      <AdminLayout>
        <p className="p-8 text-red-500">Pesanan tidak ditemukan.</p>
      </AdminLayout>
    );
  }

  const alamat = [pesanan.desa, pesanan.kecamatan, pesanan.kabupaten_kota, pesanan.provinsi, pesanan.kode_pos]
    .filter(Boolean).join(", ");

  const midtrans = pesanan.payment_response ? JSON.parse(pesanan.payment_response) : null;

  const getPayLinks = () => {
    if (!midtrans) return [];
    const links = [];
    
    if (midtrans.redirect_url) {
      links.push({ name: "Buka Pembayaran (Midtrans)", url: midtrans.redirect_url });
    }

    if (midtrans.actions) {
      midtrans.actions.forEach(action => {
        if (action.name === "deeplink-redirect") {
          links.push({ name: "Buka Deeplink Pembayaran", url: action.url });
        }
      });
    }

    // Auto-Generate Sandbox Simulator Links
    if (midtrans.payment_type === "echannel") {
      links.push({ name: "Simulator Pembayaran Mandiri", url: "https://simulator.sandbox.midtrans.com/mandiri/bill/index" });
    } else if (midtrans.payment_type === "bank_transfer") {
      if (midtrans.va_numbers && midtrans.va_numbers.length > 0) {
        const bank = midtrans.va_numbers[0].bank;
        links.push({ name: `Simulator VA ${bank.toUpperCase()}`, url: `https://simulator.sandbox.midtrans.com/${bank}/va/index` });
      } else if (midtrans.permata_va_number) {
        links.push({ name: "Simulator VA PERMATA", url: "https://simulator.sandbox.midtrans.com/permata/va/index" });
      }
    } else if (midtrans.payment_type === "cstore") {
      if (midtrans.store === "indomaret") {
        links.push({ name: "Simulator Indomaret", url: "https://simulator.sandbox.midtrans.com/indomaret/index" });
      } else if (midtrans.store === "alfamart") {
        links.push({ name: "Simulator Alfamart", url: "https://simulator.sandbox.midtrans.com/alfamart/index" });
      }
    } else if (midtrans.payment_type === "qris") {
      links.push({ name: "Simulator QRIS", url: "https://simulator.sandbox.midtrans.com/qris/index" });
    }
    
    return links;
  };

  const payLinks = getPayLinks();

  return (
    <AdminLayout>
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      {/* HEADER */}
      <div className="page-header flex items-end gap-2">
        <h1 className="text-[3rem] font-bold ml-1">Pesanan</h1>
        <span className="btn-add text-[1.5rem] font-bold mb-2 ml-2">Pesanan &gt; detail</span>
      </div>

      <div className="w-full h-[2px] bg-primary-200 mb-4" />

      {/* BACK */}
      <button
        onClick={() => navigate("/admin/pesanan")}
        className="mb-4 text-sm text-gray-600 underline"
      >
        ← Kembali ke daftar pesanan
      </button>

      {/* INFO PESANAN */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">
          Informasi Pesanan ID {pesanan.id_pesanan}
        </h2>

        <div className="grid grid-cols-[180px_1fr] gap-y-3 text-sm">
          <span className="font-semibold">Nama Customer</span>
          <span>{pesanan.nama_customer || "-"}</span>

          <span className="font-semibold">Metode Pembayaran</span>
          <span>{pesanan.metode_bayar || "-"}</span>

          <span className="font-semibold">Status Pesanan</span>
          <div className="flex flex-col gap-2 max-w-[200px]">
            <span className={`text-white text-xs px-3 py-1 rounded-full w-fit ${STATUS_COLORS[pesanan.status_pesanan] || "bg-gray-400"}`}>
              {pesanan.status_pesanan || "-"}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none flex-1"
              >
                <option value="pending_payment">Pending Payment</option>
                <option value="dibayar">Dibayar</option>
                <option value="diproses">Diproses</option>
                <option value="dikirim">Dikirim</option>
                <option value="terkirim">Terkirim</option>
                <option value="selesai">Selesai</option>
                <option value="dibatalkan">Dibatalkan</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={isUpdatingStatus || selectedStatus === pesanan.status_pesanan}
                className="bg-primary-500 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-primary-600 disabled:opacity-50 transition"
              >
                {isUpdatingStatus ? "..." : "Update"}
              </button>
            </div>
          </div>

          <span className="font-semibold">Total Tagihan</span>
          <span className="font-bold">{formatRupiah(pesanan.total_tagihan)}</span>

          <span className="font-semibold">Alamat</span>
          <span>{alamat || pesanan.nama_penerima || "-"}</span>

          {pesanan.no_resi && (
            <>
              <span className="font-semibold">No. Resi</span>
              <span>{pesanan.no_resi}</span>
            </>
          )}
        </div>
      </section>

      {/* INSTRUKSI PEMBAYARAN / LINK PAY */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">
          Link Pembayaran / Deeplink
        </h2>

        {payLinks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {payLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white hover:bg-black/80 transition px-6 py-3 rounded-lg font-bold w-fit text-center block"
              >
                {link.name}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Tidak ada link pembayaran / deeplink tersedia untuk pesanan ini.</p>
        )}
      </section>

      {/* DAFTAR BARANG */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-4">
          Daftar Barang Pesanan ID {pesanan.id_pesanan}
        </h2>

        <div className="rounded-lg overflow-hidden border border-gray-300">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-primary-100 border-b-2 border-gray-300">
              <tr>
                <th className="p-3 border text-center">No.</th>
                <th className="p-3 border text-center">Nama Produk</th>
                <th className="p-3 border text-center">Varian</th>
                <th className="p-3 border text-center">Qty</th>
                <th className="p-3 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(pesanan.items || []).length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Tidak ada item
                  </td>
                </tr>
              ) : (
                pesanan.items.map((item, index) => (
                  <tr key={item.id_detail} className="hover:bg-gray-50">
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{item.nama_produk || "-"}</td>
                    <td className="p-3 border text-center">{item.sku || `${item.warna} / ${item.ukuran}`}</td>
                    <td className="p-3 border text-center">{item.qty}</td>
                    <td className="p-3 border text-center font-semibold">
                      {formatRupiah(item.harga_satuan)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}
