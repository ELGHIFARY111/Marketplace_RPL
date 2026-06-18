import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PageLoader } from './Loading';


export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <PageLoader message="Memeriksa akses..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.level !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
