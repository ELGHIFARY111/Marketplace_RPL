import AdminLayout from "../../../layouts/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import PopupAlert from "../../../components/PopupAlert";
import useAlert from "../../../components/useAlert";

export default function AkunFormPage() {
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telpon: "",
    level: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.email || !formData.level || !formData.password) {
      showAlert("Mohon isi semua data yang wajib!", "warning");
      return;
    }

    try {
      await api.post("/admin/users", formData);
      showAlert("Akun berhasil disimpan", "success");
      navigate("/admin/akun-akses");
    } catch (error) {
      console.error("Gagal menyimpan akun:", error);
      showAlert(error.response?.data?.message || "Gagal menyimpan akun", "error");
    }
  };

  return (
    <AdminLayout>
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div>

        {/* HEADER */}
        <div className="flex items-end gap-2">
          <h1 className="text-[3rem] font-bold">
            Akun dan Akses
          </h1>

          <span className="text-lg font-semibold mb-2">
            Tambah
          </span>
        </div>

        {/* GARIS */}
        <div className="w-full h-[2px] bg-primary-200 mb-6"></div>

        {/* TOMBOL */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={() => navigate("/admin/akun-akses")}
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

            {/* Nama */}
            <label className="font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Lengkap ..."
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* Email */}
            <label className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan Email ..."
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* Telpon */}
            <label className="font-semibold">
              No. Telpon
            </label>
            <input
              type="text"
              name="telpon"
              value={formData.telpon}
              onChange={handleChange}
              placeholder="Masukkan Nomor Telpon ..."
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* Level */}
            <label className="font-semibold">
              Level Akses
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            >
              <option value="">Pilih Level Akses ...</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>

            {/* Password */}
            <label className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan Password ..."
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}