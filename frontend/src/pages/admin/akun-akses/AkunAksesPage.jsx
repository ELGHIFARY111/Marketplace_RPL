import AdminLayout from "../../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function AkunAksesPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const userData = [
    {
      id: 1,
      nama: "Adit sopo",
      email: "Adit@gmail.com",
      password: "********",
      telp: "0800001001",
      tanggal: "10-Mei-2023",
      level: "Admin",
    },
    {
      id: 2,
      nama: "Adit sopo",
      email: "Adit@gmail.com",
      password: "********",
      telp: "0800001001",
      tanggal: "10-Mei-2023",
      level: "Admin",
    },
  ];

  const filteredUser = userData.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().includes(search)
  );

  const handleEdit = (id) => {
    navigate(`/admin/akun-akses/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus akun ini?")) return;

    console.log("Delete user:", id);
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
                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    ID
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-left">
                    Nama Lengkap
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-left">
                    Email
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Password
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    No. telp
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Tanggal daftar
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Level akses
                  </th>

                  <th className="p-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUser.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {user.id}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                      {user.nama}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                      {user.email}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {user.password}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {user.telp}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {user.tanggal}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {user.level}
                    </td>

                    <td className="border-b-2 border-[#D9D9D9] p-3">
                      <div className="flex justify-center gap-2">

                        <button
                          className="tombol-edit"
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </button>

                        <button
                          className="tombol-hapus"
                          onClick={() => handleDelete(user.id)}
                        >
                          Hapus
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {filteredUser.length === 0 && (
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