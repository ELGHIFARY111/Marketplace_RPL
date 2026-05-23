import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { User, LogOut, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function AdminProfile() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/admin/profile");
        setProfile(res.data);
      } catch (error) {
        console.error("Gagal memuat profil admin:", error);
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
      <AdminLayout>
        <p>Memuat profil...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <User size={42} />
            <h1 className="text-4xl font-bold">Profil Admin</h1>
          </div>

          <button
            onClick={() => navigate("/admin/profil/edit")}
            className="flex items-center gap-2 font-bold hover:text-[#b89578] transition"
          >
            <Edit size={20} />
            Edit Profil
          </button>
        </div>

        <section className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">Nama</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              {profile?.nama_lengkap || "-"}
            </div>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              {profile?.email || "-"}
            </div>
          </div>

          <div>
            <p className="font-semibold">No Telepon</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              {profile?.no_telp || "-"}
            </div>
          </div>

          <div>
            <p className="font-semibold">Role</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              {profile?.level_akses || "Admin"}
            </div>
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-bold hover:text-red-500 transition"
          >
            <LogOut size={22} />
            Keluar
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}