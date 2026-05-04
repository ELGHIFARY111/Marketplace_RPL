import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";

export default function VariasiDetailPage() {
const { id } = useParams();
const navigate = useNavigate();

const [varian, setVarian] = useState(null);
const [varians, setVarians] = useState([]);

useEffect(() => {
    const fetchData = async () => {
    try {
        const res = await fetch(`http://localhost:5000/api/varian/${id}`);
        const data = await res.json();
        setVarian(data);

        if (data?.product_id) {
        const resList = await fetch(
            `http://localhost:5000/api/produk/${data.product_id}/varian`
        );
        const listData = await resList.json();
        setVarians(Array.isArray(listData) ? listData : []);
        }
    } catch (err) {
        console.log(err);
    }
    };

    fetchData();
}, [id]);

const handleEdit = () => {
    navigate(`/admin/varian/edit/${id}`);
};

const handleTambahVarian = () => {
    if (varian?.product_id) {
        navigate(`/admin/varian/tambah/${varian.product_id}`);
    }
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
            alert("Gagal menghapus varian");
        }
    } catch (err) {
        console.log(err);
    }
};

return (
    <AdminLayout>
    {/* HEADER */}
    <div className="page-header flex items-end gap-2">
        <h1 className="text-[2.5rem] font-bold">Produk dan Stok</h1>
        <span className="text-lg text-gray-600 mb-1">
        Produk &gt; detail &gt; variasi detail
        </span>
    </div>

    <div className="w-full h-[2px] bg-primary-200 mb-4"></div>

    {/* BUTTON EDIT */}
    <div className="flex justify-end mb-4">
        <button
        onClick={handleEdit}
        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-md shadow border border-gray-300"
        >
        Edit
        </button>
    </div>

    {/* DETAIL VARIAN */}
    {varian && (
        <div className="flex gap-10 mb-6">
        <div className="flex flex-col gap-4">

            <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">SKU</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px]">
                {varian.sku}
            </div>
            </div>

            <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">Warna</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px]">
                {varian.warna}
            </div>
            </div>

            <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">Ukuran</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px]">
                {varian.ukuran}
            </div>
            </div>

            <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">Stok</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px]">
                {varian.stok}
            </div>
            </div>

            <div className="flex items-center gap-4">
            <label className="w-40 font-semibold">Harga</label>
            <div className="bg-primary-100 px-4 py-2 rounded-md w-[300px]">
                Rp. {varian.harga?.toLocaleString("id-ID")}
            </div>
            </div>

        </div>
        </div>
    )}

    <div className="w-full h-[2px] bg-primary-200 mb-4"></div>

    {/* VARIASI TABLE */}
    <div className="mt-4">
        <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">Variasi Produk</h2>

        <button 
            onClick={handleTambahVarian}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md shadow"
        >
            Tambah +
        </button>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-300">
        <table className="w-full border-collapse">
            
            <thead className="bg-primary-100 border-b-2 border-[#D9D9D9]">
            <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">SKU</th>
                <th className="p-3 border">Warna</th>
                <th className="p-3 border">Ukuran</th>
                <th className="p-3 border">Stok</th>
                <th className="p-3 border">Harga</th>
                <th className="p-3 border">Aksi</th>
            </tr>
            </thead>

            <tbody>
            {varians.length > 0 ? (
                varians.map((v) => (
                <tr key={v.id_varian} className="text-center hover:bg-gray-50">
                    <td className="p-3 border">{v.id_varian}</td>
                    <td className="p-3 border">{v.sku}</td>
                    <td className="p-3 border">{v.warna}</td>
                    <td className="p-3 border">{v.ukuran}</td>
                    <td className="p-3 border">{v.stok}</td>
                    <td className="p-3 border">
                    Rp. {v.harga?.toLocaleString("id-ID")}
                    </td>

                    <td className="p-3 border">
                    <div className="flex justify-center gap-2">

                        <button 
                            onClick={() => navigate(`/admin/varian/detail/${v.id_varian}`)}
                            className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm"
                        >
                        Detail
                        </button>

                        <button
                        onClick={() => navigate(`/admin/varian/edit/${v.id_varian}`)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                        Edit
                        </button>

                        <button 
                            onClick={() => handleDeleteVarian(v.id_varian)}
                            className="bg-[#3b0000] text-white px-3 py-1 rounded-md text-sm"
                        >
                        Hapus
                        </button>

                    </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                    Tidak ada varian
                </td>
                </tr>
            )}
            </tbody>

        </table>
        </div>
    </div>
    </AdminLayout>
);
}