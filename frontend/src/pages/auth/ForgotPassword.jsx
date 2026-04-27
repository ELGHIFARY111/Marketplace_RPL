import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword({ setPage }) {
  return (
    <AuthLayout>
      <div className="w-full max-w-xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-medium">Lupa Password ?</h1>
          <p className="text-gray-500 text-sm mt-2">
            Masukkan Email anda untuk reset password
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-500">Masukkan Email</label>
            <input
              type="email"
              className="w-full border-b-2 border-black bg-transparent py-2 outline-none"
            />
          </div>

          <button
            onClick={() => setPage("reset-password")}
            className="w-full bg-[#b89578] text-white py-3 rounded-full text-2xl font-serif hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
          >
            Kirim
          </button>

          <p className="text-center text-sm text-gray-500">
            <button onClick={() => setPage("login")} className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition">
              ← Kembali Kehalaman Login
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}