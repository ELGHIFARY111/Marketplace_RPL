// Customer Layout Template
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CustomerLayout.css';

export default function CustomerLayout({ children }) {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
