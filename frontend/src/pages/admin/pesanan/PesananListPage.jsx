import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { Search, ChevronDown, Star, ArrowRight } from "lucide-react";
// Komponen header kolom sortable
function SortableTh({ label, sortKey, currentSort, currentDir, onSort }) {
  const active = currentSort === sortKey;
  return (
    <th
      onClick={() => onSort(sortKey)}
      className="cursor-pointer select-none hover:bg-primary-200 transition p-3 border text-center"
    >
      <span className="flex items-center justify-center gap-1">
        {label}
        <span className="text-xs text-gray-400">
          {active ? (currentDir === "asc" ? "▲" : "▼") : "⇅"}
        </span>
      </span>
    </th>
  );
}

const STATUS_COLORS = {
  dibayar: "bg-blue-500",
  diproses: "bg-purple-500",
  dikirim: "bg-blue-400",
  selesai: "bg-green-500",
  dibatalkan: "bg-red-700",
  pending_payment: "bg-yellow-500",
  gagal: "bg-red-900",
};

const STATUS_OPTIONS = [
  { value: "diproses", label: "Diproses", color: "bg-purple-500" },
  { value: "dikirim", label: "Dikirim", color: "bg-blue-400" },
  { value: "dibatalkan", label: "Dibatalkan", color: "bg-red-700" },
  { value: "pending_payment", label: "Pembayaran", color: "bg-yellow-500" },
  { value: "selesai", label: "Selesai", color: "bg-green-500" },
  { value: "hapus", label: "Hapus", color: "bg-black" },
];

