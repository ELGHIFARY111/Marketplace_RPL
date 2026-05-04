import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    password: "",
    no_telp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);
      const { token, user } = res.data;

      // Auto-login setelah registrasi
      login(user, token);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Terjadi kesalahan saat registrasi";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-medium">Registrasi</h1>
          <p className="text-gray-500 text-sm">
            Masukkan Detail Anda Dibawah
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-500">Masukkan Username</label>
            <input 
              name="nama_lengkap"
              value={formData.nama_lengkap}
              onChange={handleChange}
              className="w-full border-b-2 border-black bg-transparent py-1 outline-none" 
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-black bg-transparent py-1 outline-none" 
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b-2 border-black bg-transparent py-1 outline-none" 
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Nomor Telepon</label>
            <input 
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              className="w-full border-b-2 border-black bg-transparent py-1 outline-none" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#b89578] text-white py-3 rounded-full mt-6 hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Registrasi"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Sudah punya akun ?{" "}
            <button 
              type="button"
              onClick={() => navigate("/auth/login")} 
              className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition"
            >
              Masuk disini
            </button>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
}