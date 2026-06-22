import { useState, useEffect } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({ password: "", konfirmasi: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Redirect jika tidak ada token di URL
  useEffect(() => {
    if (!token) {
      navigate("/auth/forgot-password");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      return setError("Password minimal 6 karakter.");
    }
    if (form.password !== form.konfirmasi) {
      return setError("Password dan konfirmasi password tidak cocok.");
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        token,
        password: form.password,
      });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Gagal mereset password. Link mungkin sudah kadaluarsa."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-medium">Reset Password</h1>
          <p className="text-gray-500 text-sm mt-2">
            Buat password baru untuk akun kamu
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-green-700 font-medium text-lg">✅ Password Berhasil Direset!</p>
              <p className="text-green-600 text-sm mt-2">
                Password kamu sudah diperbarui. Silakan login dengan password baru.
              </p>
            </div>
            <button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-[#b89578] text-white py-3 rounded-full text-xl font-serif hover:bg-[#a47f63] transition"
            >
              Login Sekarang
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-sm text-gray-500">
                Masukkan Password Baru
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Minimal 6 karakter"
                className="w-full border-b-2 border-black bg-transparent py-2 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                name="konfirmasi"
                value={form.konfirmasi}
                onChange={handleChange}
                required
                placeholder="Ulangi password baru"
                className="w-full border-b-2 border-black bg-transparent py-2 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b89578] text-white py-3 rounded-full text-2xl font-serif hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Password"}
            </button>

            <p className="text-center text-sm text-gray-500">
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition"
              >
                ← Kembali ke halaman Login
              </button>
            </p>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}