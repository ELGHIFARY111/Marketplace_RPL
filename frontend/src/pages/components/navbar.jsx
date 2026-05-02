import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, ClipboardList, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 h-20 flex items-center justify-between px-16 bg-[#f3efe9] shadow-sm">
      <div className="flex items-center gap-16">
        <h1
          onClick={() => navigate("/")}
          className="text-4xl font-medium drop-shadow-md cursor-pointer"
        >
          Zenfy
        </h1>

        <div className="flex gap-8 text-gray-700">
          
          {/* BERANDA */}
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("hero");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Beranda
          </button>

          {/* PRODUK */}
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("produk");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Produk
          </button>

          {/* TENTANG */}
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("footer");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Tentang Kami
          </button>

        </div>
      </div>

      <div className="flex items-center gap-5">
        <Search className="cursor-pointer hover:scale-110 transition" size={26} />

        <ShoppingCart
          onClick={() => navigate("/keranjang")}
          className="cursor-pointer hover:scale-110 transition"
          size={26}
        />

        <ClipboardList
          onClick={() => navigate("/pesanan")}
          className="cursor-pointer hover:scale-110 transition"
          size={26}
        />

        <User
          onClick={() => navigate("/profil")}
          className="cursor-pointer hover:scale-110 transition"
          size={26}
        />
      </div>
    </nav>
  );
}