export default function PesananListPage() {
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id_pesanan");
  const [sortDir, setSortDir] = useState("desc");

  // Mode update status
  const [modeUpdate, setModeUpdate] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal konfirmasi
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const token = localStorage.getItem("token");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const fetchPesanan = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/pesanan/admin/semua", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPesanan(data.data || []);
    } catch (err) {
      console.error("Gagal fetch pesanan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPesanan(); }, []);

  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    return new Date(tgl).toLocaleDateString("id-ID", {
      day: "2-digit", month: "long", year: "numeric",
    });
  };

  const formatRupiah = (n) => `Rp. ${Number(n || 0).toLocaleString("id-ID")}`;

  const filtered = pesanan.filter((p) =>
    p.nama_customer?.toLowerCase().includes(search.toLowerCase()) ||
    String(p.id_pesanan).includes(search)
  );

  const sortedPesanan = [...filtered].sort((a, b) => {
    const valA = a[sortKey] ?? "";
    const valB = b[sortKey] ?? "";
    const cmp = typeof valA === "number" || sortKey === "id_pesanan" || sortKey === "total_tagihan"
      ? Number(valA) - Number(valB)
      : String(valA).localeCompare(String(valB), "id");
    return sortDir === "asc" ? cmp : -cmp;
  });

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id_pesanan));
    }
  };

  const handleKonfirmasi = async () => {
    if (!selectedStatus || selectedIds.length === 0) return;
    try {
      const res = await fetch("http://localhost:5000/api/pesanan/admin/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedIds, status: selectedStatus }),
      });
      const data = await res.json();
      alert(data.message || "Berhasil diperbarui");
      setShowModal(false);
      setModeUpdate(false);
      setSelectedIds([]);
      setSelectedStatus("");
      fetchPesanan();
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="page-header flex items-end gap-2">
        <h1 className="text-[3rem] font-bold ml-1">Pesanan</h1>
        <span className="btn-add text-[1.5rem] font-bold mb-2 ml-2">
          {modeUpdate ? "Pesanan > perbarui status" : "Pesanan"}
        </span>
      </div>

      <div className="w-full h-[2px] bg-primary-200 mb-4" />

      {/* TOOLBAR */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        {/* Search */}
        <div className="relative w-[400px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Masukkan Pencarian ..."
            className="w-full bg-primary-100 border-2 border-primary-200 rounded-lg px-4 py-2 pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-105">
            <Search size={28} />
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {modeUpdate && (
            <>
              <label className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIds.length === sortedPesanan.length && sortedPesanan.length > 0}
                  onChange={toggleSelectAll}
                />
                Pilih Semua
              </label>
              <button
                onClick={() => { setModeUpdate(false); setSelectedIds([]); }}
                className="bg-gray-400 text-white px-5 py-2 rounded-md text-sm"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (selectedIds.length === 0) { alert("Pilih pesanan dulu"); return; }
                  setShowModal(true);
                }}
                className="bg-green-600 text-white px-5 py-2 rounded-md text-sm"
              >
                Perbarui
              </button>
            </>
          )}
          {!modeUpdate && (
            <button
              onClick={() => setModeUpdate(true)}
              className="tombol-edit-2 w-[150px]"
            >
              Perbarui Status
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-[15px] overflow-hidden border-2 border-[#D9D9D9]">
        <div className="max-h-[40rem] overflow-y-auto">

          <table className="w-full border-collapse text-sm">
            <thead className="bg-primary-100 sticky -top-1 z-10 border-b-2 border-[#D9D9D9]">
              <tr>
                <SortableTh label="ID"       sortKey="id_pesanan"    currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableTh label="Customer" sortKey="nama_customer" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableTh label="Tanggal"  sortKey="tgl_pesan"     currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableTh label="Total"    sortKey="total_tagihan" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                <SortableTh label="Status"   sortKey="status_pesanan" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                <th className="p-3 border text-center">
                  {modeUpdate ? "Update" : "Aksi"}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : sortedPesanan.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">Tidak ada pesanan</td>
                </tr>
              ) : (
                sortedPesanan.map((p) => (
                  <tr key={p.id_pesanan} className="hover:bg-gray-50 text-center">
                    <td className="p-3 border">{p.id_pesanan}</td>
                    <td className="p-3 border">{p.nama_customer || "-"}</td>
                    <td className="p-3 border">{formatTanggal(p.tgl_pesan)}</td>
                    <td className="p-3 border">{formatRupiah(p.total_tagihan)}</td>
                    <td className="p-3 border">
                      <span className={`status-box text-white text-xs px-3 py-1 rounded-[10px] ${STATUS_COLORS[p.status_pesanan] || "bg-gray-400"}`}>
                        {p.status_pesanan || "-"}
                      </span>
                    </td>
                    <td className="p-3 border">
                      {modeUpdate ? (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.id_pesanan)}
                          onChange={() => toggleSelect(p.id_pesanan)}
                          className="w-4 h-4"
                        />
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/pesanan/detail/${p.id_pesanan}`)}
                            className="tombol-edit"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => {
                              setSelectedIds([p.id_pesanan]);
                              setModeUpdate(false);
                              setShowModal(true);
                            }}
                            className="tombol-hapus"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL KONFIRMASI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-[460px]">
            <h2 className="text-center text-xl font-bold mb-6 border-b pb-3">
              Konfirmasi Update Status Pesanan
            </h2>

            <div className="flex items-center gap-4 mb-3">
              <span className="w-16 font-semibold">ID</span>
              <span>{selectedIds.join(", ")}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="w-16 font-semibold">Status</span>
              <span>
                {pesanan.find((p) => selectedIds.includes(p.id_pesanan))?.status_pesanan || "-"}
              </span>
            </div>

            {/* Status Pilihan */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {STATUS_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={selectedStatus === opt.value}
                    onChange={() => setSelectedStatus(opt.value)}
                  />
                  <span className={`text-white text-xs px-3 py-1 rounded-full ${opt.color}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>

            <p className="text-xs text-gray-500 mb-5">
              *Pilih lah salah satu status yang diinginka, atau pilih hapus untuk menghapus pesanan
            </p>

            <button
              onClick={handleKonfirmasi}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-xl"
            >
              Konfirmasi
            </button>

            <button
              onClick={() => { setShowModal(false); setSelectedStatus(""); }}
              className="w-full mt-2 text-sm text-gray-500 underline"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
