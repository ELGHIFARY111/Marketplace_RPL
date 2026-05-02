import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart } from "lucide-react";

export default function DetailPesananPage() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="mx-auto max-w-7xl bg-[#f3efe9]">
        <Navbar />

        <main className="px-20 py-10">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-serif">Detail Pesanan</h1>
            <ShoppingCart size={28} />
          </div>

          {/* DETAIL PESANAN */}
          <section className="rounded-md bg-white px-8 py-6">
            <div className="space-y-3 font-serif">
              <p>Id Pesanan : <span className="font-bold">psn-9012740</span></p>
              <p>Subtotal : <span className="font-bold">Rp. 149.000.00</span></p>
              <p>Status : <span className="font-bold">Belum Dibayar</span></p>
              <p>Metode Pembayaran : <span className="font-bold">Transfer Bank</span></p>
              <p>Nomor Rekening : <span className="font-bold">0123823402358y9</span></p>
            </div>

            <hr className="my-5 border-black" />

            <div className="font-serif">
              <p>Pesanan :</p>
              <ul className="ml-6 list-disc">
                <li>Kaos Cap 3 Kucing | 1</li>
              </ul>
            </div>
          </section>

          {/* FORM PEMBAYARAN */}
          <section className="mt-5 rounded-md bg-white px-8 py-6">
            <h2 className="mb-4 font-serif font-bold">
              Masukkan Bukti Transfer
            </h2>

            <form className="space-y-5">
              <div>
                <label className="mb-1 block font-serif">Nama Pengirim</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#b89578]"
                />
              </div>

              <div>
                <label className="mb-1 block font-serif">Bank Pengirim</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#b89578]"
                />
              </div>

              <div>
                <label className="mb-1 block font-serif">Jumlah Transfer</label>
                <input
                  type="number"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#b89578]"
                />
              </div>

              <div>
                <label className="mb-1 block font-serif">Bukti Transfer</label>
                <input type="file" />
              </div>

              <button
                type="button"
                className="w-full rounded-md bg-black py-3 text-white hover:bg-[#b89578] transition"
              >
                Kirim Verifikasi
              </button>
            </form>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}