import AdminLayout from "../../layouts/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="dashboard-page">
        <h1>Admin Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Sales</h3>
            <p className="value">Rp 0</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Orders</h3>
            <p className="value">0</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Products</h3>
            <p className="value">0</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p className="value">0</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}