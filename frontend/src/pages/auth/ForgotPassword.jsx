import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Gagal mengirim email. Coba beberapa saat lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-medium">Lupa Password ?</h1>
          <p className="text-gray-500 text-sm mt-2">
            Masukkan Email anda untuk reset password
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <p className="text-green-700 font-medium text-lg">📧 Email Terkirim!</p>
              <p className="text-green-600 text-sm mt-2">
                Jika email terdaftar, link reset password telah dikirim ke <strong>{email}</strong>.
                Periksa inbox atau folder spam kamu.
              </p>
            </div>
            <button
              onClick={() => navigate("/auth/login")}
              className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition text-sm"
            >
              ← Kembali ke halaman Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-500">Masukkan Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="contoh@email.com"
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
              className="w-full bg-[#b89578] text-white py-3 rounded-full text-2xl font-serif hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Mengirim..." : "Kirim"}
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