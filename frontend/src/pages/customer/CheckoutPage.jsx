import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShoppingCart,
  ChevronDown,
  QrCode,
  Wallet,
  Landmark,
  Store,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import PopupAlert from "../../components/PopupAlert";
import useAlert from "../../components/useAlert";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { alerts, showAlert, closeAlert } = useAlert();

  const [alamatList, setAlamatList] = useState([]);
  const [selectedAlamatId, setSelectedAlamatId] = useState("");
  const [selectedAlamat, setSelectedAlamat] = useState(null);

  const [selectedCourier, setSelectedCourier] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const [loadingAlamat, setLoadingAlamat] = useState(true);
  const [loadingKeranjang, setLoadingKeranjang] = useState(true);
  const [loadingOngkir, setLoadingOngkir] = useState(false);
  const [loadingBayar, setLoadingBayar] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const subtotal = cartItems.reduce((total, item) => {
    const harga = Number(item.harga || item.harga_satuan || item.harga_produk || 0);
    const qty = Number(item.qty || item.quantity || 1);

    return total + harga * qty;
  }, 0);

  const totalWeight = cartItems.reduce((total, item) => {
    const berat = Number(item.berat_gram || item.berat || item.berat_produk || 1000);
    const qty = Number(item.qty || item.quantity || 1);

    return total + berat * qty;
  }, 0);

  const totalBarang = cartItems.reduce((total, item) => {
    return total + Number(item.qty || item.quantity || 1);
  }, 0);

  const pajak = Math.round(subtotal * 0.02);
  const ongkir = selectedShipping ? Number(selectedShipping.cost) : 0;
  const voucherDiscount = appliedVoucher ? Number(appliedVoucher.nominal_diskon) : 0;
  const totalPembayaran = Math.max(0, subtotal + pajak + ongkir - voucherDiscount);

  const paymentOptions = [
    {
      type: "qris",
      bank: "",
      store: "",
      label: "QRIS",
      description: "Bayar dengan QRIS",
      icon: QrCode,
    },
    {
      type: "gopay",
      bank: "",
      store: "",
      label: "GoPay",
      description: "Bayar dengan GoPay",
      icon: Wallet,
    },
    {
      type: "shopeepay",
      bank: "",
      store: "",
      label: "ShopeePay",
      description: "Bayar dengan ShopeePay",
      icon: Wallet,
    },
    {
      type: "bank_transfer",
      bank: "bca",
      store: "",
      label: "BCA Virtual Account",
      description: "Bayar melalui VA BCA",
      icon: Landmark,
    },
    {
      type: "bank_transfer",
      bank: "bni",
      store: "",
      label: "BNI Virtual Account",
      description: "Bayar melalui VA BNI",
      icon: Landmark,
    },
    {
      type: "bank_transfer",
      bank: "bri",
      store: "",
      label: "BRI Virtual Account",
      description: "Bayar melalui VA BRI",
      icon: Landmark,
    },
    {
      type: "bank_transfer",
      bank: "permata",
      store: "",
      label: "Permata Virtual Account",
      description: "Bayar melalui VA Permata",
      icon: Landmark,
    },
    {
      type: "echannel",
      bank: "mandiri",
      store: "",
      label: "Mandiri Bill Payment",
      description: "Bayar melalui Mandiri Bill",
      icon: Landmark,
    },
    {
      type: "cstore",
      bank: "",
      store: "alfamart",
      label: "Alfamart",
      description: "Bayar di Alfamart",
      icon: Store,
    },
    {
      type: "cstore",
      bank: "",
      store: "indomaret",
      label: "Indomaret",
      description: "Bayar di Indomaret",
      icon: Store,
    },
  ];

  const formatRupiah = (angka) => {
    return `Rp.${Number(angka || 0).toLocaleString("id-ID")},00`;
  };

  const formatAlamat = (alamat) => {
    if (!alamat) return "";

    return [
      alamat.desa,
      alamat.kecamatan,
      alamat.kabupaten_kota,
      alamat.provinsi,
      alamat.kode_pos,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const getItemHarga = (item) => {
    return Number(item.harga || item.harga_satuan || item.harga_produk || 0);
  };

  const getItemQty = (item) => {
    return Number(item.qty || item.quantity || 1);
  };

  const getItemBerat = (item) => {
    return Number(item.berat_gram || item.berat || item.berat_produk || 1000);
  };

  useEffect(() => {
    const fetchAlamat = async () => {
      try {
        const res = await api.get("/users/alamat");
        setAlamatList(res.data || []);
      } catch (error) {
        console.error("Gagal memuat alamat:", error.response?.data || error);
        showAlert("Gagal memuat alamat tersimpan", "error");
      } finally {
        setLoadingAlamat(false);
      }
    };

    fetchAlamat();
  }, []);

  useEffect(() => {
    // Mode direct checkout dari detail produk
    const directItems = location.state?.directItems;
    if (directItems && Array.isArray(directItems) && directItems.length > 0) {
      setCartItems(directItems);
      setLoadingKeranjang(false);
      return;
    }

    // Mode normal: ambil dari keranjang
    const fetchKeranjang = async () => {
      try {
        const res = await api.get("/keranjang");

        console.log("RESPONSE KERANJANG:", res.data);

        const dataKeranjang =
          res.data?.data ||
          res.data?.items ||
          res.data?.keranjang ||
          res.data?.cartItems ||
          res.data?.cart ||
          res.data;

        if (Array.isArray(dataKeranjang)) {
          const selectedIds = location.state?.selectedIds;
          if (selectedIds && Array.isArray(selectedIds)) {
            setCartItems(
              dataKeranjang.filter((item) =>
                selectedIds.includes(item.id_keranjang)
              )
            );
          } else {
            setCartItems(dataKeranjang);
          }
        } else {
          console.error("Format keranjang bukan array:", dataKeranjang);
          setCartItems([]);
        }
      } catch (error) {
        console.error("Gagal memuat keranjang:", error.response?.data || error);
        showAlert("Gagal memuat data keranjang", "error");
      } finally {
        setLoadingKeranjang(false);
      }
    };

    fetchKeranjang();
  }, []);

  const handlePilihAlamat = (e) => {
    const idAlamat = e.target.value;

    setSelectedAlamatId(idAlamat);
    setSelectedCourier("");
    setShippingOptions([]);
    setSelectedShipping(null);

    const alamat = alamatList.find(
      (item) => String(item.id_alamat) === String(idAlamat)
    );

    setSelectedAlamat(alamat || null);
  };

  const handlePilihCourier = (e) => {
    setSelectedCourier(e.target.value);
    setShippingOptions([]);
    setSelectedShipping(null);
  };

  useEffect(() => {
    const cekOngkirOtomatis = async () => {
      if (!selectedAlamat || !selectedCourier) return;

      if (!selectedAlamat.destination_id) {
        showAlert("Alamat ini belum punya destination ID RajaOngkir", "warning");
        return;
      }

      if (cartItems.length === 0) {
        showAlert("Keranjang masih kosong", "warning");
        return;
      }

      try {
        setLoadingOngkir(true);
        setShippingOptions([]);
        setSelectedShipping(null);

        const response = await api.post("/kurir/cost", {
          destination: Number(selectedAlamat.destination_id),
          weight: totalWeight,
          courier: selectedCourier,
        });

        setShippingOptions(response.data.data || []);
      } catch (error) {
        console.error("Gagal menghitung ongkir:", error.response?.data || error);
        showAlert(error.response?.data?.message || "Gagal menghitung ongkir", "error");
      } finally {
        setLoadingOngkir(false);
      }
    };

    cekOngkirOtomatis();
  }, [selectedAlamat, selectedCourier, totalWeight, cartItems.length]);

  const handlePilihPayment = (option) => {
    setSelectedPayment(option.type);
    setSelectedBank(option.bank || "");
    setSelectedStore(option.store || "");
  };

  const selectedPaymentLabel = paymentOptions.find(
    (item) =>
      item.type === selectedPayment &&
      (item.type !== "bank_transfer" || item.bank === selectedBank) &&
      (item.type !== "echannel" || item.bank === selectedBank) &&
      (item.type !== "cstore" || item.store === selectedStore)
  )?.label;

  const buildOrderItems = () => {
    return cartItems.map((item) => {
      const harga = getItemHarga(item);
      const qty = getItemQty(item);
      const berat = getItemBerat(item);

      return {
        id_keranjang: item.id_keranjang,
        id_varian: item.id_varian,
        id_produk: item.id_produk,
        nama_produk: item.nama_produk || "Produk",
        warna: item.warna || null,
        ukuran: item.ukuran || null,
        harga,
        qty,
        berat_gram: berat,
        subtotal: harga * qty,
      };
    });
  };

  const handleApplyVoucher = async () => {
    if (!couponCode.trim()) {
      showAlert("Masukkan kode kupon terlebih dahulu", "warning");
      return;
    }

    try {
      const res = await api.post("/voucher/validate", { code: couponCode });
      if (res.data?.valid) {
        setAppliedVoucher(res.data.voucher);
        showAlert(`Kupon ${res.data.voucher.kode_voucher} berhasil digunakan!`, "success");
      } else {
        showAlert(res.data?.message || "Kupon tidak valid", "error");
      }
    } catch (error) {
      console.error("Gagal memvalidasi kupon:", error);
      showAlert(error.response?.data?.message || "Kupon tidak valid", "error");
    }
  };

  const handleBayar = async () => {
    try {
      if (loadingKeranjang) {
        showAlert("Data keranjang masih dimuat", "info");
        return;
      }

      if (cartItems.length === 0) {
        showAlert("Keranjang masih kosong", "warning");
        return;
      }

      if (!selectedAlamat) {
        showAlert("Pilih alamat pengiriman dulu", "warning");
        return;
      }

      if (!selectedCourier) {
        showAlert("Pilih jasa kirim dulu", "warning");
        return;
      }

      if (!selectedShipping) {
        showAlert("Pilih layanan ongkir dulu", "warning");
        return;
      }

      if (!selectedPayment) {
        showAlert("Pilih metode pembayaran dulu", "warning");
        return;
      }

      setLoadingBayar(true);

      const items = buildOrderItems();

      const payload = {
        id_alamat: selectedAlamat.id_alamat,
        id_voucher: appliedVoucher ? appliedVoucher.id_voucher : null,

        kurir_code: selectedShipping.code,
        kurir_service: selectedShipping.service,
        kurir_name: selectedShipping.name,
        ongkir: Number(selectedShipping.cost),
        etd: selectedShipping.etd,

        payment_method: selectedPayment,
        bank: selectedBank || null,
        store: selectedStore || null,

        items,
        total_berat: totalWeight,
        subtotal,
        pajak,
        voucher_discount: voucherDiscount,
        total_pembayaran: totalPembayaran,
      };

      const res = await api.post("/pembayaran/core", payload);

      const detailPesanan = {
        id_pesanan: res.data.id_pesanan,
        order_id: res.data.order_id,
        payment_method: res.data.payment_method,
        bank: res.data.bank,
        store: res.data.store,
        payment_label: selectedPaymentLabel,
        midtrans: res.data.midtrans,

        alamat: selectedAlamat,
        pengiriman: {
          kurir_code: selectedShipping.code || selectedCourier,
          kurir_service: selectedShipping.service,
          kurir_name: selectedShipping.name || selectedCourier?.toUpperCase(),
          ongkir: Number(selectedShipping.cost || 0),
          etd: selectedShipping.etd,
        },

        items,
        total_berat: totalWeight,
        subtotal,
        pajak,
        total_pembayaran: totalPembayaran,
        kode_voucher: appliedVoucher ? appliedVoucher.kode_voucher : null,
        nominal_voucher: appliedVoucher ? appliedVoucher.nominal_diskon : 0,
      };

      localStorage.setItem("lastPaymentData", JSON.stringify(detailPesanan));

      navigate("/pesanan/detail", {
        state: detailPesanan,
      });
    } catch (error) {
      console.error("Gagal bayar:", error.response?.data || error.message);
      showAlert(error.response?.data?.message || "Gagal membuat pembayaran", "error");
    } finally {
      setLoadingBayar(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div className="w-full bg-[#f3efe9] min-h-screen flex flex-col">
        <Navbar />

        <main className="px-20 py-10 flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-serif">Checkout</h1>
            <ShoppingCart size={30} />
          </div>

          <div className="grid grid-cols-[1.4fr_1fr] gap-10">
            <section className="rounded-lg bg-white px-5 py-5">
              <div className="space-y-10">
                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Alamat Pengiriman
                  </label>

                  <div className="relative">
                    <select
                      value={selectedAlamatId}
                      onChange={handlePilihAlamat}
                      disabled={loadingAlamat}
                      className="w-full appearance-none rounded-md bg-[#d9d9d9] px-4 py-4 font-serif text-gray-700 outline-none disabled:opacity-60"
                    >
                      <option value="">
                        {loadingAlamat
                          ? "Memuat alamat..."
                          : "Pilih alamat tersimpan"}
                      </option>

                      {alamatList.map((alamat) => (
                        <option key={alamat.id_alamat} value={alamat.id_alamat}>
                          {alamat.label_alamat || "Alamat"} -{" "}
                          {alamat.nama_penerima} - {formatAlamat(alamat)}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={26}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  {alamatList.length === 0 && !loadingAlamat && (
                    <div className="mt-3 rounded-md bg-yellow-50 px-4 py-3 font-serif text-sm text-yellow-700">
                      Kamu belum punya alamat tersimpan. Tambahkan alamat dulu
                      di halaman profil.
                    </div>
                  )}

                  {selectedAlamat && (
                    <div className="mt-4 rounded-md bg-[#f3efe9] px-4 py-4 font-serif text-sm">
                      <p className="font-bold">
                        {selectedAlamat.label_alamat || "Alamat"} -{" "}
                        {selectedAlamat.nama_penerima}
                      </p>

                      <p>No. Telp: {selectedAlamat.no_telp_penerima || "-"}</p>

                      <p className="mt-2">
                        <span className="font-bold">Info tambahan:</span>{" "}
                        {selectedAlamat.informasi_tambahan || "-"}
                      </p>

                      <p>{formatAlamat(selectedAlamat)}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Jasa Kirim
                  </label>

                  <div className="relative">
                    <select
                      value={selectedCourier}
                      onChange={handlePilihCourier}
                      disabled={!selectedAlamat || loadingKeranjang}
                      className="w-full appearance-none rounded-md bg-[#d9d9d9] px-4 py-4 font-serif text-gray-500 outline-none disabled:opacity-60"
                    >
                      <option value="">
                        {selectedAlamat
                          ? "Pilih jasa pengiriman"
                          : "Pilih alamat dulu"}
                      </option>
                      <option value="jne">JNE</option>
                      <option value="jnt">J&T</option>
                      <option value="sicepat">SiCepat</option>
                      <option value="anteraja">AnterAja</option>
                    </select>

                    <ChevronDown
                      size={26}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </div>

                  {loadingOngkir && (
                    <p className="mt-3 font-serif text-sm text-gray-500">
                      Menghitung ongkir...
                    </p>
                  )}

                  {!loadingOngkir &&
                    selectedAlamat &&
                    selectedCourier &&
                    shippingOptions.length === 0 && (
                      <p className="mt-3 font-serif text-sm text-gray-500">
                        Tidak ada layanan ongkir yang tersedia.
                      </p>
                    )}

                  <div className="mt-4 space-y-2">
                    {shippingOptions.map((option, index) => (
                      <label
                        key={`${option.code}-${option.service}-${index}`}
                        className={`block rounded-md border px-4 py-3 font-serif cursor-pointer transition ${
                          selectedShipping?.service === option.service &&
                          selectedShipping?.cost === option.cost
                            ? "border-black bg-[#f3efe9]"
                            : "border-gray-300 hover:bg-[#f3efe9]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={option.service}
                          className="mr-2"
                          checked={
                            selectedShipping?.service === option.service &&
                            selectedShipping?.cost === option.cost
                          }
                          onChange={() => setSelectedShipping(option)}
                        />

                        {option.name} - {option.service} -{" "}
                        {formatRupiah(option.cost)} ({option.etd})
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Kupon Diskon
                  </label>

                  <div className="flex gap-3">
                    <input
                      placeholder="Masukkan Kupon anda..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 rounded-md bg-[#d9d9d9] px-4 py-4 font-serif outline-none placeholder:text-gray-500"
                    />

                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="rounded-md bg-black px-7 font-serif text-white hover:bg-[#b89578] transition"
                    >
                      Gunakan
                    </button>
                  </div>

                  {appliedVoucher && (
                    <div className="mt-3 flex items-center justify-between rounded-md bg-green-50 border border-green-200 px-4 py-3 font-serif text-sm text-green-700">
                      <div>
                        Kupon <span className="font-bold">{appliedVoucher.kode_voucher}</span> berhasil digunakan! (Diskon {formatRupiah(appliedVoucher.nominal_diskon)})
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedVoucher(null);
                          setCouponCode("");
                        }}
                        className="text-red-500 hover:text-red-700 font-bold ml-2"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-xl font-serif">
                    Pilih Pembayaran
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {paymentOptions.map((option, index) => {
                      const Icon = option.icon;

                      const isSelected =
                        selectedPayment === option.type &&
                        (option.type !== "bank_transfer" ||
                          selectedBank === option.bank) &&
                        (option.type !== "echannel" ||
                          selectedBank === option.bank) &&
                        (option.type !== "cstore" ||
                          selectedStore === option.store);

                      return (
                        <button
                          key={`${option.type}-${option.bank}-${option.store}-${index}`}
                          type="button"
                          onClick={() => handlePilihPayment(option)}
                          className={`rounded-md border px-4 py-4 text-left font-serif transition ${
                            isSelected
                              ? "border-black bg-[#f3efe9]"
                              : "border-gray-300 bg-white hover:bg-[#f3efe9]"
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <Icon size={20} />
                            <p className="font-bold">{option.label}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-3 font-serif text-sm text-gray-500">
                    Opsi yang dipilih akan dibuatkan instruksi pembayaran di
                    halaman detail pesanan.
                  </p>
                </div>
              </div>
            </section>

            <aside className="h-fit rounded-lg bg-white px-10 py-8">
              <h2 className="mb-4 text-xl font-serif">Pesanan Anda</h2>

              <div className="space-y-2 text-sm font-serif">
                <div className="flex justify-between">
                  <span>Subtotal ({totalBarang} barang)</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Berat</span>
                  <span>{totalWeight} gram</span>
                </div>

                <div className="flex justify-between">
                  <span>Biaya pengirim</span>
                  <span>{formatRupiah(ongkir)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Pajak</span>
                  <span>{formatRupiah(pajak)}</span>
                </div>

                {appliedVoucher && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Diskon Kupon ({appliedVoucher.kode_voucher})</span>
                    <span>-{formatRupiah(appliedVoucher.nominal_diskon)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-8">
                  <span>Total Pembayaran</span>
                  <span className="font-bold font-serif">
                    {formatRupiah(totalPembayaran)}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-md bg-[#f3efe9] px-4 py-3 font-serif text-sm">
                <p className="mb-2 font-bold">Produk</p>

                {loadingKeranjang ? (
                  <p>Memuat produk...</p>
                ) : cartItems.length === 0 ? (
                  <p>Keranjang kosong</p>
                ) : (
                  <div className="space-y-2">
                    {cartItems.map((item, index) => {
                      const harga = getItemHarga(item);
                      const qty = getItemQty(item);
                      const berat = getItemBerat(item);

                      return (
                        <div key={item.id_keranjang || item.id_varian || index}>
                          <div className="flex justify-between gap-3">
                            <span>
                              {item.nama_produk || "Produk"}{" "}
                              {item.warna ? `- ${item.warna}` : ""}{" "}
                              {item.ukuran ? `(${item.ukuran})` : ""} x {qty}
                            </span>
                            <span>{formatRupiah(harga * qty)}</span>
                          </div>

                          <p className="text-xs text-gray-600">
                            Berat: {berat} gram x {qty}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedAlamat && selectedShipping && (
                <div className="mt-6 rounded-md bg-[#f3efe9] px-4 py-3 font-serif text-sm">
                  <p className="font-bold">Pengiriman</p>
                  <p>
                    {selectedShipping.name} - {selectedShipping.service}
                  </p>
                  <p>Estimasi: {selectedShipping.etd}</p>
                </div>
              )}

              {selectedPayment && (
                <div className="mt-6 rounded-md bg-[#f3efe9] px-4 py-3 font-serif text-sm">
                  <p className="font-bold">Metode Pembayaran</p>
                  <p>{selectedPaymentLabel}</p>
                </div>
              )}

              <button
                onClick={handleBayar}
                disabled={loadingBayar || loadingKeranjang || cartItems.length === 0}
                className="mt-10 w-full rounded-md bg-black py-3 font-serif text-white hover:bg-[#b89578] transition disabled:opacity-60"
              >
                {loadingBayar ? "MEMPROSES..." : "BUAT PEMBAYARAN"}
              </button>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}