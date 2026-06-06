import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AkunEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    email: "",
    telpon: "",
    level: "",
    password: "",
  });

  // 🔥 simulasi ambil data (nanti bisa dari API)
  useEffect(() => {
    const dataDummy = {
      id: id,
      nama: "Adit Sopo",
      email: "adit@gmai.com",
      telpon: "080000010001",
      level: "admin",
      password: "************",
    };

    setFormData(dataDummy);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert("Akun berhasil diupdate");

    navigate("/admin/akun-akses");
  };

  return (
    <AdminLayout>
      <div>

        {/* HEADER */}
        <div className="flex items-end gap-2">
          <h1 className="text-[3rem] font-bold">
            Akun dan Akses
          </h1>

          <span className="text-lg font-semibold mb-2">
            Edit
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

            {/* ID */}
            <label className="font-semibold">
              ID
            </label>
            <input
              type="text"
              value={formData.id}
              disabled
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

            {/* Nama */}
            <label className="font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
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
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
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
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
            />

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}