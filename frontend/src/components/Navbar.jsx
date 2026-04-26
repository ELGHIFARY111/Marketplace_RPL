// Navbar Component Template
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Marketplace</div>
      <ul className="navbar-menu">
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </nav>
  );
}
