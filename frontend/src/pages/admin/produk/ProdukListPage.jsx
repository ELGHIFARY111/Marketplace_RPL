import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";

export default function ProdukListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch products dari API
    setLoading(false);
  }, []);

  const handleEdit = (id) => {
    // TODO: Navigate ke edit page
  };

  const handleDelete = (id) => {
    // TODO: Delete product
  };

  return (
    <AdminLayout>
      <div className="produk-list-page">
        <div className="page-header ">
          <h1 className="text-[3rem] font-bold ml-1">Produk Dan Stok</h1>
          <a href="/admin/produk/tambah" className="btn-add">Add Product</a>
        </div>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>Rp {product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleEdit(product.id)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
