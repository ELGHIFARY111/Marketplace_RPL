import { Search, ShoppingCart, ClipboardList, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-20 flex items-center justify-between px-16 bg-[#f3efe9] shadow-sm">
      <div className="flex items-center gap-16">
        <h1 className="text-4xl font-medium drop-shadow-md">Zenfy</h1>

        <div className="flex gap-8 text-gray-700">
          <button onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>
            Beranda
          </button>

          <button onClick={() => document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })}>
            Produk
          </button>

          <button onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}>
            Tentang Kami
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Search size={26} className="cursor-pointer hover:scale-110 transition" />
        <ShoppingCart size={26} className="cursor-pointer hover:scale-110 transition" />
        <ClipboardList size={26} className="cursor-pointer hover:scale-110 transition" />
        <User size={26} className="cursor-pointer hover:scale-110 transition" />
      </div>
    </nav>
  );
}