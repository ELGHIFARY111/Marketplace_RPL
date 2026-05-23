import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../../services/api";

import { Search, ChevronDown, Star, ArrowRight } from "lucide-react";

const sortOptions = ["Terbaru", "Populer", "Harga Terendah", "Harga Tertinggi"];

// Map nama warna Indonesia ke hex color
const colorMap = {
  "Hitam": "#000000",
  "Putih": "#FFFFFF",
  "Merah": "#EF4444",
  "Biru": "#3B82F6",
  "Hijau": "#22C55E",
  "Kuning": "#EAB308",
  "Pink": "#EC4899",
  "Coklat": "#92400E",
  "Abu-abu": "#9CA3AF",
  "Orange": "#F97316",
  "Cream": "#FFFDD0",
  "Navy": "#1E3A5F",
  "Maroon": "#800000",
  "Ungu": "#A855F7",
  "Beige": "#F5F5DC",
  "Default": "#D1D5DB",
};

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warnaList, setWarnaList] = useState([]);
  const [ukuranList, setUkuranList] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState("");
  
  const [filters, setFilters] = useState({
    kategori: null,
    ukuran: null,
    warna: null,
    hargaMin: 0,
    hargaMax: 10000000,
    urutkan: "Terbaru"
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch produk dan kategori dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch produk via api service
        const prodRes = await api.get("/produk");
        const prodData = prodRes.data;
        
        // Map produk dengan data asli dari backend
        const mappedProducts = prodData.map(p => ({
          id: p.id_produk,
          name: p.nama,
          description: p.deskripsi,
          category: p.kategori,
          price: p.harga || 0,
          stock: p.stok || 0,
          image: p.foto 
            ? `http://localhost:5000/uploads/${p.foto}` 
            : null,
          rating: p.avg_rating || 0,
          totalReviews: p.total_ulasan || 0,
          colors: p.warna_list ? p.warna_list.split(',').filter(Boolean) : [],
          sizes: p.ukuran_list ? p.ukuran_list.split(',').filter(Boolean) : []
        }));

        // Extract unique warna dan ukuran dari semua produk
        const allColors = [...new Set(prodData.flatMap(p => p.warna_list ? p.warna_list.split(',') : []).filter(Boolean))];
        const allSizes = [...new Set(prodData.flatMap(p => p.ukuran_list ? p.ukuran_list.split(',') : []).filter(Boolean))];
        setWarnaList(allColors);
        setUkuranList(allSizes);
        
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);

        // Fetch kategori via api service
        const catRes = await api.get("/categories");
        setCategories(catRes.data);
      } catch (err) {
        console.log("Error fetch data:", err);
      }
    };

    fetchData();
  }, []);

  // Apply filter dan search
  useEffect(() => {
    let result = products;

    // Filter berdasarkan kategori
    if (filters.kategori) {
      result = result.filter(p => p.category === filters.kategori);
    }

    // Filter berdasarkan search
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Filter berdasarkan warna
    if (filters.warna) {
      result = result.filter(p => p.colors.includes(filters.warna));
    }

    // Filter berdasarkan ukuran
    if (filters.ukuran) {
      result = result.filter(p => p.sizes.includes(filters.ukuran));
    }

    // Filter berdasarkan harga
    result = result.filter(p => p.price >= filters.hargaMin && p.price <= filters.hargaMax);

    // Sorting
    if (filters.urutkan === "Harga Terendah") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.urutkan === "Harga Tertinggi") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, search, products]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleFilterKategori = (kategori) => {
    setFilters(prev => ({ ...prev, kategori: prev.kategori === kategori ? null : kategori }));
    setOpenDropdown(null);
  };

  const handleApplyHarga = (min, max) => {
    setFilters(prev => ({ ...prev, hargaMin: min, hargaMax: max }));
    setOpenDropdown(null);
  };

  const handleSortChange = (sortType) => {
    setFilters(prev => ({ ...prev, urutkan: sortType }));
    setOpenDropdown(null);
  };

  const handleFilterWarna = (warna) => {
    setFilters(prev => ({ ...prev, warna: prev.warna === warna ? null : warna }));
    setOpenDropdown(null);
  };

  const handleFilterUkuran = (ukuran) => {
    setFilters(prev => ({ ...prev, ukuran: prev.ukuran === ukuran ? null : ukuran }));
    setOpenDropdown(null);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black flex flex-col">
      <Navbar />
      <main className="flex-1">

      <section id="hero" className="relative h-[520px] overflow-hidden">
        <img
          src="/kaosabu.png"
          alt="Kaos"
          className="absolute left-10 -bottom-32 w-[260px] rotate-[30deg]"
        />
        <img
          src="/kaos.png"
          alt="kemeja"
          className="absolute -left-20 -bottom-12 w-[250px] ml-50 rotate-[15deg]"
        />

        <div className="absolute left-[190px] top-[170px] text-center">
          <h1 className="text-4xl font-bold text-[#5a3d42] drop-shadow-md">
            Fashion For Life
          </h1>
          <p className="text-2xl mt-4 leading-snug">
            Zenvy Selalu ada untuk memenuhi <br />
            fashion anda
          </p>
        </div>

        <div className="absolute right-16 bottom-0 w-[760px] h-[420px] pb-8">
          <img
            src="/kemeja.png"
            alt="Kemeja"
            className="absolute bottom-0 right-72 w-[260px] z-20"
          />

          <img
            src="/kemeja-putih.png"
            alt="Kemeja Putih"
            className="absolute bottom-0 right-12 w-[300px] z-10"
          />

          <img
            src="/jaket.png"
            alt="Jaket"
            className="absolute -bottom-[52px] -right-60 w-[500px] z-0"
          />
        </div>
      </section>

      <section id="produk" className="bg-white px-16 py-6 scroll-mt-20">
        <div className="mx-auto flex max-w-3xl items-center rounded-full border border-gray-300 bg-[#f3efe9] px-6 py-3">
          <input
            placeholder="Masukkan Pencarian ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none"
          />
          <Search size={28} />
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div className="flex items-center gap-8">
            <span>Filter Dengan</span>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("kategori")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Categori {filters.kategori && `(${filters.kategori})`} <ChevronDown size={18} />
              </button>

              {openDropdown === "kategori" && (
                <div className="absolute left-0 top-8 z-40 w-40 rounded-xl border bg-white p-3 shadow-lg">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <button
                        key={cat.id_kategori}
                        onClick={() => handleFilterKategori(cat.nama_kategori)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                          filters.kategori === cat.nama_kategori ? "bg-[#d9d9d9]" : "hover:bg-[#f3efe9]"
                        }`}
                      >
                        {cat.nama_kategori}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Tidak ada kategori</span>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("ukuran")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Ukuran {filters.ukuran && `(${filters.ukuran})`} <ChevronDown size={18} />
              </button>

              {openDropdown === "ukuran" && (
                <div className="absolute left-0 top-8 z-40 w-32 rounded-xl border bg-white p-3 shadow-lg">
                  {ukuranList.length > 0 ? (
                    ukuranList.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleFilterUkuran(item)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                          filters.ukuran === item ? "bg-[#d9d9d9]" : "hover:bg-[#f3efe9]"
                        }`}
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Tidak ada ukuran</span>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("harga")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Harga <ChevronDown size={18} />
              </button>

              {openDropdown === "harga" && (
                <div className="absolute left-0 top-8 z-40 w-56 rounded-xl border bg-white p-4 shadow-lg">
                  <p className="mb-3 text-sm font-medium">Range Harga</p>

                  <input
                    type="number"
                    placeholder="Harga minimum"
                    id="hargaMin"
                    className="mb-3 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#b89578]"
                  />

                  <input
                    type="number"
                    placeholder="Harga maksimum"
                    id="hargaMax"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#b89578]"
                  />

                  <button 
                    onClick={() => {
                      const min = parseInt(document.getElementById('hargaMin').value) || 0;
                      const max = parseInt(document.getElementById('hargaMax').value) || 10000000;
                      handleApplyHarga(min, max);
                    }}
                    className="mt-4 w-full rounded-lg bg-[#b89578] py-2 text-sm text-white hover:bg-[#a47f63] transition"
                  >
                    Terapkan
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("warna")}
                className="flex items-center gap-1 hover:text-[#b89578]"
              >
                Warna {filters.warna && `(${filters.warna})`} <ChevronDown size={18} />
              </button>

              {openDropdown === "warna" && (
                <div className="absolute left-0 top-8 z-40 w-40 rounded-xl border bg-white p-3 shadow-lg">
                  {warnaList.length > 0 ? (
                    warnaList.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleFilterWarna(item)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                          filters.warna === item ? "bg-[#d9d9d9]" : "hover:bg-[#f3efe9]"
                        }`}
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Tidak ada warna</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("urutkan")}
              className="flex items-center gap-2 rounded-full bg-[#f3efe9] px-7 py-3 hover:bg-[#e7e1d9] transition"
            >
              Urutkan <ChevronDown size={18} />
            </button>

            {openDropdown === "urutkan" && (
              <div className="absolute right-0 top-14 z-40 w-36 rounded-xl border bg-white p-3 shadow-lg">
                {sortOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSortChange(item)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                      filters.urutkan === item ? "bg-[#d9d9d9]" : "hover:bg-[#f3efe9]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-24 py-8">
        <div className="grid grid-cols-4 gap-x-10 gap-y-8">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/produk/detail/${product.id}`)}
                className="overflow-hidden rounded-t-[28px] border border-gray-300 bg-[#f7f7f7] transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <div className="px-6 pt-3 flex gap-3">
                  {product.colors.length > 0 ? (
                    product.colors.map((color) => (
                      <span
                        key={color}
                        title={color}
                        className="h-3 w-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: colorMap[color] || colorMap["Default"] }}
                      ></span>
                    ))
                  ) : (
                    <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                  )}
                </div>

                <div className="flex h-[220px] items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-[190px] object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs">Belum ada foto</span>
                    </div>
                  )}
                </div>

                <div className="bg-white px-3 py-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">Rp. {product.price?.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded px-2 py-1 text-xs text-white ${product.stock > 0 ? 'bg-black' : 'bg-red-500'}`}>
                      {product.stock > 0 ? 'Stok Tersedia' : 'Stok Habis'}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{product.rating > 0 ? product.rating : '-'}</span>
                    <span>|</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center items-center gap-5">
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`h-10 w-10 rounded-full ${
                num === currentPage
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}

          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className="hover:scale-110 transition"
            >
              <ArrowRight size={36} />
            </button>
          )}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}