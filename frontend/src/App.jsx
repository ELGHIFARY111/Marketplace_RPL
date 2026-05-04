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

{/* Route Guards */}
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";


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
        {/* User Protected */}
        <Route path="/keranjang" element={<ProtectedRoute><KeranjangPage /></ProtectedRoute>} />
        <Route path="/profil" element={<ProtectedRoute><ProfilPage /></ProtectedRoute>} />
        <Route path="/profil/edit" element={<ProtectedRoute><EditProfilPage /></ProtectedRoute>} />
        <Route path="/pesanan" element={<ProtectedRoute><RiwayatPembelianPage /></ProtectedRoute>} />
        <Route path="/pesanan/detail" element={<ProtectedRoute><DetailPesananPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        


        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/admin/profil" element={<AdminRoute><AdminProfilPage /></AdminRoute>} />
        <Route path="/admin/produk-dan-stok" element={<AdminRoute><ProdukListPage /></AdminRoute>} />
        <Route path="/admin/produk-dan-stok/detail/:id" element={<AdminRoute><ProdukDetailPage /></AdminRoute>} />
        <Route path="/admin/produk-dan-stok/edit/:id" element={<AdminRoute><ProdukFormPage /></AdminRoute>} />
        <Route path="/admin/produk-dan-stok/tambah" element={<AdminRoute><ProdukFormPage /></AdminRoute>} />
        <Route path="/admin/varian/tambah/:productId" element={<AdminRoute><VarianFormPage /></AdminRoute>} />
        <Route path="/admin/varian/edit/:id" element={<AdminRoute><VarianFormPage /></AdminRoute>} />
        <Route path="/admin/varian/detail/:id" element={<AdminRoute><VarianDetailPage /></AdminRoute>} />
        <Route path="/admin/pesanan" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/admin/promosi-kupon" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/admin/promosi-diskon" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/admin/akun-dan-akses" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/admin/cs" element={<AdminRoute><DashboardPage /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}