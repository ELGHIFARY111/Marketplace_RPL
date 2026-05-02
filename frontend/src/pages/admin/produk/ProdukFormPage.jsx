import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

export default function ProdukFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
  });
  
  const [categories, setCategories] = useState([]);
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
      <div className="min-h-screen bg-white p-6 font-sans">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="flex justify-between items-end border-b-2 border-gray-200 pb-4 mb-8">
            <div className="flex items-baseline gap-2">
              <h1 className="text-4xl font-serif font-bold text-black">Produk dan Stok</h1>
              <span className="text-md text-black font-semibold">
                Produk &gt; {id ? "edit" : "tambah"}
              </span>
            </div>
            
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => navigate("/admin/produk")}
                className="bg-[#A6A6A6] hover:bg-gray-500 text-white font-bold py-2 px-8 rounded-md transition"
              >
                Batal
              </button>
              <button 
                type="submit" 
                onClick={handleSubmit}
                className="bg-[#367C2B] hover:bg-green-800 text-white font-bold py-2 px-8 rounded-md transition"
              >
                Simpan
              </button>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Nama Produk */}
            <div className="flex items-center gap-4">
              <label className="w-48 font-bold text-md text-black">Nama Produk</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan Nama..."
                value={formData.name}
                onChange={handleChange}
                className="w-[400px] bg-[#F5EFE7] focus:outline-none focus:ring-2 focus:ring-[#367C2B] px-4 py-2 rounded-md font-medium text-gray-700"
                required
              />
            </div>

            {/* Kategori Produk */}
            <div className="flex items-center gap-4">
              <label className="w-48 font-bold text-md text-black">Kategori Produk</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-[400px] bg-[#F5EFE7] focus:outline-none focus:ring-2 focus:ring-[#367C2B] px-4 py-2 rounded-md font-medium text-gray-700 cursor-pointer"
                required
              >
                <option value="" disabled hidden>Masukkan Kategori...</option>
                
                {/* 🔥 PERBAIKAN DI SINI: Tambahkan Array.isArray */}
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat.id_kategori || cat.id} value={cat.id_kategori || cat.id}>
                    {cat.nama_kategori || cat.name}
                  </option>
                ))}
                
                {/* Dummy options jika fetch belum jalan */}
                <option value="1">Kaos</option>
                <option value="2">Kemeja</option>
              </select>
            </div>

            {/* Deskripsi Produk */}
            <div className="flex items-start gap-4">
              <label className="w-48 font-bold text-md text-black mt-2">Deskripsi Produk</label>
              <textarea
                name="description"
                placeholder="Masukkan Deskripsi..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-[400px] bg-[#F5EFE7] focus:outline-none focus:ring-2 focus:ring-[#367C2B] px-4 py-2 rounded-md font-medium text-gray-700 resize-none"
                required
              />
            </div>

            {/* Foto Produk Header */}
            <div className="flex items-center gap-4 mt-4">
              <label className="w-48 font-bold text-md text-black">Foto Produk</label>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-[#367C2B] hover:bg-green-800 text-white font-bold py-1.5 px-6 rounded-md shadow-sm transition"
              >
                Tambah +
              </button>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Foto Produk Area */}
            <div className="ml-[13rem]"> 
              {previewUrls.length === 0 ? (
                // State Kosong (Belum ada foto)
                <div className="w-full max-w-[800px] h-[300px] bg-[#F5EFE7] rounded-xl flex flex-col items-center justify-center border-2 border-transparent border-dashed hover:border-gray-300">
                  <p className="text-black font-bold text-lg mb-4 text-center">
                    Belum ada foto produk, silahkan <br/> tambahkan...
                  </p>
                  {/* Icon Image */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-black border-2 border-black rounded-sm p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ) : (
                // State Terisi (Grid Foto)
                <div className="flex flex-wrap gap-4 max-w-[900px]">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative w-32 h-32 bg-[#D9D9D9] rounded-2xl p-2 flex items-center justify-center shadow-sm">
                      <img 
                        src={url} 
                        alt={`Preview ${index}`} 
                        className="max-w-full max-h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 text-red-600 font-extrabold text-xl hover:scale-110 drop-shadow-md"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
}