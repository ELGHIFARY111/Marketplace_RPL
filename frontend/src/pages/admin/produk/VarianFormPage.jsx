import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

export default function VariasiFormPage() {
const { id, productId } = useParams(); // id varian atau productId untuk tambah
const navigate = useNavigate();
const isEdit = !!id; // True jika edit, False jika tambah

const [formData, setFormData] = useState({
    sku: "",
    warna: "",
    ukuran: "",
    stok: 0,
    harga: 0,
    product_id: productId || null,
});

const [varians, setVarians] = useState([]);

// 🔥 fetch data edit
useEffect(() => {
    if (isEdit && id) {
    fetch(`http://localhost:5000/api/varian/${id}`)
        .then(res => res.json())
        .then(data => {
        setFormData({
            sku: data.sku || "",
            warna: data.warna || "",
            ukuran: data.ukuran || "",
            stok: data.stok || 0,
            harga: data.harga || 0,
            product_id: data.product_id,
        });

        // fetch list varian
        fetch(`http://localhost:5000/api/produk/${data.product_id}/varian`)
            .then(res => res.json())
            .then(res => setVarians(res));
        });
    } else if (productId) {
        // Mode tambah - fetch list varian dari productId
        fetch(`http://localhost:5000/api/produk/${productId}/varian`)
            .then(res => res.json())
            .then(res => setVarians(res));
    }
}, [id, productId, isEdit]);

// 🔥 handle input
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

// 🔥 increment / decrement
const handleNumber = (field, type) => {
    setFormData(prev => ({
    ...prev,
    [field]:
        type === "plus"
        ? prev[field] + 1
        : Math.max(0, prev[field] - 1),
    }));
};

// 🔥 submit
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    let url = "http://localhost:5000/api/varian";
    let method = "POST";

    if (isEdit && id) {
        url = `http://localhost:5000/api/varian/${id}`;
        method = "PUT";
    }

    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        method,
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
    });

    if (res.ok) {
        alert("Berhasil disimpan!");
        navigate(-1);
    } else {
        alert("Gagal menyimpan!");
    }
    } catch (err) {
    console.log(err);
    }
};

return (
    <AdminLayout>
    {/* HEADER */}
    <div className="flex items-end gap-2">
        <h1 className="text-[2.5rem] font-bold">Produk dan Stok</h1>
        <span className="text-lg text-gray-600 mb-1">
        Produk &gt; detail &gt; variasi {isEdit ? "edit" : "tambah"}
        </span>
    </div>

    <div className="w-full h-[2px] bg-primary-200 mb-4"></div>

    {/* BUTTON */}
    <div className="flex justify-end gap-3 mb-4">
        <button
        onClick={() => navigate(-1)}
        className="bg-gray-400 text-white px-6 py-2 rounded-md"
        >
        Batal
        </button>

        <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded-md"
        >
        Simpan
        </button>
    </div>

    {/* FORM */}
    <form className="flex flex-col gap-4">

        {/* SKU */}
        <div className="flex items-center gap-4">
        <label className="w-40 font-semibold">SKU</label>
        <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="bg-primary-100 px-4 py-2 rounded-md w-[300px]"
        />
        </div>

        {/* WARNA */}
        <div className="flex items-center gap-4">
        <label className="w-40 font-semibold">Warna</label>
        <select
            name="warna"
            value={formData.warna}
            onChange={handleChange}
            className="bg-primary-100 px-4 py-2 rounded-md w-[300px]"
        >
            <option value="">Pilih Warna...</option>
            <option value="Merah">Merah</option>
            <option value="Kuning">Kuning</option>
            <option value="Hitam">Hitam</option>
        </select>
        </div>

        {/* UKURAN */}
        <div className="flex items-center gap-4">
        <label className="w-40 font-semibold">Ukuran</label>
        <select
            name="ukuran"
            value={formData.ukuran}
            onChange={handleChange}
            className="bg-primary-100 px-4 py-2 rounded-md w-[300px]"
        >
            <option value="">Pilih Ukuran...</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        </select>
        </div>

        {/* STOK */}
        <div className="flex items-center gap-4">
        <label className="w-40 font-semibold">Stok</label>
        <div className="flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-md">
            <button type="button" onClick={() => handleNumber("stok", "minus")}>-</button>
            <span>{formData.stok}</span>
            <button type="button" onClick={() => handleNumber("stok", "plus")}>+</button>
        </div>
        </div>

        {/* HARGA */}
        <div className="flex items-center gap-4">
        <label className="w-40 font-semibold">Harga</label>
        <div className="flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-md">
            <button type="button" onClick={() => handleNumber("harga", "minus")}>-</button>
            <span>{formData.harga.toLocaleString("id-ID")}</span>
            <button type="button" onClick={() => handleNumber("harga", "plus")}>+</button>
        </div>
        </div>

    </form>

    {/* TABLE */}
    <div className="mt-6">
        <h2 className="font-bold mb-2">Variasi Produk</h2>

        <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
            <thead className="bg-primary-100">
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
            {varians.map(v => (
                <tr key={v.id_varian} className="text-center">
                <td className="p-2 border">{v.id_varian}</td>
                <td className="p-2 border">{v.sku}</td>
                <td className="p-2 border">{v.warna}</td>
                <td className="p-2 border">{v.ukuran}</td>
                <td className="p-2 border">{v.stok}</td>
                <td className="p-2 border">
                    Rp. {v.harga.toLocaleString("id-ID")}
                </td>

                <td className="p-2 border">
                    <div className="flex justify-center gap-2">
                    <button className="bg-gray-400 text-white px-2 py-1 rounded text-sm">
                        Detail
                    </button>
                    <button
                        onClick={() => navigate(`/admin/varian/edit/${v.id_varian}`)}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                    >
                        Edit
                    </button>
                    <button className="bg-black text-white px-2 py-1 rounded text-sm">
                        Hapus
                    </button>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>

        </table>
        </div>
    </div>

    </AdminLayout>
);
}