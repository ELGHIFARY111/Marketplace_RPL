import { BrowserRouter, Routes, Route } from "react-router-dom";

{/* Auth */}
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

{/* User */}
import HomePage from "./pages/customer/HomePage";
import DetailProdukPage from "./pages/customer/DetailProdukPage";
import KeranjangPage from "./pages/customer/KeranjangPage";
import ProfilPage from "./pages/customer/ProfilPage";
import EditProfilPage from "./pages/customer/EditProfilPage";
import RiwayatPembelianPage from "./pages/customer/RiwayatPembelianPage";
import DetailPesananPage from "./pages/customer/DetailPesananPage";
import CheckoutPage from "./pages/customer/CheckoutPage";

{/* Admin */}
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProfilPage from "./pages/admin/AdminProfilPage";
import ProdukListPage from "./pages/admin/produk/ProdukListPage";
import ProdukFormPage from "./pages/admin/produk/ProdukFormPage";
import ProdukDetailPage from "./pages/admin/produk/ProdukDetailPage";
import VarianFormPage from "./pages/admin/produk/VarianFormPage";
import VarianDetailPage from "./pages/admin/produk/VarianDetailPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

        {/* User */}
        <Route path="/" element={<HomePage />} />
        <Route path="/produk/detail/:id" element={<DetailProdukPage />} />
        <Route path="/keranjang" element={<KeranjangPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/profil/edit" element={<EditProfilPage />} />
        <Route path="/pesanan" element={<RiwayatPembelianPage />} />
        <Route path="/pesanan/detail" element={<DetailPesananPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        


        {/* Admin */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/profil" element={<AdminProfilPage />} />
        <Route path="/admin/produk-dan-stok" element={<ProdukListPage />} />
        <Route path="/admin/produk-dan-stok/detail/:id" element={<ProdukDetailPage />} />
        <Route path="/admin/produk-dan-stok/edit/:id" element={<ProdukFormPage />} />
        <Route path="/admin/produk-dan-stok/tambah" element={<ProdukFormPage />} />
        <Route path="/admin/varian/tambah/:productId" element={<VarianFormPage />} />
        <Route path="/admin/varian/edit/:id" element={<VarianFormPage />} />
        <Route path="/admin/varian/detail/:id" element={<VarianDetailPage />} />
        <Route path="/admin/pesanan" element={<DashboardPage />} />
        <Route path="/admin/promosi-kupon" element={<DashboardPage />} />
        <Route path="/admin/promosi-diskon" element={<DashboardPage />} />
        <Route path="/admin/akun-dan-akses" element={<DashboardPage />} />
        <Route path="/admin/cs" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}