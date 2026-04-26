import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, ShoppingCart, FileText, User } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin/profil', label: 'Profil' },
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/produk', label: 'Produk dan Stok' },
    { to: '/admin/pesanan', label: 'Pesanan' },
    { to: '/admin/promosi/promo', label: 'Promosi' },
    { to: '/admin/akun', label: 'Akun dan Akses' },
  ];

  return (
    <div className="admin-layout">
      {/* Top Navbar matching the mockup */}
      <nav className="navbar container">
        <Link to="/" className="navbar-logo">Zenvy</Link>
        <ul className="navbar-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/produk">Produk</Link></li>
          <li><Link to="/tentang-kami">Tentang Kami</Link></li>
        </ul>
        <div className="navbar-actions">
          <button className="icon-btn" title="Cari"><Search size={22} strokeWidth={1.5} /></button>
          <Link to="/keranjang" className="icon-btn" title="Keranjang"><ShoppingCart size={22} strokeWidth={1.5} /></Link>
          <Link to="/riwayat" className="icon-btn" title="Pesanan"><FileText size={22} strokeWidth={1.5} /></Link>
          <Link to="/profil" className="icon-btn" title="Profil"><User size={22} strokeWidth={1.5} /></Link>
        </div>
      </nav>

      <div className="admin-body container">
        <aside className="admin-sidebar">
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
