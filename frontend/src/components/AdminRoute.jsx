import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * AdminRoute - Hanya bisa diakses oleh user dengan level "admin".
 * - Belum login → redirect ke login
 * - Login tapi bukan admin → redirect ke homepage
 */
export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3efe9]">
        <p className="text-gray-500 text-lg">Memuat...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.level !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
