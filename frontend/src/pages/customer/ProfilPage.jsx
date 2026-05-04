import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile(res.data);
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e5e5e5] text-black">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Memuat profil...</p>
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
              <div className="mb-14 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-gray-100">
                    <User size={48} className="text-gray-600" />
                  </div>

                  <h2 className="text-3xl font-serif">{profile?.nama_lengkap || "Nama Pengguna"}</h2>
                </div>

                <button
                  onClick={() => navigate("/profil/edit")}
                  className="flex items-center gap-2 font-serif font-bold hover:text-[#b89578] transition"
                >
                  <Edit size={20} />
                  Edit Profil
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-14 gap-y-16">
                <div>
                  <label className="mb-2 block font-serif font-bold">Nama</label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    {profile?.nama_lengkap || "-"}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">Kata Sandi</label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    ********
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">Email</label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    {profile?.email || "-"}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">No Telepon</label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    {profile?.no_telp || "-"}
                  </div>
                </div>
              </div>

              <div className="mt-20 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-serif font-bold hover:text-red-500 transition"
                >
                  <LogOut size={22} className="fill-black hover:fill-red-500" />
                  Keluar
                </button>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}