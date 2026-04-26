// Admin Layout Template
import AdminSidebar from '../components/AdminSidebar';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}
