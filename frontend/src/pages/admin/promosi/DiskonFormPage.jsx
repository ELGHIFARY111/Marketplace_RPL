import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import PopupAlert from "../../../components/PopupAlert";
import useAlert from "../../../components/useAlert";

export default function DiskonFormPage() {
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [formData, setFormData] = useState({
    produk: "",
    tanggalKadaluarsa: "",
    diskon: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/produk");
        setProducts(res.data || []);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.produk) {
      showAlert("Silakan pilih produk terlebih dahulu", "warning");
      return;
    }

    if (!formData.tanggalKadaluarsa) {
      showAlert("Silakan tentukan tanggal kadaluarsa", "warning");
      return;
    }

    if (formData.diskon <= 0) {
      showAlert("Diskon harus lebih besar dari 0%", "warning");
      return;
    }

    try {
      await api.post("/promo", {
        id_produk: formData.produk,
        persentase_diskon: formData.diskon,
        batas_waktu: formData.tanggalKadaluarsa,
      });
      showAlert("Diskon berhasil ditambahkan", "success");
      navigate("/admin/promosi-diskon");
    } catch (error) {
      console.error("Gagal menambahkan diskon:", error);
      showAlert(error.response?.data?.message || "Gagal menambahkan diskon", "error");
    }
  };

  return (
    <AdminLayout>
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div>
        {/* HEADER */}
        <div className="flex items-end gap-2">
          <h1 className="text-[3rem] font-bold">
            Diskon
          </h1>

          <span className="text-lg font-semibold mb-2">
            Tambah
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
            {/* PRODUK */}
            <label className="font-semibold">
              Pilih Produk
            </label>

            {loadingProducts ? (
              <span className="text-gray-500">Memuat produk...</span>
            ) : (
              <select
                name="produk"
                value={formData.produk}
                onChange={handleChange}
                className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-2"
              >
                <option value="">-- Pilih Produk --</option>
                {products.map((p) => (
                  <option key={p.id_produk} value={p.id_produk}>
                    {p.nama} (Rp {p.harga?.toLocaleString("id-ID")})
                  </option>
                ))}
              </select>
            )}

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

            <div className="flex items-center bg-primary-100 border border-primary-200 rounded-lg overflow-hidden w-64 justify-between">
              <button
                type="button"
                onClick={kurangDiskon}
                className="px-4 py-2 text-xl font-bold hover:bg-gray-200"
              >
                -
              </button>

              <div className="flex-1 text-center font-bold">
                {formData.diskon}%
              </div>

              <button
                type="button"
                onClick={tambahDiskon}
                className="px-4 py-2 text-xl font-bold hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}