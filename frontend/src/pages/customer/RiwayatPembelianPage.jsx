import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    code: "psn-9012740",
    subtotal: "Rp. 149.000.00",
    status: "Menunggu Bayar",
  },
  {
    code: "psn-9012740",
    subtotal: "Rp. 149.000.00",
    status: "Menunggu Bayar",
  },
  {
    code: "psn-9012740",
    subtotal: "Rp. 149.000.00",
    status: "Menunggu Bayar",
  },
  {
    code: "psn-9012740",
    subtotal: "Rp. 149.000.00",
    status: "Menunggu Bayar",
  },
  {
    code: "psn-9012740",
    subtotal: "Rp. 149.000.00",
    status: "Menunggu Bayar",
  },
];

export default function RiwayatPembelianPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="mx-auto max-w-7xl bg-[#f3efe9]">
        <Navbar />

        <main className="px-20 py-10">
          <div className="mb-4 flex items-center gap-4">
            <h1 className="text-4xl font-serif">Pesanan</h1>
            <ClipboardList size={28} />
          </div>

          <section className="rounded-lg bg-white px-6 py-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th className="pb-8 text-center font-serif text-lg">
                    Kode Pesanan
                  </th>
                  <th className="pb-8 text-center font-serif text-lg">
                    Subtotal
                  </th>
                  <th className="pb-8 text-center font-serif text-lg">
                    Status
                  </th>
                  <th className="pb-8 text-center font-serif text-lg">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 last:border-b-0"
                  >
                    <td className="py-6 text-center font-serif text-lg">
                      {order.code}
                    </td>

                    <td className="py-6 text-center font-serif text-lg">
                      {order.subtotal}
                    </td>

                    <td className="py-6 text-center font-serif text-lg">
                      {order.status}
                    </td>

                    <td className="py-6 text-center">
                      <button
                        onClick={() => navigate("/pesanan/detail")}
                        className="rounded-md bg-black px-5 py-2 font-serif text-lg text-white transition hover:bg-[#b89578] hover:-translate-y-1 hover:shadow-lg"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}