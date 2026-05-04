import Navbar from "../components/Navbar";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="mx-auto max-w-7xl bg-[#f3efe9] min-h-screen flex flex-col">
        <Navbar />

        <main className="px-20 py-10 flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-serif">Checkout</h1>
            <ShoppingCart size={30} />
          </div>

          <div className="grid grid-cols-[1.4fr_1fr] gap-10">
            {/* FORM CHECKOUT */}
            <section className="rounded-lg bg-white px-5 py-5">
              <div className="space-y-10">
                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Alamat
                  </label>
                  <textarea
                    placeholder="Masukkan alamat anda ..."
                    className="h-40 w-full resize-none rounded-md bg-[#d9d9d9] px-4 py-4 font-serif outline-none placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Jasa Kirim
                  </label>

                  <div className="relative">
                    <select className="w-full appearance-none rounded-md bg-[#d9d9d9] px-4 py-4 font-serif text-gray-500 outline-none">
                      <option>Jasa pengiriman</option>
                      <option>JNE</option>
                      <option>J&T</option>
                      <option>SiCepat</option>
                      <option>AnterAja</option>
                    </select>

                    <ChevronDown
                      size={26}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Kupon Diskon
                  </label>

                  <div className="flex gap-3">
                    <input
                      placeholder="Masukkan Kupon anda..."
                      className="flex-1 rounded-md bg-[#d9d9d9] px-4 py-4 font-serif outline-none placeholder:text-gray-500"
                    />

                    <button className="rounded-md bg-black px-7 font-serif text-white hover:bg-[#b89578] transition">
                      Gunakan
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Metode Pembayaran
                  </label>

                  <div className="relative">
                    <select className="w-full appearance-none rounded-md bg-[#d9d9d9] px-4 py-4 font-serif text-gray-500 outline-none">
                      <option>Jasa pengiriman</option>
                      <option>Transfer Bank</option>
                      <option>COD</option>
                      <option>E-Wallet</option>
                    </select>

                    <ChevronDown
                      size={26}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SUMMARY */}
            <aside className="h-fit rounded-lg bg-white px-10 py-8">
              <h2 className="mb-4 text-xl font-serif">Pesanan Anda</h2>

              <div className="space-y-2 text-sm font-serif">
                <div className="flex justify-between">
                  <span>Subtotal (2 barang)</span>
                  <span>Rp.270.000,00</span>
                </div>

                <div className="flex justify-between">
                  <span>Biaya pengirim</span>
                  <span>Rp.14.000,00</span>
                </div>

                <div className="flex justify-between">
                  <span>Pajak</span>
                  <span>Rp.7.000,00</span>
                </div>

                <div className="flex justify-between pt-8">
                  <span>Total Pembayaran</span>
                  <span className="font-bold">Rp.291.000,00</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/pesanan/detail")}
                className="mt-16 w-full rounded-md bg-black py-3 font-serif text-white hover:bg-[#b89578] transition"
              >
                BAYAR
              </button>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}