import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilPage() {
  const navigate = useNavigate();
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
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black">
                    <User size={48} />
                  </div>

                  <h2 className="text-3xl font-serif">Arik Setiawan</h2>
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
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold">
                    Arik Setiawan
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    Kata Sandi
                  </label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold">
                    ********
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">Email</label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold">
                    arikgaming123@gmail.com
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    No Telepon
                  </label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold">
                    0895319052345
                  </div>
                </div>
              </div>

              <div className="mt-20 flex justify-end">
              <button
                onClick={() => navigate("/auth/login")}
                className="flex items-center gap-2 font-serif font-bold hover:text-red-500 transition"
              >
                <LogOut size={22} className="fill-black" />
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