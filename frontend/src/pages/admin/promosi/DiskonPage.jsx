import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import api from "../../../services/api";

// Komponen header kolom sortable
function SortableTh({ label, sortKey, currentSort, currentDir, onSort, className = "" }) {
  const active = currentSort === sortKey;
  const isLeft = className.includes("text-left");
  return (
    <th
      onClick={() => onSort(sortKey)}
      className={`cursor-pointer select-none hover:bg-primary-200 transition p-3 border-b-2 border-[#D9D9D9] ${className}`}
    >
      <span className={`flex items-center gap-1 ${isLeft ? "justify-start" : "justify-center"}`}>
        {label}
        <span className="text-xs text-gray-400">
          {active ? (currentDir === "asc" ? "▲" : "▼") : "⇅"}
        </span>
      </span>
    </th>
  );
}

export default function DiskonPage() {
  const [search, setSearch] = useState("");
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState("id_promosi");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/promo");
      setPromos(res.data?.data || []);
    } catch (error) {
      console.error("Gagal memuat data promosi:", error);
      alert("Gagal memuat data promosi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const filteredDiskon = promos.filter(
    (item) =>
      item.nama_produk?.toLowerCase().includes(search.toLowerCase()) ||
      item.id_promosi?.toString().includes(search)
  );

  const handleEdit = (id) => {
    navigate(`/admin/promosi-diskon/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus diskon ini?")) return;

    try {
      await api.delete(`/promo/${id}`);
      alert("Diskon berhasil dihapus");
      fetchPromos();
    } catch (error) {
      console.error("Gagal menghapus diskon:", error);
      alert(error.response?.data?.message || "Gagal menghapus diskon");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatus = (batasWaktu) => {
    if (!batasWaktu) return "Nonaktif";
    const now = new Date();
    const expiry = new Date(batasWaktu);
    return expiry > now ? "Aktif" : "Nonaktif";
  };

  return (
    <AdminLayout>
      <div className="diskon-page">
        {/* Header */}
        <div className="page-header flex items-end gap-0">
          <h1 className="text-[3rem] font-bold ml-1">
            Diskon
          </h1>
        </div>

        <div className="w-full h-[2px] bg-primary-200 mb-3"></div>

        {/* Search + Tambah */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Masukkan Pencarian ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-primary-100 border-2 border-primary-200 rounded-lg px-4 py-2 pr-10"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-105">
              <Search size={28} />
            </span>
          </div>

          <button
            onClick={() => navigate("/admin/promosi-diskon/tambah")}
            className="tombol-tambah"
          >
            Tambah +
          </button>
        </div>

        {/* Table */}
        <div className="rounded-[15px] overflow-hidden border-2 border-[#D9D9D9]">
          <div className="max-h-[40rem] overflow-y-auto">
            {loading ? (
              <p className="text-center py-6 text-gray-500">Memuat data...</p>
            ) : (
              <table className="w-full border-collapse">
                <thead className="bg-primary-100 sticky top-0 z-10 border-b-2 border-[#D9D9D9]">
                <tr>
                  <SortableTh label="ID" sortKey="id_promosi" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Nama Produk" sortKey="nama_produk" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-left" />
                  <SortableTh label="Jenis Diskon" sortKey="jenis" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Nilai" sortKey="persentase_diskon" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Batas Waktu" sortKey="batas_waktu" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Status" sortKey="status" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <th className="p-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {[...filteredDiskon].sort((a, b) => {
                  let valA = a[sortKey] ?? "";
                  let valB = b[sortKey] ?? "";
                  if (sortKey === "status") {
                    valA = getStatus(a.batas_waktu);
                    valB = getStatus(b.batas_waktu);
                  } else if (sortKey === "jenis") {
                    valA = "Persentase";
                    valB = "Persentase";
                  }
                  const cmp = typeof valA === "number" || sortKey === "id_promosi" || sortKey === "persentase_diskon"
                    ? Number(valA) - Number(valB)
                    : String(valA).localeCompare(String(valB), "id");
                  return sortDir === "asc" ? cmp : -cmp;
                }).map((diskon) => (
                  <tr
                    key={diskon.id_promosi}
                    className="hover:bg-gray-50"
                  >
                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {diskon.id_promosi}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                      {diskon.nama_produk || `Produk ID: ${diskon.id_produk}`}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      Persentase
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center font-bold text-red-600">
                      {Math.round(diskon.persentase_diskon)}%
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {formatDate(diskon.batas_waktu)}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        getStatus(diskon.batas_waktu) === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {getStatus(diskon.batas_waktu)}
                      </span>
                    </td>

                    <td className="border-b-2 border-[#D9D9D9] p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="tombol-edit"
                          onClick={() => handleEdit(diskon.id_promosi)}
                        >
                          Edit
                        </button>

                        <button
                          className="tombol-hapus"
                          onClick={() => handleDelete(diskon.id_promosi)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredDiskon.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500"
                    >
                      Data diskon tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}