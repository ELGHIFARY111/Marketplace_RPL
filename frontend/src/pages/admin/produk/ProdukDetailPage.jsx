import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

export default function ProdukDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
  });
  
  const [categories, setCategories] = useState([]);
  const [varians, setVarians] = useState([]);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);


  useEffect(() => {
      const fetchKategori = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/categories");
          const data = await res.json();
          
          console.log("Response Kategori dari API:", data);

          if (Array.isArray(data)) {
            setCategories(data);
          } else if (data && data.data && Array.isArray(data.data)) {
            setCategories(data.data);
          } else {
            setCategories([]);
          }
        } catch (err) {
          console.log("Error fetch kategori:", err);
          setCategories([]);
        }
      };
      fetchKategori();
    }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/produk/${id}`);
          const data = await res.json();

          setFormData({
            name: data.name || "",
            description: data.description || "",
            category_id: data.category_id || "",
          });

          // Fetch foto produk
          if (data.images && Array.isArray(data.images)) {
            const fotoUrls = data.images.map(img => `http://localhost:5000/uploads/${img}`);
            setPreviewUrls(fotoUrls);
          }

          // Fetch varian produk
          try {
            const varRes = await fetch(`http://localhost:5000/api/produk/${id}/varian`);
            if (varRes.ok) {
              const varData = await varRes.json();
              setVarians(Array.isArray(varData) ? varData : []);
            }
          } catch (err) {
            console.log("Error fetch varian:", err);
            setVarians([]);
          }
          

        } catch (err) {
          console.log(err);
        }
      };

      fetchProduct();
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEdit = (id_produk) => {
    navigate(`/admin/produk-dan-stok/edit/${id_produk}`);
  };

  const handleTambahVarian = () => {
    navigate(`/admin/varian/tambah/${id}`);
  };

  const handleEditVarian = (varianId) => {
    navigate(`/admin/varian/edit/${varianId}`);
  };

  const handleDetailVarian = (varianId) => {
    navigate(`/admin/varian/detail/${varianId}`);
  };

  const handleDeleteVarian = async (varianId) => {
    if (!confirm("Yakin mau hapus varian?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/varian/${varianId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        setVarians(varians.filter(v => v.id_varian !== varianId));
        alert("Varian berhasil dihapus");
      } else {
        const errData = await res.json();
        alert(errData.message || "Gagal menghapus varian");
      }
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan saat menghapus varian");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
      
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }

    e.target.value = null; 
  };


  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPreviewUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "http://localhost:5000/api/produk";
      let method = "POST";

      if (id) {
        url = `http://localhost:5000/api/produk/${id}`;
        method = "PUT";
      }

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("category_id", formData.category_id);
      
      images.forEach((image) => {
        submitData.append("images", image);
      });


      const token = localStorage.getItem("token"); 

      const res = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: submitData, 
      });

      if (res.ok) {
        alert("Berhasil menyimpan data!");
        navigate("/admin/produk"); 
      } else {
        const errorData = await res.json();
        alert(`Gagal menyimpan data: ${errorData.message || 'Unauthorized'}`);
      }
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan pada server.");
    }
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="page-header flex items-end gap-2">
        <h1 className="text-[2.5rem] font-bold">Produk dan Stok</h1>
        <span className="text-lg text-gray-600 mb-1">Produk &gt; detail</span>
      </div>

      <div className="w-full h-[2px] bg-primary-200 mb-4"></div>

      {/* BUTTON EDIT */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => handleEdit(id)}
          className="tombol-edit-2 "
        >
          Edit
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex gap-10">
        
        {/* LEFT */}
        <div className="flex flex-col gap-5">

          {/* Nama */}
          <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">Nama Produk</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px] shadow-inner">
              {formData.name}
            </div>
          </div>

          {/* Kategori */}
          <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">Kategori Produk</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px] shadow-inner">
              {categories.find(c => c.id_kategori == formData.category_id)?.nama_kategori || "-"}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="flex items-start gap-4">
            <label className="w-40 font-semibold mt-2">Deskripsi Produk</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px] shadow-inner min-h-[80px]">
              {formData.description}
            </div>
          </div>

        </div>

        {/* RIGHT - GAMBAR */}
        <div>
          <label className="font-semibold">Foto Produk</label>

          <div className="flex gap-4 mt-3">
            
            {/* gambar utama */}
            <div className="w-[160px] h-[160px] bg-gray-200 rounded-xl flex items-center justify-center shadow-inner">
              {previewUrls[0] ? (
                <img 
                  src={previewUrls[0]} 
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* thumbnail */}
            <div className="flex flex-col gap-2">
              {previewUrls.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-[60px] h-[60px] object-cover rounded-md border"
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* VARIASI */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">Variasi Produk</h2>

          <button onClick={handleTambahVarian} className="tombol-tambah">
            Tambah +
          </button>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-300">
          <table className="produk-table w-full border-collapse">
            <thead className="bg-primary-100 sticky -top-1 z-10 border-b-2 border-[#D9D9D9]">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">SKU</th>
                <th className="p-2 border">Warna</th>
                <th className="p-2 border">Ukuran</th>
                <th className="p-2 border">Stok</th>
                <th className="p-2 border">Harga</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {varians.length > 0 ? (
                varians.map((varian) => (
                  <tr key={varian.id_varian} className="text-center">
                    <td className="p-2 border">{varian.id_varian}</td>
                    <td className="p-2 border">{varian.sku}</td>
                    <td className="p-2 border">{varian.warna}</td>
                    <td className="p-2 border">{varian.ukuran}</td>
                    <td className="p-2 border">{varian.stok}</td>
                    <td className="p-2 border">Rp. {varian.harga?.toLocaleString('id-ID')}</td>
                    <td className="p-2 border max-w-[100px]">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleDetailVarian(varian.id_varian)}
                          className="tombol-edit"
                        >
                          Detail
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/varian/edit/${varian.id_varian}`)}
                          className="tombol-edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteVarian(varian.id_varian)}
                          className="tombol-hapus"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">Tidak ada varian</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
}