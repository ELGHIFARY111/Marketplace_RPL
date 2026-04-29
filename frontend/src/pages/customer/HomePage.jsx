import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Search, ChevronDown, Star, ArrowRight } from "lucide-react";

const products = [
  {
    name: "baju baru",
    image: "/kemeja.png",
    price: "Rp. 179.000",
    oldPrice: "Rp. 210.000",
    discount: "Diskon 35%",
    sold: "1217 x Terjual",
  },
  {
    name: "Kaos Cap 3 kusing",
    image: "/kaos.png",
    price: "Rp. 149.000",
    oldPrice: "Rp. 230.000",
    discount: "Diskon 45%",
    sold: "5827 x Terjual",
  },
  {
    name: "Sweater Bergaris",
    image: "/sweater.png",
    price: "Rp. 165.000",
    oldPrice: "Rp. 330.000",
    discount: "Diskon 50%",
    sold: "438 x Terjual",
  },
  {
    name: "Jeans Perempuan",
    image: "/jeans.png",
    price: "Rp. 149.000",
    oldPrice: "Rp. 230.000",
    discount: "Diskon 45%",
    sold: "217 x Terjual",
  },
];

const dropdownData = {
  kategori: ["Kaos", "Kemeja", "Celana", "Jaket", "Sweater"],
  ukuran: ["XS", "S", "M", "L", "XL", "XXL"],
  warna: ["Hitam", "Putih", "Coklat", "Biru", "Pink", "Abu-abu"],
  urutkan: ["Terbaru", "Populer"],
};

export default function HomePage() {
  const navigate = useNavigate();
  const productList = Array(4).fill(products).flat();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black">
      <Navbar />

      <section id="hero" className="relative h-[520px] overflow-hidden">
        <img
          src="/kaosabu.png"
          alt="Kaos"
          className="absolute left-10 -bottom-32 w-[260px] rotate-[30deg]"
        />
        <img
          src="/kaos.png"
          alt="kemeja"
          className="absolute -left-20 -bottom-12 w-[250px] ml-50 rotate-[15deg]"
        />

        <div className="absolute left-[190px] top-[170px] text-center">
          <h1 className="text-4xl font-bold text-[#5a3d42] drop-shadow-md">
            Fashion For Life
          </h1>
          <p className="text-2xl mt-4 leading-snug">
            Zenvy Selalu ada untuk memenuhi <br />
            fashion anda
          </p>
        </div>

        <div className="absolute right-16 bottom-0 w-[760px] h-[420px] pb-8">
          <img
            src="/kemeja.png"
            alt="Kemeja"
            className="absolute bottom-0 right-72 w-[260px] z-20"
          />

          <img
            src="/kemeja-putih.png"
            alt="Kemeja Putih"
            className="absolute bottom-0 right-12 w-[300px] z-10"
          />

          <img
            src="/jaket.png"
            alt="Jaket"
            className="absolute -bottom-[52px] -right-60 w-[500px] z-0"
          />
        </div>
      </section>

      <section id="produk" className="bg-white px-16 py-6 scroll-mt-20">
        <div className="mx-auto flex max-w-3xl items-center rounded-full border border-gray-300 bg-[#f3efe9] px-6 py-3">
          <input
            placeholder="Masukkan Pencarian ..."
            className="flex-1 bg-transparent outline-none"
          />
          <Search size={28} />
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div className="flex items-center gap-8">
            <span>Filter Dengan</span>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("kategori")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Categori <ChevronDown size={18} />
              </button>

              {openDropdown === "kategori" && (
                <div className="absolute left-0 top-8 z-40 w-40 rounded-xl border bg-white p-3 shadow-lg">
                  {dropdownData.kategori.map((item) => (
                    <button
                      key={item}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f3efe9]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("ukuran")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Ukuran <ChevronDown size={18} />
              </button>

              {openDropdown === "ukuran" && (
                <div className="absolute left-0 top-8 z-40 w-32 rounded-xl border bg-white p-3 shadow-lg">
                  {dropdownData.ukuran.map((item) => (
                    <button
                      key={item}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f3efe9]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("harga")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Harga <ChevronDown size={18} />
              </button>

              {openDropdown === "harga" && (
                <div className="absolute left-0 top-8 z-40 w-56 rounded-xl border bg-white p-4 shadow-lg">
                  <p className="mb-3 text-sm font-medium">Range Harga</p>

                  <input
                    type="number"
                    placeholder="Harga minimum"
                    className="mb-3 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#b89578]"
                  />

                  <input
                    type="number"
                    placeholder="Harga maksimum"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#b89578]"
                  />

                  <button className="mt-4 w-full rounded-lg bg-[#b89578] py-2 text-sm text-white hover:bg-[#a47f63] transition">
                    Terapkan
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("warna")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Warna <ChevronDown size={18} />
              </button>

              {openDropdown === "warna" && (
                <div className="absolute left-0 top-8 z-40 w-40 rounded-xl border bg-white p-3 shadow-lg">
                  {dropdownData.warna.map((item) => (
                    <button
                      key={item}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f3efe9]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("urutkan")}
              className="flex items-center gap-2 rounded-full bg-[#f3efe9] px-7 py-3 hover:bg-[#e7e1d9] transition"
            >
              Urutkan <ChevronDown size={18} />
            </button>

            {openDropdown === "urutkan" && (
              <div className="absolute right-0 top-14 z-40 w-36 rounded-xl border bg-white p-3 shadow-lg">
                {dropdownData.urutkan.map((item) => (
                  <button
                    key={item}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#f3efe9]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-24 py-8">
        <div className="grid grid-cols-4 gap-x-10 gap-y-8">
          {productList.map((product, index) => (
            <div
              key={index}
              onClick={() => navigate("/produk/detail")}
              className="overflow-hidden rounded-t-[28px] border border-gray-300 bg-[#f7f7f7] transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              <div className="px-6 pt-3 flex gap-3">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-[#7b6a58]"></span>
                <span className="h-3 w-3 rounded-full bg-black"></span>
                <span className="h-3 w-3 rounded-full bg-orange-400"></span>
              </div>

              <div className="flex h-[220px] items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[190px] object-contain"
                />
              </div>

              <div className="bg-white px-3 py-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">{product.price}</span>
                  <span className="text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded bg-black px-2 py-1 text-xs text-white">
                    {product.discount}
                  </span>
                  <span className="rounded bg-black px-2 py-1 text-xs text-white">
                    23:59
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span>4.9</span>
                  <span>|</span>
                  <span>{product.sold}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center items-center gap-5">
          {[1, 2, 3, 12].map((num) => (
            <button
              key={num}
              className={`h-10 w-10 rounded-full ${
                num === 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}

          <button>
            <ArrowRight size={36} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}