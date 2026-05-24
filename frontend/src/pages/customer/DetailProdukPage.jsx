import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../../services/api";
import { ShoppingCart, Star } from "lucide-react";

const colorMap = {
  Hitam: "#000000",
  Putih: "#FFFFFF",
  Merah: "#EF4444",
  Biru: "#3B82F6",
  Hijau: "#22C55E",
  Kuning: "#EAB308",
  Pink: "#EC4899",
  Coklat: "#92400E",
  "Abu-abu": "#9CA3AF",
  Orange: "#F97316",
  Cream: "#FFFDD0",
  Navy: "#1E3A5F",
  Maroon: "#800000",
  Ungu: "#A855F7",
  Beige: "#F5F5DC",
  Default: "#D1D5DB",
};

export default function DetailProdukPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addingCart, setAddingCart] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(1000);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/produk/${id}`);
        const data = res.data;

        setProduct(data);
        setCurrentPrice(data.price || 0);
        setCurrentStock(data.stock || 0);

        if (data.varian?.length > 0) {
          setCurrentWeight(data.varian[0].berat_gram || 1000);
        }
      } catch (err) {
        console.log("Error fetch produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product || !product.varian) return;

    if (selectedColor && selectedSize) {
      const matchedVarian = product.varian.find(
        (v) => v.warna === selectedColor && v.ukuran === selectedSize
      );

      if (matchedVarian) {
        setCurrentPrice(matchedVarian.harga);
        setCurrentStock(matchedVarian.stok);
        setCurrentWeight(matchedVarian.berat_gram || 1000);
      }
    } else if (selectedColor) {
      const matched = product.varian.filter((v) => v.warna === selectedColor);

      if (matched.length > 0) {
        setCurrentPrice(Math.min(...matched.map((v) => v.harga)));
        setCurrentStock(matched.reduce((s, v) => s + Number(v.stok || 0), 0));
        setCurrentWeight(matched[0].berat_gram || 1000);
      }
    } else if (selectedSize) {
      const matched = product.varian.filter((v) => v.ukuran === selectedSize);

      if (matched.length > 0) {
        setCurrentPrice(Math.min(...matched.map((v) => v.harga)));
        setCurrentStock(matched.reduce((s, v) => s + Number(v.stok || 0), 0));
        setCurrentWeight(matched[0].berat_gram || 1000);
      }
    } else {
      setCurrentPrice(product.price || 0);
      setCurrentStock(product.stock || 0);

      if (product.varian?.length > 0) {
        setCurrentWeight(product.varian[0].berat_gram || 1000);
      }
    }
  }, [selectedColor, selectedSize, product]);

  const uniqueColors = product?.varian
    ? [...new Set(product.varian.map((v) => v.warna).filter(Boolean))]
    : [];

  const uniqueSizes = product?.varian
    ? [...new Set(product.varian.map((v) => v.ukuran).filter(Boolean))]
    : [];

  const availableSizes = selectedColor
    ? new Set(
        product?.varian
          ?.filter((v) => v.warna === selectedColor)
          .map((v) => v.ukuran)
      )
    : new Set(uniqueSizes);

  const availableColors = selectedSize
    ? new Set(
        product?.varian
          ?.filter((v) => v.ukuran === selectedSize)
          .map((v) => v.warna)
      )
    : new Set(uniqueColors);

  const imageUrls =
    product?.images?.length > 0
      ? product.images.map((img) => `http://localhost:5000/uploads/${img}`)
      : ["/kaos.png"];

  const getSelectedVarian = () => {
    if (!product?.varian || product.varian.length === 0) {
      return null;
    }

    return product.varian.find(
      (v) => v.warna === selectedColor && v.ukuran === selectedSize
    );
  };

  const validateSelectedVarian = () => {
    if (!selectedColor || !selectedSize) {
      alert("Pilih warna dan ukuran terlebih dahulu");
      return null;
    }

    const selectedVarian = getSelectedVarian();

    if (!selectedVarian) {
      alert("Varian produk tidak ditemukan");
      return null;
    }

    if (selectedVarian.stok <= 0) {
      alert("Stok varian ini habis");
      return null;
    }

    return selectedVarian;
  };

  const addSelectedVarianToCart = async () => {
    const selectedVarian = validateSelectedVarian();

    if (!selectedVarian) {
      return false;
    }

    await api.post("/keranjang", {
      id_varian: selectedVarian.id_varian,
      qty: 1,
    });

    return true;
  };

  const handleAddToCart = async () => {
    try {
      setAddingCart(true);

      const success = await addSelectedVarianToCart();

      if (success) {
        alert("Produk berhasil ditambahkan ke keranjang");
      }
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Silakan login terlebih dahulu");
        navigate("/auth/login");
        return;
      }

      alert(error.response?.data?.message || "Gagal menambahkan produk ke keranjang");
    } finally {
      setAddingCart(false);
    }
  };

  const handleCheckoutNow = async () => {
    try {
      setCheckoutLoading(true);

      const success = await addSelectedVarianToCart();

      if (success) {
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Gagal checkout:", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Silakan login terlebih dahulu");
        navigate("/auth/login");
        return;
      }

      alert(error.response?.data?.message || "Gagal memproses checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalf = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={18}
          className="fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalf) {
      stars.push(
        <Star
          key="half"
          size={18}
          className="fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remaining = 5 - stars.length;

    for (let i = 0; i < remaining; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={18} className="text-yellow-400" />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3efe9] text-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Memuat produk...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3efe9] text-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black flex flex-col">
      <Navbar />

      <main className="px-20 py-14 flex-1">
        <div className="grid grid-cols-2 gap-16">
          <section>
            <div className="flex h-[480px] items-center justify-center rounded-3xl bg-[#dedede]">
              <img
                src={imageUrls[selectedImage]}
                alt={product.name}
                className="max-h-[420px] object-contain"
              />
            </div>

            {imageUrls.length > 1 && (
              <div className="mt-8 grid grid-cols-3 gap-6">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex h-32 items-center justify-center rounded-xl bg-[#dedede] cursor-pointer transition ${
                      selectedImage === index
                        ? "ring-2 ring-black"
                        : "hover:opacity-80"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="max-h-28 object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="pt-14">
            <h1 className="text-5xl font-serif leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500">
              {currentStock > 0 ? `Stok: ${currentStock}` : "Stok Habis"}
            </p>

            <p className="text-sm text-gray-500">
              Berat: {currentWeight} gram
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {renderStars(product.avg_rating)}
              </div>

              <span className="text-sm">{product.avg_rating || "-"}</span>
              <span className="text-sm text-gray-500">
                {product.total_ulasan} Ulasan
              </span>
            </div>

            <div className="mt-3 flex items-end gap-4">
              <h2 className="text-4xl font-bold font-serif">
                Rp. {Number(currentPrice || 0).toLocaleString("id-ID")}
              </h2>
            </div>

            {product.description && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {uniqueColors.length > 0 && (
              <div className="mt-5">
                <p className="text-sm">
                  Warna{" "}
                  {selectedColor && (
                    <span className="text-gray-500">— {selectedColor}</span>
                  )}
                </p>

                <div className="mt-2 flex gap-4">
                  {uniqueColors.map((color) => {
                    const isAvailable = availableColors.has(color);

                    return (
                      <button
                        key={color}
                        title={color}
                        disabled={!isAvailable}
                        onClick={() =>
                          setSelectedColor(
                            selectedColor === color ? null : color
                          )
                        }
                        className={`h-6 w-6 rounded-full transition-all duration-200 border border-gray-300 ${
                          selectedColor === color
                            ? "scale-125 ring-2 ring-black ring-offset-2"
                            : isAvailable
                            ? "hover:scale-110"
                            : "opacity-25 cursor-not-allowed"
                        }`}
                        style={{
                          backgroundColor:
                            colorMap[color] || colorMap["Default"],
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {uniqueSizes.length > 0 && (
              <div className="mt-6">
                <p className="text-sm">Ukuran</p>

                <div className="mt-3 flex gap-5">
                  {uniqueSizes.map((size) => {
                    const isAvailable = availableSizes.has(size);

                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() =>
                          setSelectedSize(selectedSize === size ? null : size)
                        }
                        className={`h-8 min-w-12 border border-black px-4 font-serif transition duration-300
                        ${
                          selectedSize === size
                            ? "bg-black text-white shadow-lg -translate-y-1"
                            : isAvailable
                            ? "hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                            : "opacity-25 cursor-not-allowed border-gray-400 text-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleCheckoutNow}
                disabled={currentStock === 0 || checkoutLoading}
                className="w-[340px] rounded-xl bg-black py-3 text-xl font-serif font-bold text-white hover:bg-[#b89578] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "Memproses..." : "Checkout"}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={currentStock === 0 || addingCart}
                className="flex h-12 w-20 items-center justify-center rounded-xl bg-[#e7e1d9] hover:bg-[#d5c7ba] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={28} />
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}