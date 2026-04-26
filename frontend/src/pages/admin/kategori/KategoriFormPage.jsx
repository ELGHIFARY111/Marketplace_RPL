// Admin - Category Form Page
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function KategoriFormPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      // TODO: Fetch category for editing
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Create or update category
  };

  return (
    <div className="kategori-form-page">
      <h1>{id ? 'Edit Category' : 'Add New Category'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">{id ? 'Update' : 'Add'} Category</button>
      </form>
    </div>
  );
}
