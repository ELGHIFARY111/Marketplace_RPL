import AdminLayout from "../../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DiskonEditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL

  // 🔥 DATA AWAL (nanti ganti dari API / props)
  const [formData, setFormData] = useState({
    id: id,
    produk: "Kaos Cap 3 Kucing",
    tanggalKadaluarsa: "2026-04-22",
    diskon: 40,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const tambahDiskon = () => {
    if (formData.diskon < 100) {
      setFormData({
        ...formData,
        diskon: formData.diskon + 1,
      });
    }
  };

  const kurangDiskon = () => {
    if (formData.diskon > 0) {
      setFormData({
        ...formData,
        diskon: formData.diskon - 1,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Update Diskon:", formData);

    alert("Diskon berhasil diupdate");
    navigate("/admin/promosi-diskon");
  };

  return (
    <AdminLayout>
      <div>

        {/* HEADER */}
        <div className="flex items-end gap-2">
          <h1 className="text-[3rem] font-bold">
            Promo
          </h1>

          <span className="text-lg font-semibold mb-2">
            Edit
          </span>
        </div>

        <div className="w-full h-[2px] bg-primary-200 mb-4"></div>

        {/* BUTTON */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={() => navigate("/admin/promosi-diskon")}
            className="px-8 py-2 rounded-md bg-gray-400 text-white font-semibold"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-2 rounded-md bg-green-600 text-white font-semibold"
          >
            Simpan
          </button>
        </div>

        {/* FORM */}
        <div className="max-w-4xl">
          <div className="grid grid-cols-[250px_1fr] gap-y-6 items-center">

            {/* ID */}
            <label className="font-semibold">
              ID Produk
            </label>

            <input
              type="text"
              value={formData.id}
              disabled
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* PRODUK */}
            <label className="font-semibold">
              Pilih Produk
            </label>

            <input
              type="text"
              name="produk"
              value={formData.produk}
              onChange={handleChange}
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* TANGGAL */}
            <label className="font-semibold">
              Masukkan Tanggal Kadaluarsa
            </label>

            <input
              type="date"
              name="tanggalKadaluarsa"
              value={formData.tanggalKadaluarsa}
              onChange={handleChange}
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* DISKON */}
            <label className="font-semibold">
              Masukkan Presentase Diskon
            </label>

            <div className="flex items-center bg-primary-100 border border-primary-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={tambahDiskon}
                className="px-4 py-2 text-xl font-bold"
              >
                +
              </button>

              <div className="flex-1 text-center">
                {formData.diskon}%
              </div>

              <button
                type="button"
                onClick={kurangDiskon}
                className="px-4 py-2 text-xl font-bold"
              >
                -
              </button>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}