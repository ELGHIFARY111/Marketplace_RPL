import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

export default function KuponEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    kode: "",
    tanggalKadaluarsa: "",
    kuota: 0,
    diskon: 0,
  });

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/voucher/${id}`);
        const voucher = res.data?.data;
        if (voucher) {
          const expiryDate = voucher.batas_waktu 
            ? new Date(voucher.batas_waktu).toISOString().split("T")[0] 
            : "";
          setFormData({
            id: voucher.id_voucher || id,
            kode: voucher.kode_voucher || "",
            tanggalKadaluarsa: expiryDate,
            kuota: Number(voucher.kuota) || 0,
            diskon: Number(voucher.nominal_diskon) || 0,
          });
        }
      } catch (error) {
        console.error("Gagal memuat kupon:", error);
        alert("Gagal memuat data kupon");
      } finally {
        setLoading(false);
      }
    };

    fetchVoucher();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.name === "kuota" || e.target.name === "diskon" 
      ? Number(e.target.value) 
      : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const tambahKuota = () => {
    setFormData((prev) => ({
      ...prev,
      kuota: prev.kuota + 1,
    }));
  };

  const kurangKuota = () => {
    setFormData((prev) => ({
      ...prev,
      kuota: prev.kuota > 0 ? prev.kuota - 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.kode.trim()) {
      alert("Masukkan kode kupon terlebih dahulu");
      return;
    }

    if (!formData.tanggalKadaluarsa) {
      alert("Masukkan tanggal kadaluarsa");
      return;
    }

    if (formData.diskon <= 0) {
      alert("Nominal diskon harus lebih besar dari Rp 0");
      return;
    }

    try {
      await api.put(`/voucher/${id}`, {
        kode_voucher: formData.kode,
        nominal_diskon: formData.diskon,
        kuota: formData.kuota,
        batas_waktu: formData.tanggalKadaluarsa,
      });
      alert("Kupon berhasil diupdate");
      navigate("/admin/promosi-kupon");
    } catch (error) {
      console.error("Gagal mengupdate kupon:", error);
      alert(error.response?.data?.message || "Gagal mengupdate kupon");
    }
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
          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <div className="grid grid-cols-[250px_1fr] gap-y-6 items-center">
              {/* ID */}
              <label className="font-semibold">
                ID Kupon
              </label>

              <input
                type="text"
                value={formData.id}
                disabled
                className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 opacity-60"
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
                className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2 uppercase"
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

              <div className="flex items-center bg-primary-100 border border-primary-200 rounded-lg overflow-hidden w-64 justify-between">
                <button
                  type="button"
                  onClick={kurangKuota}
                  className="px-4 py-2 text-xl font-bold hover:bg-gray-200"
                >
                  -
                </button>

                <input
                  type="number"
                  name="kuota"
                  value={formData.kuota}
                  onChange={handleChange}
                  className="flex-1 text-center bg-transparent border-none outline-none font-bold"
                />

                <button
                  type="button"
                  onClick={tambahKuota}
                  className="px-4 py-2 text-xl font-bold hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              {/* NOMINAL DISKON */}
              <label className="font-semibold">
                Masukkan Potongan Nominal (Rupiah)
              </label>

              <div className="flex items-center bg-primary-100 border border-primary-200 rounded-lg overflow-hidden w-64">
                <span className="pl-4 font-bold text-gray-500">Rp</span>
                <input
                  type="number"
                  name="diskon"
                  value={formData.diskon}
                  onChange={handleChange}
                  placeholder="0"
                  className="flex-1 px-3 py-2 bg-transparent outline-none font-bold"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}