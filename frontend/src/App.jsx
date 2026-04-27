import { BrowserRouter, Routes, Route } from "react-router-dom";

{/* Auth */}
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

{/* User */}
import HomePage from "./pages/customer/HomePage";

{/* Admin */}
import DashboardPage from "./pages/admin/DashboardPage";
import AdminProfilPage from "./pages/admin/AdminProfilPage";


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

        {/* Admin */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/profil" element={<AdminProfilPage />} />
        <Route path="/admin/produk-dan-stok" element={<DashboardPage />} />
        <Route path="/admin/pesanan" element={<DashboardPage />} />
        <Route path="/admin/promosi-kupon" element={<DashboardPage />} />
        <Route path="/admin/promosi-diskon" element={<DashboardPage />} />
        <Route path="/admin/akun-dan-akses" element={<DashboardPage />} />
        <Route path="/admin/cs" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}