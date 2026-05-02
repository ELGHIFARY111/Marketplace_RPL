import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditProfilPage() {
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
              <div className="mb-14 flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black">
                  <User size={48} />
                </div>

                <h2 className="text-3xl font-serif">Arik Setiawan</h2>
              </div>

              <div className="grid grid-cols-2 gap-x-14 gap-y-16">
                <div>
                  <label className="mb-2 block font-serif font-bold">Nama</label>
                  <input
                    defaultValue="Arik Setiawan"
                    className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    defaultValue="password"
                    className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">Email</label>
                  <input
                    defaultValue="arikgaming123@gmail.com"
                    className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    No Telepon
                  </label>
                  <input
                    defaultValue="0895319052345"
                    className="w-full rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold outline-none"
                  />
                </div>
              </div>

              <div className="mt-20 flex justify-center">
               <button
                onClick={() => navigate("/profil")}
                className="rounded-md bg-[#b89578] px-16 py-3 font-serif font-bold text-white hover:bg-[#a47f63] transition"
                >
                Simpan
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