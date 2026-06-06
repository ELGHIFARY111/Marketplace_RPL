import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

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

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/pesanan/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPesanan(data.data || null);
      } catch (err) {
        console.error("Gagal fetch detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const formatRupiah = (n) => `Rp. ${Number(n || 0).toLocaleString("id-ID")}`;

  if (loading) {
    return (
      <AdminLayout>
        <p className="p-8 text-gray-500">Memuat data...</p>
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

  return (
    <AdminLayout>
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
          <span>
            <span className={`text-white text-xs px-3 py-1 rounded-full ${STATUS_COLORS[pesanan.status_pesanan] || "bg-gray-400"}`}>
              {pesanan.status_pesanan || "-"}
            </span>
          </span>

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
