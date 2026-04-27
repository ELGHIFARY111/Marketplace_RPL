import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function register() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="w-full max-w-xl">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-medium">Registrasi</h1>
          <p className="text-gray-500 text-sm">
            Enter Your Detail Bellow
          </p>
        </div>

        <div className="space-y-3">

          <div>
            <label className="text-sm text-gray-500">Masukkan Username</label>
            <input className="w-full border-b-2 border-black bg-transparent py-1 outline-none" />
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Email</label>
            <input className="w-full border-b-2 border-black bg-transparent py-1 outline-none" />
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Password</label>
            <input type="password" className="w-full border-b-2 border-black bg-transparent py-1 outline-none" />
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Nomor Telepon</label>
            <div className="flex gap-3 items-end">
              <input className="flex-1 border-b-2 border-black bg-transparent py-1 outline-none" />
              <button className="bg-black text-white px-4 py-2 rounded">
                Kirim OTP
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Masukkan Kode OTP</label>
            <input className="w-full border-b-2 border-black bg-transparent py-1 outline-none" />
          </div>

          <button className="w-full bg-[#b89578] text-white py-3 rounded-full mt-6 hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer">
            Registrasi
          </button>

          <p className="text-center text-sm text-gray-500">
            Sudah punya akun ?{" "}
            <button onClick={() => navigate("login")} className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition">
              Masuk disini
            </button>
          </p>

        </div>
      </div>
    </AuthLayout>
  );
}