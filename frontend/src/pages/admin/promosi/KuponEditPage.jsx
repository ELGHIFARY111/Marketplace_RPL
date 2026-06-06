import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function KuponEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    kode: "",
    tanggalKadaluarsa: "",
    kuota: 0,
    diskon: 0,
  });

  // 🔥 SIMULASI AMBIL DATA (NANTI GANTI API)
  useEffect(() => {
    const dataDummy = {
      id: id,
      kode: "disk129",
      tanggalKadaluarsa: "2026-04-22",
      kuota: 10,
      diskon: 40,
    };

    setFormData(dataDummy);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const tambahKuota = () => {
    setFormData({
      ...formData,
      kuota: formData.kuota + 1,
    });
  };

  const kurangKuota = () => {
    if (formData.kuota > 0) {
      setFormData({
        ...formData,
        kuota: formData.kuota - 1,
      });
    }
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

    console.log("Data update:", formData);

    alert("Kupon berhasil diupdate");
  };

  return (
    <AdminLayout>
      <div>
        {/* HEADER */}
        <div className="flex items-end gap-2">
          <h1 className="text-[3rem] font-bold">
            Kupon
          </h1>

          <span className="text-lg font-semibold mb-2">
            Edit
          </span>
        </div>

        <div className="w-full h-[2px] bg-primary-200 mb-4"></div>

        {/* TOMBOL */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={() => navigate("/admin/promosi-kupon")}
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
              ID Kupon
            </label>

            <input
              type="text"
              value={formData.id}
              readOnly
              className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2"
            />

            {/* KODE */}
            <label className="font-semibold">
              Kode Kupon
            </label>

            <input
              type="text"
              name="kode"
              value={formData.kode}
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

            {/* KUOTA */}
            <label className="font-semibold">
              Masukkan Kuota
            </label>

            <div className="flex items-center bg-primary-100 border border-primary-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={tambahKuota}
                className="px-4 py-2 text-xl font-bold"
              >
                +
              </button>

              <div className="flex-1 text-center">
                {formData.kuota}
              </div>

              <button
                type="button"
                onClick={kurangKuota}
                className="px-4 py-2 text-xl font-bold"
              >
                -
              </button>
            </div>

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