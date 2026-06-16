import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import api from "../../../services/api";
import PopupAlert from "../../../components/PopupAlert";
import useAlert from "../../../components/useAlert";

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

export default function KuponPage() {
  const [search, setSearch] = useState("");
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();

  const [sortKey, setSortKey] = useState("id_voucher");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/voucher");
      setVouchers(res.data?.data || []);
    } catch (error) {
      console.error("Gagal memuat data voucher:", error);
      showAlert("Gagal memuat data voucher", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const filteredKupon = vouchers.filter(
    (item) =>
      item.kode_voucher?.toLowerCase().includes(search.toLowerCase()) ||
      item.id_voucher?.toString().includes(search)
  );

  const handleEdit = (id) => {
    navigate(`/admin/promosi-kupon/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus kupon ini?")) return;

    try {
      await api.delete(`/voucher/${id}`);
      showAlert("Kupon berhasil dihapus", "success");
      fetchVouchers();
    } catch (error) {
      console.error("Gagal menghapus kupon:", error);
      showAlert(error.response?.data?.message || "Gagal menghapus kupon", "error");
    }
  };

  const formatRupiah = (angka) => {
    return `Rp ${Number(angka || 0).toLocaleString("id-ID")}`;
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

  return (
    <AdminLayout>
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div className="kupon-page">
        {/* Header */}
        <div className="page-header flex items-end gap-0">
          <h1 className="text-[3rem] font-bold ml-1">
            Kupon
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
            onClick={() => navigate("/admin/promosi-kupon/tambah")}
            className="tombol-tambah"
          >
            Tambah +
          </button>
        </div>

        {/* Table */}
        <div className="rounded-[15px] overflow-hidden border-2 border-[#D9D9D9]">
          <div className="max-h-[37rem] overflow-y-auto">
            {loading ? (
              <p className="text-center py-6 text-gray-500">Memuat data...</p>
            ) : (
              <table className="w-full border-collapse">
                <thead className="bg-primary-100 sticky top-0 z-10 border-b-2 border-[#D9D9D9]">
                <tr>
                  <SortableTh label="ID" sortKey="id_voucher" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Kode Kupon" sortKey="kode_voucher" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-left" />
                  <SortableTh label="Batas Waktu" sortKey="batas_waktu" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Kuota" sortKey="kuota" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <SortableTh label="Potongan Harga" sortKey="nominal_diskon" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                  <th className="p-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {[...filteredKupon].sort((a, b) => {
                  const valA = a[sortKey] ?? "";
                  const valB = b[sortKey] ?? "";
                  const cmp = typeof valA === "number" || sortKey === "id_voucher" || sortKey === "kuota" || sortKey === "nominal_diskon"
                    ? Number(valA) - Number(valB)
                    : String(valA).localeCompare(String(valB), "id");
                  return sortDir === "asc" ? cmp : -cmp;
                }).map((kupon) => (
                  <tr
                    key={kupon.id_voucher}
                    className="hover:bg-gray-50"
                  >
                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {kupon.id_voucher}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 font-semibold text-blue-600">
                      {kupon.kode_voucher}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {formatDate(kupon.batas_waktu)}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {kupon.kuota}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center font-bold text-green-600">
                      {formatRupiah(kupon.nominal_diskon)}
                    </td>

                    <td className="border-b-2 border-[#D9D9D9] p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="tombol-edit"
                          onClick={() => handleEdit(kupon.id_voucher)}
                        >
                          Edit
                        </button>

                        <button
                          className="tombol-hapus"
                          onClick={() => handleDelete(kupon.id_voucher)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredKupon.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-6 text-gray-500"
                    >
                      Data kupon tidak ditemukan
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