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

export default function PesanCSListPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState("id_pesan");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get("/cs/all");
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Gagal mengambil pesan CS:", error);
      alert("Gagal memuat pesan Customer Service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (item) =>
      (item.nama_lengkap || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.subjek || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <AdminLayout>
      <div className="cs-list-page">

        {/* HEADER */}
        <div className="page-header flex items-end gap-0">
          <h1 className="text-[3rem] font-bold ml-1">
            Customer Service
          </h1>
        </div>

        <div className="w-full h-[2px] bg-primary-200 mb-3"></div>

        {/* SEARCH */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Masukkan pencarian nama, email, atau subjek..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-primary-100 border-2 border-primary-200 rounded-lg px-4 py-2 pr-10 text-sm"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-105">
              <Search size={20} />
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-[15px] overflow-hidden border-2 border-[#D9D9D9]">
          <div className="max-h-[40rem] overflow-y-auto">
            <table className="w-full border-collapse">

              <thead className="bg-primary-100 sticky top-0 z-10 border-b-2 border-[#D9D9D9] text-sm">
              <tr>
                <SortableTh label="ID" sortKey="id_pesan" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center w-12" />
                <SortableTh label="Nama Customer" sortKey="nama_lengkap" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-left w-48" />
                <SortableTh label="Subjek" sortKey="subjek" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-left" />
                <SortableTh label="Tanggal Masuk" sortKey="tgl_kirim" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center w-40" />
                <SortableTh label="Status" sortKey="status_balasan" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center w-32" />
                <th className="p-3 text-center w-28">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Sedang memuat pesan...
                  </td>
                </tr>
              ) : [...filteredMessages].sort((a, b) => {
                const valA = a[sortKey] ?? "";
                const valB = b[sortKey] ?? "";
                const cmp = typeof valA === "number" || sortKey === "id_pesan"
                  ? Number(valA) - Number(valB)
                  : String(valA).localeCompare(String(valB), "id");
                return sortDir === "asc" ? cmp : -cmp;
              }).map((msg) => (
                <tr key={msg.id_pesan} className="hover:bg-gray-50">

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    {msg.id_pesan}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                    <p className="font-bold">{msg.nama_lengkap}</p>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                    {msg.subjek}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    {formatDate(msg.tgl_kirim)}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      msg.status_balasan === 'dibalas'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {msg.status_balasan}
                    </span>
                  </td>

                  <td className="border-b-2 border-[#D9D9D9] p-3 text-center">
                    <button
                      className="tombol-edit !bg-black hover:!bg-[#b89578] font-bold text-white px-3 py-1.5 rounded transition"
                      onClick={() => navigate(`/admin/cs/detail/${msg.id_pesan}`)}
                    >
                      Detail / Balas
                    </button>
                  </td>

                </tr>
              ))}

              {!loading && filteredMessages.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    Tidak ada pesan CS ditemukan
                  </td>
                </tr>
              )}

            </tbody>

          </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
