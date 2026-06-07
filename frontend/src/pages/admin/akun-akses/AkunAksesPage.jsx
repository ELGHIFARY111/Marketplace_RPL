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

export default function AkunAksesPage() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState("id_user");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUserData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
      alert("Gagal memuat data akun");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUser = userData.filter(
    (item) =>
      (item.nama_lengkap || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(search.toLowerCase()) ||
      item.id_user.toString().includes(search)
  );

  const handleEdit = (id) => {
    navigate(`/admin/akun-akses/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus akun ini?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      alert("Akun berhasil dihapus");
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus user:", error);
      alert(error.response?.data?.message || "Gagal menghapus akun");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="akun-page">

        {/* HEADER */}
        <div className="page-header flex items-end gap-0">
          <h1 className="text-[3rem] font-bold ml-1">
            Akun dan Akses
          </h1>
        </div>

        <div className="w-full h-[2px] bg-primary-200 mb-3"></div>

        {/* SEARCH + TAMBAH */}
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
            onClick={() => navigate("/admin/akun-akses/tambah")}
            className="tombol-tambah"
          >
            Tambah +
          </button>
        </div>

        {/* TABLE (SAMA PERSIS STRUKTUR KUPON) */}
        <div className="rounded-[15px] overflow-hidden border-2 border-[#D9D9D9]">
          <div className="max-h-[40rem] overflow-y-auto">
            <table className="w-full border-collapse">

              <thead className="bg-primary-100 sticky top-0 z-10 border-b-2 border-[#D9D9D9]">
              <tr>
                <SortableTh label="ID" sortKey="id_user" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                <SortableTh label="Nama Lengkap" sortKey="nama_lengkap" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-left" />
                <SortableTh label="Email" sortKey="email" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-left" />
                <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                  Password
                </th>
                <SortableTh label="No. telp" sortKey="no_telp" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                <SortableTh label="Tanggal daftar" sortKey="tgl_daftar" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                <SortableTh label="Level akses" sortKey="level_akses" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="border-r-2 border-[#D9D9D9] text-center" />
                <th className="p-3 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    Sedang memuat data akun...
                  </td>
                </tr>
              ) : [...filteredUser].sort((a, b) => {
                const valA = a[sortKey] ?? "";
                const valB = b[sortKey] ?? "";
                const cmp = typeof valA === "number" || sortKey === "id_user"
                  ? Number(valA) - Number(valB)
                  : String(valA).localeCompare(String(valB), "id");
                return sortDir === "asc" ? cmp : -cmp;
              }).map((user) => (
                <tr key={user.id_user} className="hover:bg-gray-50">

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    {user.id_user}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                    {user.nama_lengkap}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                    {user.email}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    ********
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    {user.no_telp || "-"}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                    {formatDate(user.tgl_daftar)}
                  </td>

                  <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center capitalize">
                    {user.level_akses}
                  </td>

                  <td className="border-b-2 border-[#D9D9D9] p-3">
                    <div className="flex justify-center gap-2">

                      <button
                        className="tombol-edit"
                        onClick={() => handleEdit(user.id_user)}
                      >
                        Edit
                      </button>

                      <button
                        className="tombol-hapus"
                        onClick={() => handleDelete(user.id_user)}
                      >
                        Hapus
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {!loading && filteredUser.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500"
                  >
                    Data akun tidak ditemukan
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