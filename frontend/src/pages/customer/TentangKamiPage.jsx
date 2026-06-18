import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TentangKamiPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-20 py-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-7xl font-serif font-bold mb-8 tracking-tight">Zenfy</h1>

          <div className="w-16 h-1 bg-[#b89578] rounded-full mx-auto mb-8" />

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Zenfy adalah brand fashion lokal Indonesia yang hadir untuk menghadirkan
            pakaian berkualitas tinggi dengan desain yang elegan dan harga yang terjangkau.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Kami percaya bahwa setiap orang berhak tampil percaya diri. Mulai dari
            kaos kasual hingga kemeja formal, setiap produk Zenfy dirancang dengan
            memperhatikan kenyamanan, ketahanan, dan estetika.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Berdiri sejak 2021, Zenfy terus tumbuh bersama kepercayaan pelanggan
            dari seluruh Indonesia. Terima kasih telah menjadi bagian dari perjalanan kami.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-12 rounded-full bg-black px-10 py-4 font-serif font-bold text-white hover:bg-[#b89578] transition"
          >
            Lihat Koleksi
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
