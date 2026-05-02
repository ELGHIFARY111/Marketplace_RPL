import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailProdukPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const colors = [
    { name: "putih", className: "bg-white border border-gray-400" },
    { name: "coklat", className: "bg-[#8a7662]" },
    { name: "hitam", className: "bg-black" },
    { name: "orange", className: "bg-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black">
      <Navbar />

      <main className="px-20 py-14">
        <div className="grid grid-cols-2 gap-16">
          {/* LEFT IMAGE */}
          <section>
            <div className="flex h-[480px] items-center justify-center rounded-3xl bg-[#dedede]">
              <img
                src="/kaos.png"
                alt="Kaos Cap 3 Kucing"
                className="max-h-[420px] object-contain"
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex h-32 items-center justify-center rounded-xl bg-[#dedede]"
                >
                  <img
                    src="/kaos.png"
                    alt="Thumbnail"
                    className="max-h-28 object-contain"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT DETAIL */}
          <section className="pt-14">
            <h1 className="text-5xl font-serif leading-tight">
              Kaos Cap 3 Kucing
            </h1>

            <p className="text-sm text-gray-500">terjual 130</p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4].map((item) => (
                  <Star
                    key={item}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star size={18} className="text-yellow-400" />
              </div>

              <span className="text-sm">4.9</span>
              <span className="text-sm text-gray-500">57 Ulasan</span>
            </div>

            <div className="mt-3 flex items-end gap-4">
              <h2 className="text-4xl font-bold font-serif">
                Rp. 149.000.00
              </h2>
              <span className="pb-1 text-xs text-gray-400 line-through">
                Rp. 230.000
              </span>
            </div>

            {/* WARNA */}
            <div className="mt-5">
              <p className="text-sm">Warna</p>

              <div className="mt-2 flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color.name ? null : color.name
                      )
                    }
                    className={`h-6 w-6 rounded-full transition-all duration-200 ${color.className} ${
                      selectedColor === color.name
                        ? "scale-125 ring-2 ring-black ring-offset-2"
                        : "hover:scale-110"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* UKURAN */}
            <div className="mt-6">
              <p className="text-sm">Ukuran</p>

              <div className="mt-3 flex gap-5 ">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(selectedSize === size ? null : size)
                    }
                    className={`h-8 min-w-12 border border-black px-4 font-serif transition duration-300 cursor-pointer
                    ${
                      selectedSize === size
                        ? "bg-black text-white shadow-lg -translate-y-1"
                        : "hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-xl"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => navigate("/checkout")}
              className="w-[340px] rounded-xl bg-black py-3 text-xl font-serif font-bold text-white hover:bg-[#b89578] transition"
            >
              Checkout
            </button> 

              <button className="flex h-12 w-20 items-center justify-center rounded-xl bg-[#e7e1d9] hover:bg-[#d5c7ba] transition">
                <ShoppingCart size={28} />
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}