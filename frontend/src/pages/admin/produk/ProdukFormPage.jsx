// Admin - Product Form Page (Add/Edit)
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProdukFormPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category_id: '',
    stock: 0,
    image: null
  });

  useEffect(() => {
    if (id) {
      // TODO: Fetch product for editing
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Create or update product
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="produk-form-page">
      <h1>{id ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {/* Categories will be populated here */}
        </select>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
        <button type="submit">{id ? 'Update' : 'Add'} Product</button>
      </form>
    </div>
  );
}
