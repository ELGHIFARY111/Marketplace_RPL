import AuthLayout from "../components/AuthLayout";

export default function Login({ setPage }) {
  return (
    <AuthLayout>
      <div className="w-full max-w-xl">
        
        <div className="text-center mb-20">
          <h1 className="text-6xl font-medium">Masuk</h1>
          <p className="text-gray-500 mt-3">
            Masukkan Detail Anda Dibawah
          </p>
        </div>

        <div className="space-y-8">
          
          <div>
            <label className="text-gray-500">Masukkan Email</label>
            <input className="w-full border-b-2 border-black bg-transparent py-2 outline-none" />
          </div>

          <div>
            <label className="text-gray-500">Masukkan Password</label>
            <input type="password" className="w-full border-b-2 border-black bg-transparent py-2 outline-none" />

            <p className="text-sm text-gray-500 mt-2">
                Lupa kata sandi?{" "}
                <button
                    onClick={() => setPage("forgot-password")}
                    className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition"
                >
                    Klik disini
                </button>
            </p>
          </div>

          <button 
            onClick={() => setPage("homepage")} className="w-full bg-[#b89578] text-white py-3 rounded-full hover:bg-[#a47f63] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer">
            Masuk
          </button>

          <p className="text-center text-sm text-gray-500">
            Belum punya akun ?{" "}
            <button onClick={() => setPage("register")} className="text-[#b89578] cursor-pointer hover:text-[#8f6b50] hover:underline transition">
              Registrasi disini
            </button>
          </p>

        </div>
      </div>
    </AuthLayout>
  );
}