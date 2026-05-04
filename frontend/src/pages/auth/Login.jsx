import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Simpan ke AuthContext + localStorage
      login(user, token);

      // Redirect berdasarkan level akses
      if (user.level === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Terjadi kesalahan saat login";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl">
        
        <div className="text-center mb-20">
          <h1 className="text-6xl font-medium">Masuk</h1>
          <p className="text-gray-500 mt-3">
            Masukkan Detail Anda Dibawah
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-gray-500">Masukkan Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-black bg-transparent py-2 outline-none" 
              required
            />
          </div>

          <div>
            <label className="text-gray-500">Masukkan Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-black bg-transparent py-2 outline-none" 
              required
            />

            <p className="text-sm text-gray-500 mt-2">
                Lupa kata sandi?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/auth/forgot-password")}
                    className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition"
                >
                    Klik disini
                </button>
            </p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#b89578] text-white py-3 rounded-full hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Belum punya akun ?{" "}
            <button 
              type="button"
              onClick={() => navigate("/auth/register")} 
              className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition"
            >
              Registrasi disini
            </button>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
}