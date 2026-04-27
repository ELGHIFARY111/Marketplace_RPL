import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ClipboardList,
  User,
  ChevronDown,
  Star,
  ArrowRight,
} from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f3efe9]">

      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#f3efe9]">
        <h1 className="text-2xl font-bold">Zenvy</h1>

        <nav className="space-x-6">
          <span className="cursor-pointer">Beranda</span>
          <span className="cursor-pointer">Produk</span>
          <span className="cursor-pointer">Tentang Kami</span>
        </nav>

        <div className="flex gap-4 text-xl">
          <Search size={26} className="cursor-pointer hover:scale-110 transition" />
          <User size={26} className="cursor-pointer hover:scale-110 transition" onClick={() => navigate("/admin/profil")}/>
          
        </div>
      </header>

      {/* Layout */}
      <div className="flex p-5 gap-5">
        <AdminSidebar />

        <main className="flex-1 bg-white rounded-2xl p-6">
          {children}
        </main>
      </div>
    </div>
  );
}