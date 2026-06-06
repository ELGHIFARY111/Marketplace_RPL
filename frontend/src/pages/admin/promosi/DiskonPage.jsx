import AdminLayout from "../../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function DiskonPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const diskonData = [
    {
      id: 1,
      nama: "Diskon Lebaran",
      jenis: "Persentase",
      nilai: "20%",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Diskon Member",
      jenis: "Nominal",
      nilai: "Rp50.000",
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Flash Sale",
      jenis: "Persentase",
      nilai: "35%",
      status: "Nonaktif",
    },
    {
      id: 4,
      nama: "Promo Akhir Tahun",
      jenis: "Persentase",
      nilai: "50%",
      status: "Aktif",
    },
  ];

  const filteredDiskon = diskonData.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().includes(search)
  );

  const handleEdit = (id) => {
    navigate(`/admin/promosi-diskon/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus diskon ini?")) return;

    console.log("Delete diskon:", id);
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
            <table className="w-full border-collapse">
              <thead className="bg-primary-100 sticky top-0 z-10 border-b-2 border-[#D9D9D9]">
                <tr>
                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    ID
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-left">
                    Nama Diskon
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Jenis Diskon
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Nilai
                  </th>

                  <th className="border-r-2 border-[#D9D9D9] p-3 text-center">
                    Status
                  </th>

                  <th className="p-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDiskon.map((diskon) => (
                  <tr
                    key={diskon.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {diskon.id}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3">
                      {diskon.nama}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {diskon.jenis}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {diskon.nilai}
                    </td>

                    <td className="border-r-2 border-b-2 border-[#D9D9D9] p-3 text-center">
                      {diskon.status}
                    </td>

                    <td className="border-b-2 border-[#D9D9D9] p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="tombol-edit"
                          onClick={() => handleEdit(diskon.id)}
                        >
                          Edit
                        </button>

                        <button
                          className="tombol-hapus"
                          onClick={() => handleDelete(diskon.id)}
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
                      colSpan="6"
                      className="text-center py-6 text-gray-500"
                    >
                      Data diskon tidak ditemukan
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