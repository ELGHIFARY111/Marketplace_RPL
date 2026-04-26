// Admin - User Form Page
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AkunFormPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer'
  });

  useEffect(() => {
    if (id) {
      // TODO: Fetch user for editing
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Create or update user
  };

  return (
    <div className="akun-form-page">
      <h1>{id ? 'Edit User' : 'Add New User'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {!id && (
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        )}
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="cs">Customer Service</option>
        </select>
        <button type="submit">{id ? 'Update' : 'Add'} User</button>
      </form>
    </div>
  );
}
