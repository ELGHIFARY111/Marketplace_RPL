import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Search, ShoppingCart, FileText, User } from 'lucide-react';
import './CustomerLayout.css';

const CustomerLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="customer-layout">
      <nav className="navbar container">
        <Link to="/" className="navbar-logo">Zenvy</Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Beranda</Link></li>
          <li><Link to="/produk" onClick={() => setMenuOpen(false)}>Produk</Link></li>
          <li><Link to="/tentang-kami" onClick={() => setMenuOpen(false)}>Tentang Kami</Link></li>
        </ul>

        <div className="navbar-actions">
          <button className="icon-btn" title="Cari"><Search size={22} strokeWidth={1.5} /></button>
          <Link to="/keranjang" className="icon-btn" title="Keranjang"><ShoppingCart size={22} strokeWidth={1.5} /></Link>
          <Link to="/riwayat" className="icon-btn" title="Pesanan"><FileText size={22} strokeWidth={1.5} /></Link>
          <Link to={user ? "/profil" : "/login"} className="icon-btn" title={user ? "Profil" : "Masuk"}><User size={22} strokeWidth={1.5} /></Link>
        </div>
      </nav>

      <main className="main-content container">
        <Outlet />
      </main>

      <footer className="footer container">
        <div className="footer-inner">
          <div className="footer-brand">
            <h2 className="footer-logo">Zenvy</h2>
            <p className="footer-copyright">All right reserved@2026</p>
          </div>
          <div className="footer-links">
            <h4>Zenvy</h4>
            <Link to="/tentang-kami">Tentang Kami</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-contact">
            <h4>kontak</h4>
            <p>+62 877-5866-8209</p>
            <p>Zenvy.id</p>
          </div>
          <div className="footer-social">
            <h4>Ikuti Kami di</h4>
            <div className="social-icons">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
