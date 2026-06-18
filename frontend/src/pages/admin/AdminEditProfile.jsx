import AdminLayout from "../../layouts/AdminLayout";
import { User, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PopupAlert from "../../components/PopupAlert";
import useAlert from "../../components/useAlert";
import { SectionLoader } from "../../components/Loading";

export default function AdminEditProfile() {
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();

  const [form, setForm] = useState({
    nama_lengkap: "",
    email: "",
    no_telp: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/admin/profile");

        setForm({
          nama_lengkap: res.data.nama_lengkap || "",
          email: res.data.email || "",
          no_telp: res.data.no_telp || "",
          password: "",
        });
      } catch (error) {
        console.error("Gagal memuat profil admin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telp: form.no_telp,
      };

      if (form.password.trim() !== "") {
        payload.password = form.password;
      }

      await api.put("/admin/profile", payload);

      showAlert("Profil admin berhasil diperbarui", "success");
      navigate("/admin/profil");
    } catch (error) {
      console.error("Gagal update profil admin:", error);
      showAlert("Gagal memperbarui profil admin", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <SectionLoader message="Memuat data profil..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div>
        <div className="mb-6 flex items-center gap-4">
          <User size={42} />
          <h1 className="text-4xl font-bold">Edit Profil Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Nama</label>
              <input
                type="text"
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-[#F3EFEC] p-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-[#F3EFEC] p-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold">No Telepon</label>
              <input
                type="text"
                name="no_telp"
                value={form.no_telp}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-[#F3EFEC] p-3 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold">Password Baru</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Kosongkan jika tidak ingin mengubah"
                className="mt-1 w-full rounded-lg bg-[#F3EFEC] p-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-20 flex justify-center gap-4">
            <button
                type="button"
                onClick={() => navigate("/admin/profil")}
                className="w-[120px] rounded-md bg-gray-400 py-3 font-serif font-bold text-white hover:bg-gray-500 transition"
            >
                Batal
            </button>

            <button
                type="submit"
                disabled={saving}
                className="w-[180px] rounded-md bg-[#b89578] py-3 font-serif font-bold text-white hover:bg-[#a77f5e] transition disabled:opacity-60"
            >
                {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}