import {
  Search,
  ShoppingCart,
  ClipboardList,
  User,
  ChevronDown,
  Star,
  ArrowRight,
} from "lucide-react";

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

export default function HomePage() {
  const productList = Array(4).fill(products).flat();

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 h-20 flex items-center justify-between px-16 bg-[#f3efe9] shadow-sm">
        {/* LEFT (Logo + Menu) */}
        <div className="flex items-center gap-16">
          <h1 className="text-4xl font-medium drop-shadow-md">Zenfy</h1>

          <div className="flex gap-8 text-gray-700">
            <button
              onClick={() => document.getElementById("hero").scrollIntoView({ behavior: "smooth" })}
              className="hover:text-black transition"
            >
              Beranda
            </button>

            <button
              onClick={() => document.getElementById("produk").scrollIntoView({ behavior: "smooth" })}
              className="hover:text-black transition"
            >
              Produk
            </button>

            <button
              onClick={() => document.getElementById("footer").scrollIntoView({ behavior: "smooth" })}
              className="hover:text-black transition"
            >
              Tentang Kami
            </button>
          </div>
        </div>

        {/* RIGHT (Icons) */}
        <div className="flex items-center gap-5">
          <Search size={26} className="cursor-pointer hover:scale-110 transition" />
          <ShoppingCart size={26} className="cursor-pointer hover:scale-110 transition" />
          <ClipboardList size={26} className="cursor-pointer hover:scale-110 transition" />
          <User size={26} className="cursor-pointer hover:scale-110 transition" />
        </div>

      </nav>

      {/* HERO */}
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
            className="absolute bottom-0 right-72 w-[260px] z-20"
          />

          <img
            src="/kemeja-putih.png"
            className="absolute bottom-0 right-12 w-[300px] z-10"
          />

          <img
            src="/jaket.png"
            className="absolute -bottom-13 -right-60 w-[500px] z-0"
          />
        </div>
      </section>

      {/* SEARCH */}
      <section id="produk" className="bg-white px-16 py-6 scroll-mt-20">
        <div className="mx-auto flex max-w-3xl items-center rounded-full border border-gray-300 bg-[#f3efe9] px-6 py-3">
          <input
            placeholder="Masukkan Pencarian ..."
            className="flex-1 bg-transparent outline-none"
          />
          <Search size={28} />
        </div>

        {/* FILTER */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span>Filter Dengan</span>

            {["Categori", "Ukuran", "Harga", "Warna"].map((item) => (
              <button
                key={item}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                {item}
                <ChevronDown size={18} />
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 rounded-full bg-[#f3efe9] px-7 py-3 hover:bg-[#e7e1d9] transition">
            Urutkan
            <ChevronDown size={18} />
          </button>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="bg-white px-24 py-8">
        <div className="grid grid-cols-4 gap-x-10 gap-y-8">
          {productList.map((product, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-t-[28px] border border-gray-300 bg-[#f7f7f7]"
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

        {/* PAGINATION */}
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

      {/* FOOTER */}
      <footer id="footer" className="mt-20 bg-[#e7e1d9] px-16 py-8">
        <div className="grid grid-cols-4 gap-10">
          <div>
            <h2 className="text-4xl font-medium drop-shadow-md">Zenfy</h2>
            <p className="mt-20 text-sm">All right reserved@2026</p>
          </div>

          <div className="border-l-4 border-gray-300 pl-10">
            <h3 className="font-semibold">Zenfy</h3>
            <p className="mt-2 text-sm">Tentang Kami</p>
            <p className="mt-2 text-sm">FAQ</p>
          </div>

          <div className="border-l-4 border-gray-300 pl-10">
            <h3 className="font-semibold">kontak</h3>
            <p className="mt-2 text-sm">+62 877-5866-8209</p>
            <p className="mt-2 text-sm">Zenfy.id</p>
          </div>

          <div className="border-l-4 border-gray-300 pl-10">
            <h3 className="font-semibold">Ikuti Kami di</h3>
            <p className="mt-2 text-sm">Instagram</p>
            <p className="mt-2 text-sm">Facebook</p>
            <p className="mt-2 text-sm">TikTok</p>
          </div>
        </div>
      </footer>
    </div>
  );
}