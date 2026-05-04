import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function EditProfilPage() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_telp: "",
    password: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setFormData({
          nama_lengkap: res.data.nama_lengkap || "",
          email: res.data.email || "",
          no_telp: res.data.no_telp || "",
          password: ""
        });
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/users/profile', formData);
      alert("Profil berhasil diperbarui");
      
      // Update local storage / context user object if necessary (name/phone changes)
      // Since context user has { id, nama, email, no_telp, level }
      const token = localStorage.getItem('token');
      const updatedUser = {
        ...user,
        nama: res.data.user.nama_lengkap,
        email: res.data.user.email,
        no_telp: res.data.user.no_telp
      };
      login(updatedUser, token); // ini akan mengupdate context
      
      navigate("/profil");
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || "Gagal memperbarui profil";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e5e5e5] text-black">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Memuat formulir...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="mx-auto max-w-7xl bg-[#f3efe9]">
        <Navbar />

        <main className="px-20 py-14">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <User size={42} className="fill-black" />
              <h1 className="text-4xl font-serif font-bold">Profil</h1>
            </div>

            <section className="rounded-[55px] bg-white px-20 py-10">
              <div className="mb-14 flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-gray-100">
                  <User size={48} className="text-gray-600" />
                </div>

                <h2 className="text-3xl font-serif">{formData.nama_lengkap || "Nama Pengguna"}</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-14 gap-y-16">
                  <div>
                    <label className="mb-2 block font-serif font-bold">Nama</label>
                    <input
                      name="nama_lengkap"
                      value={formData.nama_lengkap}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none focus:ring-2 focus:ring-[#b89578]"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-serif font-bold">Kata Sandi (Opsional)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Isi untuk mengubah password"
                      className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none focus:ring-2 focus:ring-[#b89578]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-serif font-bold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none focus:ring-2 focus:ring-[#b89578]"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-serif font-bold">No Telepon</label>
                    <input
                      type="tel"
                      name="no_telp"
                      value={formData.no_telp}
                      onChange={handleChange}
                      placeholder="Contoh: 08123456789"
                      className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none focus:ring-2 focus:ring-[#b89578]"
                    />
                  </div>
                </div>

                <div className="mt-20 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/profil")}
                    className="rounded-md bg-gray-400 px-10 py-3 font-serif font-bold text-white hover:bg-gray-500 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-md bg-[#b89578] px-16 py-3 font-serif font-bold text-white hover:bg-[#a47f63] transition disabled:opacity-50"
                  >
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}