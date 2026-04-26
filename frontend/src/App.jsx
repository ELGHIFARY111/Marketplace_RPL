import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import KatalogPage from './pages/customer/KatalogPage';
import DetailProdukPage from './pages/customer/DetailProdukPage';
import PromoPage from './pages/customer/PromoPage';
import KeranjangPage from './pages/customer/KeranjangPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import DetailPesananPage from './pages/customer/DetailPesananPage';
import RiwayatPembelianPage from './pages/customer/RiwayatPembelianPage';
import ProfilPage from './pages/customer/ProfilPage';
import HubungiCSPage from './pages/customer/HubungiCSPage';
import TentangKamiPage from './pages/customer/TentangKamiPage';
import LokasPage from './pages/customer/LokasiPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import AdminProfilPage from './pages/admin/AdminProfilPage';
import ProdukListPage from './pages/admin/produk/ProdukListPage';
import ProdukDetailPage from './pages/admin/produk/ProdukDetailPage';
import ProdukTambahPage from './pages/admin/produk/ProdukTambahPage';
import ProdukEditPage from './pages/admin/produk/ProdukEditPage';
import VarianDetailPage from './pages/admin/produk/VarianDetailPage';
import VarianTambahPage from './pages/admin/produk/VarianTambahPage';
import VarianEditPage from './pages/admin/produk/VarianEditPage';
import PesananListPage from './pages/admin/pesanan/PesananListPage';
import PesananDetailPage from './pages/admin/pesanan/PesananDetailPage';
import UpdateStatusPage from './pages/admin/pesanan/UpdateStatusPage';
import PromoListPage from './pages/admin/promosi/PromoListPage';
import PromoTambahPage from './pages/admin/promosi/PromoTambahPage';
import PromoEditPage from './pages/admin/promosi/PromoEditPage';
import KuponListPage from './pages/admin/promosi/KuponListPage';
import KuponTambahPage from './pages/admin/promosi/KuponTambahPage';
import KuponEditPage from './pages/admin/promosi/KuponEditPage';
import AkunListPage from './pages/admin/akun/AkunListPage';
import AkunTambahPage from './pages/admin/akun/AkunTambahPage';
import AkunEditPage from './pages/admin/akun/AkunEditPage';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();
  if (!token) return <Navigate to="/login" />;
  if (user?.level_akses !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/register"       element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Customer */}
        <Route element={<CustomerLayout />}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/produk"        element={<KatalogPage />} />
          <Route path="/produk/:id"    element={<DetailProdukPage />} />
          <Route path="/promo"         element={<PromoPage />} />
          <Route path="/tentang-kami"  element={<TentangKamiPage />} />
          <Route path="/lokasi"        element={<LokasPage />} />
          <Route path="/hubungi-cs"    element={<PrivateRoute><HubungiCSPage /></PrivateRoute>} />
          <Route path="/keranjang"     element={<PrivateRoute><KeranjangPage /></PrivateRoute>} />
          <Route path="/checkout"      element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/pesanan/:id"   element={<PrivateRoute><DetailPesananPage /></PrivateRoute>} />
          <Route path="/riwayat"       element={<PrivateRoute><RiwayatPembelianPage /></PrivateRoute>} />
          <Route path="/profil"        element={<PrivateRoute><ProfilPage /></PrivateRoute>} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index                          element={<DashboardPage />} />
          <Route path="profil"                  element={<AdminProfilPage />} />
          <Route path="produk"                  element={<ProdukListPage />} />
          <Route path="produk/tambah"           element={<ProdukTambahPage />} />
          <Route path="produk/:id"              element={<ProdukDetailPage />} />
          <Route path="produk/:id/edit"         element={<ProdukEditPage />} />
          <Route path="produk/:id/varian/tambah" element={<VarianTambahPage />} />
          <Route path="produk/:id/varian/:vid"  element={<VarianDetailPage />} />
          <Route path="produk/:id/varian/:vid/edit" element={<VarianEditPage />} />
          <Route path="pesanan"                 element={<PesananListPage />} />
          <Route path="pesanan/update-status"   element={<UpdateStatusPage />} />
          <Route path="pesanan/:id"             element={<PesananDetailPage />} />
          <Route path="promosi/promo"           element={<PromoListPage />} />
          <Route path="promosi/promo/tambah"    element={<PromoTambahPage />} />
          <Route path="promosi/promo/:id/edit"  element={<PromoEditPage />} />
          <Route path="promosi/kupon"           element={<KuponListPage />} />
          <Route path="promosi/kupon/tambah"    element={<KuponTambahPage />} />
          <Route path="promosi/kupon/:id/edit"  element={<KuponEditPage />} />
          <Route path="akun"                    element={<AkunListPage />} />
          <Route path="akun/tambah"             element={<AkunTambahPage />} />
          <Route path="akun/:id/edit"           element={<AkunEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
