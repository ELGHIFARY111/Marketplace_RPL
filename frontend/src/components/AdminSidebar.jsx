// Admin Sidebar Component
export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/products">Products</a></li>
          <li><a href="/admin/orders">Orders</a></li>
          <li><a href="/admin/users">Users</a></li>
          <li><a href="/admin/categories">Categories</a></li>
        </ul>
      </nav>
    </aside>
  );
}
