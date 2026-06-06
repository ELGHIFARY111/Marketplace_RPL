import AdminLayout from "../../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function KuponPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const kuponData = [
    {
      id: 1,
      kode: "DISK1029",
      batasWaktu: "22-Apr-2026",
      kuota: 100,
      diskon: "40%",
    },
    {
      id: 2,
      kode: "DISK2045",
      batasWaktu: "15-Mei-2026",
      kuota: 50,
      diskon: "25%",
    },
    {
      id: 3,
      kode: "HEMAT50",
      batasWaktu: "10-Jun-2026",
      kuota: 200,
      diskon: "50%",
    },
    {
      id: 4,
      kode: "ZENVY10",
      batasWaktu: "01-Jul-2026",
      kuota: 500,
      diskon: "10%",
    },
  ];

  const filteredKupon = kuponData.filter(
    (item) =>
      item.kode.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().includes(search)
  );

  const handleEdit = (id) => {
    navigate(`/admin/promosi-kupon/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus kupon ini?")) return;

    console.log("Delete kupon:", id);
  };

  return (
    <AdminLayout>
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
          <div className="max-h-[40rem] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-primary-100 sticky top-0 z-10 border-b-2 border-[#D9D9D9]">
                <tr>
                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    ID
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-left">
                    Kode Kupon
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Batas Waktu
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Kuota
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Diskon
                  </th>

                  <th className="p-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredKupon.map((kupon) => (
                  <tr
                    key={kupon.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {kupon.id}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                      {kupon.kode}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {kupon.batasWaktu}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {kupon.kuota}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {kupon.diskon}
                    </td>

                    <td className="border-b-2 border-[#D9D9D9] p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="tombol-edit"
                          onClick={() => handleEdit(kupon.id)}
                        >
                          Edit
                        </button>

                        <button
                          className="tombol-hapus"
                          onClick={() => handleDelete(kupon.id)}
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}