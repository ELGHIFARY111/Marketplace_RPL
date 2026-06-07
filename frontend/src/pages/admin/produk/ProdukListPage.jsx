import AdminLayout from "../../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Search, ChevronDown, Star, ArrowRight } from "lucide-react";

// Komponen header kolom sortable
function SortableTh({ label, sortKey, currentSort, currentDir, onSort, className = "" }) {
  const active = currentSort === keyToUse(sortKey);
  function keyToUse(k) { return k; }
  const isLeft = className.includes("text-left");
  return (
    <th
      onClick={() => onSort(sortKey)}
      className={`cursor-pointer select-none hover:bg-primary-200 transition p-3 border ${className}`}
    >
      <span className={`flex items-center gap-1 ${isLeft ? "justify-start" : "justify-center"}`}>
        {label}
        <span className="text-xs text-gray-400">
          {active ? (currentDir === "asc" ? "▲" : "▼") : "⇅"}
        </span>
      </span>
    </th>
  );
}

export default function ProdukListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState("id_produk");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/produk");
      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
  }, []);

  const handleEdit = (id_produk) => {
    navigate(`/admin/produk-dan-stok/edit/${id_produk}`);
  };
  const handleDetail = (id_produk) => {
    navigate(`/admin/produk-dan-stok/detail/${id_produk}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus produk?")) return;

    try {
      await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p.id_produk !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <div className="produk-list-page">
        <div className="page-header flex items-end gap-0 ">
          <h1 className="text-[3rem] font-bold ml-1">Produk Dan Stok</h1>
          <a className="btn-add text-[1.5rem] font-bold mb-2 ml-2">Produk</a>
        </div>
        <div className="w-full h-[2px] bg-primary-200 mb-3"></div>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-[400px]">
              <input
                type="text"
                placeholder="Masukkan Pencarian ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-primary-100 border-2 border-primary-200 rounded-lg px-4 py-2 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-105">
                <Search size={28} />
              </span>
            </div>
            <button
              onClick={() => navigate("/admin/produk-dan-stok/tambah")}
              className="tombol-tambah"
            >
              Tambah +
            </button>
          </div>
        <div className="rounded-[15px] overflow-hidden border border-[#D9D9D9] border-[2px] ">
          <div className="max-h-[40rem] overflow-y-auto">
            <table className="produk-table w-full border-collapse ">
              <thead className="bg-primary-100 sticky -top-1 z-10 border-b-2 border-[#D9D9D9]"> 
                <tr>
                  <SortableTh label="ID" sortKey="id_produk" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                  <SortableTh label="Nama Produk" sortKey="nama" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="text-left" />
                  <SortableTh label="Stok" sortKey="stok" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                  <SortableTh label="Kategori" sortKey="kategori" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                  <th className="p-3 border text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[...products]
                  .filter((produk) =>
                    produk.nama.toLowerCase().includes(search.toLowerCase())
                  )
                  .sort((a, b) => {
                    const valA = a[sortKey] ?? "";
                    const valB = b[sortKey] ?? "";
                    const cmp = typeof valA === "number" || sortKey === "id_produk" || sortKey === "stok"
                      ? Number(valA) - Number(valB)
                      : String(valA).localeCompare(String(valB), "id");
                    return sortDir === "asc" ? cmp : -cmp;
                  })
                  .map((produk) => (
                  <tr key={produk.id_produk}>
                    <td className="text-center">{produk.id_produk}</td>
                    <td>{produk.nama}</td>
                    <td>{produk.stok}</td>
                    <td>{produk.kategori}</td>
                    <td className="text-center flex justify-center gap-2">
                      <button className="tombol-edit" onClick={() => handleDetail(produk.id_produk)}>Detail</button>
                      <button className="tombol-edit" onClick={() => handleEdit(produk.id_produk)}>Edit</button>
                      <button className="tombol-hapus" onClick={() => handleDelete(produk.id_produk)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
