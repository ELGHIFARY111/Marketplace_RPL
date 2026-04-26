// User List Page Template (Admin)
import { useState, useEffect } from 'react';

export default function AkunListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: Fetch all users dari API
  }, []);

  return (
    <div className="akun-list-page">
      <div className="page-header">
        <h1>User Management</h1>
        <a href="/admin/akun/tambah">Add User</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
