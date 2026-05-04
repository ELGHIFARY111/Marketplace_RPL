import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute - Hanya bisa diakses jika sudah login.
 * Jika belum login, redirect ke halaman login.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

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

  return children;
}
