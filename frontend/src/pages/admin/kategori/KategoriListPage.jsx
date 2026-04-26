// Category List Page Template (Admin)
import { useState, useEffect } from 'react';

export default function KategoriListPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // TODO: Fetch categories dari API
  }, []);

  return (
    <div className="kategori-list-page">
      <div className="page-header">
        <h1>Categories</h1>
        <a href="/admin/kategori/tambah">Add Category</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
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
