import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart } from "lucide-react";

const initialItems = [
  { id: 1, name: "Kaos Cap 3 Kucing", color: "White", size: "XL", price: 149000, qty: 1 },
  { id: 2, name: "Kaos Cap 3 Kucing", color: "White", size: "XL", price: 149000, qty: 1 },
  { id: 3, name: "Kaos Cap 3 Kucing", color: "White", size: "XL", price: 149000, qty: 1 },
];

export default function KeranjangPage() {
  const [items, setItems] = useState(initialItems);

  const formatRupiah = (value) => {
    return `Rp.${value.toLocaleString("id-ID")},00`;
  };

  const increaseQty = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = 14000;
  const tax = 7000;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="mx-auto max-w-7xl bg-[#f3efe9] min-h-screen flex flex-col">
        <Navbar />

        <main className="px-16 py-8 flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-serif">Keranjang</h1>
            <ShoppingCart size={28} />
          </div>

          <div className="grid grid-cols-[1.35fr_1fr] gap-10">
            {/* CART LIST */}
            <section className="rounded-lg bg-white px-5 py-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[110px_1fr_110px_60px] gap-4 border-b border-black py-5 last:border-b"
                >
                  <div className="flex h-28 w-28 items-center justify-center rounded-md bg-[#dedede]">
                    <img
                      src="/kaos.png"
                      alt={item.name}
                      className="max-h-24 object-contain"
                    />
                  </div>

                  <div className="pt-3">
                    <h2 className="text-xl font-serif">{item.name}</h2>
                    <p className="text-xs text-gray-500">
                      Color: {item.color} | Size: {item.size}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-xl font-bold font-serif">
                        {formatRupiah(item.price)}
                      </p>
                      <span className="text-xs text-gray-400 line-through">
                        Rp.230.000
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="h-5 w-5 bg-black text-white leading-none"
                    >
                      −
                    </button>
                    <span className="flex h-5 w-8 items-center justify-center text-sm">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="h-5 w-5 bg-black text-white leading-none"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-between py-2">
                    <input type="checkbox" className="h-3 w-3" />

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] text-gray-400 hover:text-red-500"
                    >
                      X Remove
                    </button>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="py-20 text-center text-gray-500">
                  Keranjang masih kosong.
                </div>
              )}

              <div className="min-h-[120px]" />
            </section>

            {/* SUMMARY */}
            <aside className="h-fit rounded-lg bg-white px-10 py-8">
              <h2 className="mb-4 text-xl font-serif">Pesanan Anda</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} barang)</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Biaya pengiriman</span>
                  <span>{formatRupiah(shipping)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Pajak</span>
                  <span>{formatRupiah(tax)}</span>
                </div>

                <div className="flex justify-between pt-6">
                  <span>Total Pembayaran</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              <button className="mt-14 w-full rounded-md bg-black py-3 text-white hover:bg-[#b89578] transition">
                BAYAR
              </button>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}