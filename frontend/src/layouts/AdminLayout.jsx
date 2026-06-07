import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  User,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-[#f3efe9] ">

      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#f3efe9]">
        <h1 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          Zenvy
        </h1>

        <nav className="space-x-6">
          <span 
            className="cursor-pointer hover:text-green-700 transition"
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
            className="cursor-pointer hover:text-green-700 transition"
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
            className="cursor-pointer hover:text-green-700 transition"
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
          {/* Search */}
          {searchOpen ? (
            <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 shadow-sm transition-all">
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
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="hover:text-red-400 transition">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:scale-110 transition"
              title="Cari produk di katalog"
            >
              <Search size={26} />
            </button>
          )}

          <User size={26} className="cursor-pointer hover:scale-110 transition" onClick={() => navigate("/admin/profil")}/>
        </div>
      </header>

      {/* Layout */}
      <div className="flex p-5 gap-5">
        <AdminSidebar />

        <main className="flex-1 h-[50rem] overflow-y-auto bg-white rounded-2xl p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
