import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, X, ClipboardList } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isHomePage = location.pathname === "/";

  // Di home page: scroll ke katalog & fokus input pencarian yang sudah ada
  // Di halaman lain: buka inline search → navigate ke /?search=...
  const handleSearchIconClick = () => {
    if (isHomePage) {
      const el = document.getElementById("produk");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.querySelector("#produk input");
        if (input) input.focus();
      }, 400);
    } else {
      setSearchOpen(true);
    }
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      navigate(`/?search=${encodeURIComponent(q)}`);
    } else {
      navigate("/#produk");
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
  };

  const handleProfilClick = () => {
    if (user && (user.level === "admin" || user.level === "superadmin")) {
      navigate("/admin/profil");
    } else {
      navigate("/profil");
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#f3efe9]/95 backdrop-blur-sm shadow-sm">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Zenvy
      </h1>

      <nav className="space-x-6">
        <span
          className="cursor-pointer hover:text-[#b89578] transition"
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const el = document.getElementById("hero");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Beranda
        </span>
        <span
          className="cursor-pointer hover:text-[#b89578] transition"
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const el = document.getElementById("produk");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Produk
        </span>
        <span
          className="cursor-pointer hover:text-[#b89578] transition"
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const el = document.getElementById("footer");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Tentang Kami
        </span>
      </nav>

      <div className="flex items-center gap-4">
        {/* Search — inline hanya di halaman selain home */}
        {searchOpen && !isHomePage ? (
          <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 shadow-sm">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cari produk..."
              className="w-44 bg-transparent text-sm outline-none"
            />
            <button onClick={handleSearch} className="hover:text-[#b89578] transition">
              <Search size={18} />
            </button>
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              className="hover:text-red-400 transition"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleSearchIconClick}
            className="hover:scale-110 transition"
            title={isHomePage ? "Cari di katalog" : "Cari produk"}
          >
            <Search size={26} />
          </button>
        )}

        {/* Keranjang */}
        <button
          onClick={() => navigate("/keranjang")}
          className="hover:scale-110 transition"
          title="Keranjang"
        >
          <ShoppingCart size={26} />
        </button>

        {/* Pesanan */}
        <button
          onClick={() => navigate("/pesanan")}
          className="hover:scale-110 transition"
          title="Riwayat Pesanan"
        >
          <ClipboardList size={26} />
        </button>

        {/* Profil */}
        <button
          onClick={handleProfilClick}
          className="hover:scale-110 transition"
          title="Profil"
        >
          <User size={26} />
        </button>
      </div>
    </header>
  );
}
