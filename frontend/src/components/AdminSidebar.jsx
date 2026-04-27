import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const [isPromosiOpen, setIsPromosiOpen] = useState(false);
  const location = useLocation();

  const isPromosiActive = location.pathname.includes("promosi");

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? "bg-[#D9D9D9] font-bold" 
        : "hover:bg-[#D9D9D9] hover:font-semibold cursor-pointer hover:scale-105"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block pl-10 py-2 rounded-lg transition-all ${
      isActive 
        ? "text-black font-bold bg-[#F3F3F3]" 
        : "text-gray-600 hover:bg-[#F3F3F3] hover:text-black"
    }`;

  return (
    <aside className="w-60 h-[50rem] -ml-8 bg-white rounded-2xl p-5 shadow-sm">
      <ul className="space-y-2">
        <li><NavLink to="/admin" className={linkClass} end>Dashboard</NavLink></li>
        <li><NavLink to="/admin/profil" className={linkClass} end>Profil</NavLink></li>
        <li><NavLink to="/admin/produk-dan-stok" className={linkClass}>Produk dan Stok</NavLink></li>
        <li><NavLink to="/admin/pesanan" className={linkClass}>Pesanan</NavLink></li>

        {/* Parent Menu: Promosi */}
        <li>
          <button
            onClick={() => setIsPromosiOpen(!isPromosiOpen)}
            className={`w-full text-left px-4 py-2 rounded-lg flex justify-between items-center transition-all ${
              isPromosiActive ? "bg-[#E5E5E5] font-bold" : "hover:bg-[#D9D9D9]"
            }`}
          >
            Promosi
            <span className={`transform transition-transform ${isPromosiOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {/* Child Menu */}
          {isPromosiOpen && (
            <ul className="mt-1 space-y-1 ml-2 border-l-2 border-[#D9D9D9]">
              <li>
                <NavLink to="/admin/promosi-kupon" className={subLinkClass}>
                  Kupon
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/promosi-diskon" className={subLinkClass}>
                  Diskon
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li><NavLink to="/admin/akun-dan-akses" className={linkClass}>Akun dan Akses</NavLink></li>
        <li><NavLink to="/admin/cs" className={linkClass}>Customer Service</NavLink></li>
      </ul>
    </aside>
  );
}