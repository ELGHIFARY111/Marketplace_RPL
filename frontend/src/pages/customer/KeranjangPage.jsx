import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart } from "lucide-react";
import api from "../../services/api";
import PopupAlert from "../../components/PopupAlert";
import useAlert from "../../components/useAlert";

export default function KeranjangPage() {
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelectItem = (idKeranjang) => {
    setSelectedIds((prev) =>
      prev.includes(idKeranjang)
        ? prev.filter((id) => id !== idKeranjang)
        : [...prev, idKeranjang]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id_keranjang));
    }
  };

  const formatRupiah = (value) => {
    return `Rp.${Number(value || 0).toLocaleString("id-ID")},00`;
  };

  const fetchCart = async () => {
    try {
      const res = await api.get("/keranjang");

      console.log("DATA KERANJANG:", res.data);

      const dataKeranjangRaw =
        res.data?.data ||
        res.data?.items ||
        res.data?.keranjang ||
        res.data?.cart ||
        res.data;

      const dataKeranjang = Array.isArray(dataKeranjangRaw) ? dataKeranjangRaw : [];
      setItems(dataKeranjang);
      setSelectedIds(dataKeranjang.map((item) => item.id_keranjang));
    } catch (error) {
      console.error("Gagal memuat keranjang:", error);
      setItems([]);
      setSelectedIds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (idKeranjang, newQty) => {
    if (newQty < 1) return;

    try {
      await api.put(`/keranjang/${idKeranjang}`, {
        qty: newQty,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id_keranjang === idKeranjang
            ? {
                ...item,
                qty: newQty,
                subtotal: Number(item.harga || 0) * newQty,
                total_berat: Number(item.berat_gram || 1000) * newQty,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Gagal update qty:", error);
      showAlert(error.response?.data?.message || "Gagal mengubah jumlah produk", "error");
    }
  };

  const increaseQty = (item) => {
    updateQty(item.id_keranjang, Number(item.qty || 1) + 1);
  };

  const decreaseQty = (item) => {
    if (Number(item.qty || 1) > 1) {
      updateQty(item.id_keranjang, Number(item.qty || 1) - 1);
    }
  };

  const removeItem = async (idKeranjang) => {
    try {
      await api.delete(`/keranjang/${idKeranjang}`);

      setItems((prevItems) =>
        prevItems.filter((item) => item.id_keranjang !== idKeranjang)
      );
      setSelectedIds((prev) => prev.filter((id) => id !== idKeranjang));
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      showAlert(error.response?.data?.message || "Gagal menghapus produk dari keranjang", "error");
    }
  };

  const selectedItems = items.filter((item) =>
    selectedIds.includes(item.id_keranjang)
  );

  const subtotal = selectedItems.reduce(
    (total, item) => total + Number(item.harga || 0) * Number(item.qty || 0),
    0
  );

  const totalBarang = selectedItems.reduce(
    (total, item) => total + Number(item.qty || 0),
    0
  );

  const totalBerat = selectedItems.reduce(
    (total, item) =>
      total + Number(item.berat_gram || 1000) * Number(item.qty || 0),
    0
  );

  const tax = selectedItems.length > 0 ? Math.round(subtotal * 0.02) : 0;
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3efe9] text-black">
        <div className="w-full min-h-screen flex flex-col">
          <Navbar />

          <main className="flex flex-1 items-center justify-center">
            <p className="text-gray-500 text-lg">Memuat keranjang...</p>
          </main>

          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black">
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />

        <main className="w-full px-24 py-8 flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-serif">Keranjang</h1>
            <ShoppingCart size={28} />
          </div>

          <div className="grid grid-cols-[1.35fr_1fr] gap-10">
            <section className="rounded-lg bg-white px-5 py-5">
              {items.length > 0 && (
                <div className="flex items-center gap-3 border-b border-black pb-4 mb-2">
                  <input
                    type="checkbox"
                    checked={items.length > 0 && selectedIds.length === items.length}
                    onChange={toggleSelectAll}
                    className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span className="font-serif font-bold text-lg">Pilih Semua ({items.length} Barang)</span>
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id_keranjang}
                  className="grid grid-cols-[40px_110px_1fr_110px_80px] gap-4 border-b border-black py-5 last:border-b-0 items-center"
                >
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id_keranjang)}
                      onChange={() => toggleSelectItem(item.id_keranjang)}
                      className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                  </div>
                  <div className="flex h-28 w-28 items-center justify-center rounded-md bg-[#dedede]">
                    <img
                      src={
                        item.file_foto
                          ? (item.file_foto.startsWith("http://") || item.file_foto.startsWith("https://")
                              ? item.file_foto
                              : `http://localhost:5000/uploads/${item.file_foto.replace("public/uploads/", "").replace("uploads/", "")}`)
                          : "/kaos.png"
                      }
                      alt={item.nama_produk}
                      className="max-h-24 object-contain"
                    />
                  </div>

                  <div className="pt-3">
                    <h2 className="text-xl font-serif">
                      {item.nama_produk}
                    </h2>

                    <p className="text-xs text-gray-500">
                      Warna: {item.warna || "-"} | Ukuran: {item.ukuran || "-"}
                    </p>

                    <p className="text-xs text-gray-500">
                      Berat: {item.berat_gram || 1000} gram
                    </p>

                    <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                      <p className="text-xl font-bold font-serif text-black">
                        {formatRupiah(item.harga)}
                      </p>
                      {Number(item.persentase_diskon || 0) > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            {formatRupiah(item.harga_original)}
                          </span>
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Diskon {Math.round(item.persentase_diskon)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="h-5 w-5 bg-black text-white leading-none"
                    >
                      −
                    </button>

                    <span className="flex h-5 w-8 items-center justify-center text-sm">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="h-5 w-5 bg-black text-white leading-none"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-between py-2">
                    <p className="text-[10px] text-gray-500">
                      {formatRupiah(Number(item.harga || 0) * Number(item.qty || 0))}
                    </p>

                    <button
                      onClick={() => removeItem(item.id_keranjang)}
                      className="text-[10px] text-gray-400 hover:text-red-500"
                    >
                      X Remove
                    </button>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="py-20 text-center text-gray-500">
                  Keranjang masih kosong.
                </div>
              )}

              <div className="min-h-[120px]" />
            </section>

            <aside className="h-fit rounded-lg bg-white px-10 py-8">
              <h2 className="mb-4 text-xl font-serif">Pesanan Anda</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({totalBarang} barang)</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Berat</span>
                  <span>{totalBerat} gram</span>
                </div>

                <div className="flex justify-between">
                  <span>Pajak</span>
                  <span>{formatRupiah(tax)}</span>
                </div>

                <div className="flex justify-between pt-6">
                  <span>Total Sementara</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              <button
                disabled={selectedIds.length === 0}
                onClick={() => navigate("/checkout", { state: { selectedIds } })}
                className="mt-14 w-full rounded-md bg-black py-3 text-white hover:bg-[#b89578] transition disabled:opacity-50"
              >
                BAYAR
              </button>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}