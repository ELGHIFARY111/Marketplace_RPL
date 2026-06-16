import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  User,
  Edit,
  LogOut,
  MapPin,
  Trash2,
  Plus,
  MessageSquare,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import PopupAlert from "../../components/PopupAlert";
import useAlert from "../../components/useAlert";

export default function ProfilPage() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const { alerts, showAlert, closeAlert } = useAlert();

  // Jika admin mengakses halaman profil customer, redirect ke admin panel
  useEffect(() => {
    if (user && (user.level === "admin" || user.level === "superadmin" || user.level_akses === "admin")) {
      navigate("/admin/profil", { replace: true });
    }
  }, [user, navigate]);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [alamatList, setAlamatList] = useState([]);
  const [savingAlamat, setSavingAlamat] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedSubdistrictId, setSelectedSubdistrictId] = useState("");

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(null);

  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSubdistricts, setLoadingSubdistricts] = useState(false);

  const [formAlamat, setFormAlamat] = useState({
    label_alamat: "",
    nama_penerima: "",
    no_telp_penerima: "",
    informasi_tambahan: "",
  });

  const fetchAlamat = async () => {
    try {
      const res = await api.get("/users/alamat");
      setAlamatList(res.data || []);
    } catch (error) {
      console.error("Gagal memuat alamat:", error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const res = await api.get("/kurir/provinces");
      setProvinces(res.data.data || []);
    } catch (error) {
      console.error("Gagal memuat provinsi:", error);
      showAlert("Gagal memuat data provinsi", "error");
    }
  };

  const [activeTab, setActiveTab] = useState("profil");
  const [csMessages, setCsMessages] = useState([]);
  const [csSubject, setCsSubject] = useState("");
  const [csMessage, setCsMessage] = useState("");
  const [sendingCs, setSendingCs] = useState(false);

  const fetchCsMessages = async () => {
    try {
      const res = await api.get("/cs");
      setCsMessages(res.data || []);
    } catch (error) {
      console.error("Gagal memuat pesan CS:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProfile = await api.get("/users/profile");
        setProfile(resProfile.data);

        await fetchAlamat();
        await fetchProvinces();
        await fetchCsMessages();
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKirimCsMessage = async (e) => {
    e.preventDefault();
    if (!csSubject.trim() || !csMessage.trim()) {
      showAlert("Subjek dan pesan harus diisi!", "warning");
      return;
    }

    try {
      setSendingCs(true);
      await api.post("/cs", {
        subject: csSubject,
        message: csMessage
      });
      showAlert("Pesan berhasil dikirim ke Customer Service", "success");
      setCsSubject("");
      setCsMessage("");
      await fetchCsMessages();
    } catch (error) {
      console.error("Gagal mengirim pesan CS:", error);
      showAlert(error.response?.data?.message || "Gagal mengirim pesan", "error");
    } finally {
      setSendingCs(false);
    }
  };

  const handleChangeAlamat = (e) => {
    const { name, value } = e.target;

    setFormAlamat((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePilihProvinsi = async (e) => {
    const provinceId = e.target.value;

    setSelectedProvinceId(provinceId);
    setSelectedCityId("");
    setSelectedDistrictId("");
    setSelectedSubdistrictId("");

    setSelectedCity(null);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);

    setCities([]);
    setDistricts([]);
    setSubdistricts([]);

    if (!provinceId) {
      setSelectedProvince(null);
      return;
    }

    const provinsi = provinces.find(
      (item) => String(item.id) === String(provinceId)
    );

    setSelectedProvince(provinsi || null);

    try {
      setLoadingCities(true);

      const res = await api.get(`/kurir/cities/${provinceId}`);
      setCities(res.data.data || []);
    } catch (error) {
      console.error("Gagal memuat kabupaten/kota:", error);
      showAlert("Gagal memuat kabupaten/kota", "error");
    } finally {
      setLoadingCities(false);
    }
  };

  const handlePilihKabupatenKota = async (e) => {
    const cityId = e.target.value;

    setSelectedCityId(cityId);
    setSelectedDistrictId("");
    setSelectedSubdistrictId("");

    setSelectedDistrict(null);
    setSelectedSubdistrict(null);

    setDistricts([]);
    setSubdistricts([]);

    if (!cityId) {
      setSelectedCity(null);
      return;
    }

    const city = cities.find((item) => String(item.id) === String(cityId));
    setSelectedCity(city || null);

    try {
      setLoadingDistricts(true);

      const res = await api.get(`/kurir/districts/${cityId}`);
      setDistricts(res.data.data || []);
    } catch (error) {
      console.error("Gagal memuat kecamatan:", error);
      showAlert("Gagal memuat kecamatan", "error");
    } finally {
      setLoadingDistricts(false);
    }
  };

  const handlePilihKecamatan = async (e) => {
    const districtId = e.target.value;

    setSelectedDistrictId(districtId);
    setSelectedSubdistrictId("");
    setSelectedSubdistrict(null);
    setSubdistricts([]);

    if (!districtId) {
      setSelectedDistrict(null);
      return;
    }

    const district = districts.find(
      (item) => String(item.id) === String(districtId)
    );

    setSelectedDistrict(district || null);

    try {
      setLoadingSubdistricts(true);

      const res = await api.get(`/kurir/subdistricts/${districtId}`);
      setSubdistricts(res.data.data || []);
    } catch (error) {
      console.error("Gagal memuat desa/kelurahan:", error);
      showAlert("Gagal memuat desa/kelurahan", "error");
    } finally {
      setLoadingSubdistricts(false);
    }
  };

  const handlePilihDesa = (e) => {
    const subdistrictId = e.target.value;

    setSelectedSubdistrictId(subdistrictId);

    if (!subdistrictId) {
      setSelectedSubdistrict(null);
      return;
    }

    const subdistrict = subdistricts.find(
      (item) => String(item.id) === String(subdistrictId)
    );

    setSelectedSubdistrict(subdistrict || null);
  };

  const resetFormAlamat = () => {
    setFormAlamat({
      label_alamat: "",
      nama_penerima: "",
      no_telp_penerima: "",
      informasi_tambahan: "",
    });

    setSelectedProvinceId("");
    setSelectedCityId("");
    setSelectedDistrictId("");
    setSelectedSubdistrictId("");

    setSelectedProvince(null);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);

    setCities([]);
    setDistricts([]);
    setSubdistricts([]);
  };

  const handleTambahAlamat = async () => {
    try {
      if (
        !formAlamat.nama_penerima ||
        !formAlamat.no_telp_penerima ||
        !formAlamat.informasi_tambahan ||
        !selectedProvince ||
        !selectedCity ||
        !selectedDistrict ||
        !selectedSubdistrict
      ) {
        showAlert("Lengkapi semua data alamat dulu", "warning");
        return;
      }

      const kodePos =
        selectedSubdistrict.zip_code ||
        selectedSubdistrict.postal_code ||
        selectedDistrict.zip_code ||
        selectedCity.zip_code ||
        "";

      setSavingAlamat(true);

      await api.post("/users/alamat", {
        label_alamat: formAlamat.label_alamat || "Rumah",
        nama_penerima: formAlamat.nama_penerima,
        no_telp_penerima: formAlamat.no_telp_penerima,
        informasi_tambahan: formAlamat.informasi_tambahan,

        provinsi: selectedProvince.name,
        kabupaten_kota: selectedCity.name,
        kecamatan: selectedDistrict.name,
        desa: selectedSubdistrict.name,

        kota: selectedCity.name,
        kode_pos: kodePos,

        destination_id: Number(selectedSubdistrict.id),
      });

      showAlert("Alamat berhasil ditambahkan", "success");

      resetFormAlamat();
      await fetchAlamat();
    } catch (error) {
      console.error("Gagal menambah alamat:", error);
      showAlert(error.response?.data?.message || "Gagal menambah alamat", "error");
    } finally {
      setSavingAlamat(false);
    }
  };

  const handleHapusAlamat = async (id_alamat) => {
    try {
      const konfirmasi = window.confirm("Yakin ingin menghapus alamat ini?");
      if (!konfirmasi) return;

      await api.delete(`/users/alamat/${id_alamat}`);

      setAlamatList((prev) =>
        prev.filter((alamat) => alamat.id_alamat !== id_alamat)
      );

      showAlert("Alamat berhasil dihapus", "success");
    } catch (error) {
      console.error("Gagal menghapus alamat:", error);
      showAlert("Gagal menghapus alamat", "error");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e5e5e5] text-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Memuat profil...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div className="w-full bg-[#f3efe9]">
        <Navbar />

        <main className="w-full px-24 py-14 flex-1">
          <div className="mx-auto w-full">
            <div className="mb-6 flex items-center gap-4">
              <User size={42} className="fill-black" />
              <h1 className="text-4xl font-serif font-bold">Profil Saya</h1>
            </div>

            <section className="rounded-[55px] bg-white px-16 py-10">
              <div className="mb-10 flex items-center justify-between border-b pb-6">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-gray-100">
                    <User size={48} className="text-gray-600" />
                  </div>

                  <h2 className="text-3xl font-serif">
                    {profile?.nama_lengkap || "Nama Pengguna"}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-[200px_1fr] gap-10">
                {/* SIDEBAR TABS */}
                <div className="flex flex-col gap-2 border-r border-gray-200 pr-5">
                  <button
                    onClick={() => setActiveTab("profil")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-serif font-bold transition text-left ${
                      activeTab === "profil"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <User size={18} />
                    Profil
                  </button>

                  <button
                    onClick={() => setActiveTab("alamat")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-serif font-bold transition text-left ${
                      activeTab === "alamat"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <MapPin size={18} />
                    Alamat
                  </button>

                  <button
                    onClick={() => setActiveTab("cs")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-serif font-bold transition text-left ${
                      activeTab === "cs"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <MessageSquare size={18} />
                    Bantuan / CS
                  </button>

                  <div className="mt-10 pt-10 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-serif font-bold text-red-500 hover:bg-red-50 transition w-full text-left"
                    >
                      <LogOut size={18} />
                      Keluar
                    </button>
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="min-h-[400px]">
                  {activeTab === "profil" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mb-4 border-b pb-3">
                        <h3 className="text-2xl font-serif font-bold">Detail Profil</h3>
                        <button
                          onClick={() => navigate("/profil/edit")}
                          className="flex items-center gap-2 text-sm font-serif font-bold hover:text-[#b89578] transition"
                        >
                          <Edit size={16} />
                          Edit Profil
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                          <label className="mb-1 block text-sm font-serif font-bold text-gray-600">
                            Nama Lengkap
                          </label>
                          <div className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif font-bold text-gray-800">
                            {profile?.nama_lengkap || "-"}
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-serif font-bold text-gray-600">
                            Kata Sandi
                          </label>
                          <div className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif font-bold text-gray-800">
                            ********
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-serif font-bold text-gray-600">
                            Email
                          </label>
                          <div className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif font-bold text-gray-800">
                            {profile?.email || "-"}
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-serif font-bold text-gray-600">
                            No Telepon
                          </label>
                          <div className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif font-bold text-gray-800">
                            {profile?.no_telp || "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "alamat" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <MapPin size={24} />
                        <h3 className="text-2xl font-serif font-bold">
                          Alamat Pengiriman
                        </h3>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {alamatList.length === 0 ? (
                          <p className="font-serif text-gray-500 text-sm">
                            Belum ada alamat tersimpan.
                          </p>
                        ) : (
                          alamatList.map((alamat) => (
                            <div
                              key={alamat.id_alamat}
                              className="rounded-md bg-[#f3efe9] px-5 py-4 font-serif text-sm"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-bold">
                                    {alamat.label_alamat || "Alamat"} -{" "}
                                    {alamat.nama_penerima}
                                  </p>

                                  <p className="text-xs text-gray-700">
                                    No. Telp: {alamat.no_telp_penerima || "-"}
                                  </p>

                                  <p className="mt-2 text-xs">
                                    <span className="font-bold">Info tambahan:</span>{" "}
                                    {alamat.informasi_tambahan || "-"}
                                  </p>

                                  <p className="text-xs mt-1">
                                    {alamat.desa ? `${alamat.desa}, ` : ""}
                                    {alamat.kecamatan ? `${alamat.kecamatan}, ` : ""}
                                    {alamat.kabupaten_kota
                                      ? `${alamat.kabupaten_kota}, `
                                      : ""}
                                    {alamat.provinsi ? `${alamat.provinsi}, ` : ""}
                                    {alamat.kode_pos || ""}
                                  </p>

                                  <p className="text-[10px] text-gray-500 mt-1">
                                    ID RajaOngkir: {alamat.destination_id || "-"}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleHapusAlamat(alamat.id_alamat)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add new address section */}
                      <div className="border-t pt-5">
                        <h4 className="text-md font-serif font-bold mb-4">Tambah Alamat Baru</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            name="label_alamat"
                            value={formAlamat.label_alamat}
                            onChange={handleChangeAlamat}
                            placeholder="Label alamat, contoh: Rumah"
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none placeholder:text-gray-500"
                          />

                          <input
                            name="nama_penerima"
                            value={formAlamat.nama_penerima}
                            onChange={handleChangeAlamat}
                            placeholder="Nama penerima"
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none placeholder:text-gray-500"
                          />

                          <input
                            name="no_telp_penerima"
                            value={formAlamat.no_telp_penerima}
                            onChange={handleChangeAlamat}
                            placeholder="No telepon penerima"
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none placeholder:text-gray-500"
                          />

                          <select
                            value={selectedProvinceId}
                            onChange={handlePilihProvinsi}
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none"
                          >
                            <option value="">Pilih Provinsi</option>
                            {provinces.map((province) => (
                              <option key={province.id} value={province.id}>
                                {province.name}
                              </option>
                            ))}
                          </select>

                          <select
                            value={selectedCityId}
                            onChange={handlePilihKabupatenKota}
                            disabled={!selectedProvinceId || loadingCities}
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none disabled:opacity-60"
                          >
                            <option value="">
                              {loadingCities
                                ? "Memuat kabupaten/kota..."
                                : "Pilih Kabupaten / Kota"}
                            </option>
                            {cities.map((city) => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                          </select>

                          <select
                            value={selectedDistrictId}
                            onChange={handlePilihKecamatan}
                            disabled={!selectedCityId || loadingDistricts}
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none disabled:opacity-60"
                          >
                            <option value="">
                              {loadingDistricts
                                ? "Memuat kecamatan..."
                                : "Pilih Kecamatan"}
                            </option>
                            {districts.map((district) => (
                              <option key={district.id} value={district.id}>
                                {district.name}
                              </option>
                            ))}
                          </select>

                          <select
                            value={selectedSubdistrictId}
                            onChange={handlePilihDesa}
                            disabled={!selectedDistrictId || loadingSubdistricts}
                            className="rounded-md bg-[#f3efe9] px-4 py-2.5 text-xs font-serif outline-none disabled:opacity-60"
                          >
                            <option value="">
                              {loadingSubdistricts
                                ? "Memuat desa/kelurahan..."
                                : "Pilih Desa / Kelurahan"}
                            </option>
                            {subdistricts.map((subdistrict) => (
                              <option key={subdistrict.id} value={subdistrict.id}>
                                {subdistrict.name}
                              </option>
                            ))}
                          </select>

                          <input
                            value={
                              selectedSubdistrict?.zip_code ||
                              selectedSubdistrict?.postal_code ||
                              selectedDistrict?.zip_code ||
                              selectedCity?.zip_code ||
                              ""
                            }
                            placeholder="Kode pos"
                            readOnly
                            className="rounded-md bg-[#e9e3dc] px-4 py-2.5 text-xs font-serif outline-none placeholder:text-gray-500"
                          />

                          <div className="col-span-2">
                            <label className="mb-1 block text-xs font-serif font-bold">
                              Informasi Tambahan
                            </label>

                            <textarea
                              name="informasi_tambahan"
                              value={formAlamat.informasi_tambahan}
                              onChange={handleChangeAlamat}
                              placeholder="Contoh: Jl. Melati No. 10, RT 01/RW 02, rumah pagar hitam"
                              className="h-20 w-full resize-none rounded-md bg-[#f3efe9] px-4 py-2 text-xs font-serif outline-none placeholder:text-gray-500"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleTambahAlamat}
                          disabled={savingAlamat}
                          className="mt-4 flex items-center gap-2 rounded-md bg-black px-6 py-2.5 text-xs font-serif text-white hover:bg-[#b89578] transition disabled:opacity-60"
                        >
                          <Plus size={16} />
                          {savingAlamat ? "Menyimpan..." : "Simpan / Tambah Alamat"}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "cs" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <MessageSquare size={24} />
                        <h3 className="text-2xl font-serif font-bold">
                          Customer Service / Bantuan
                        </h3>
                      </div>

                      {/* CS Message List */}
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {csMessages.length === 0 ? (
                          <p className="font-serif text-gray-500 text-sm">
                            Belum ada riwayat pesan dukungan.
                          </p>
                        ) : (
                          csMessages.map((msg) => (
                            <div
                              key={msg.id_pesan}
                              className="rounded-md bg-[#f3efe9] px-5 py-4 font-serif text-xs border-l-4 border-black"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="w-full">
                                  <div className="flex justify-between items-center">
                                    <p className="font-bold text-sm text-black">{msg.subjek}</p>
                                    <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                                      msg.status_balasan === 'dibalas'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {msg.status_balasan}
                                    </span>
                                  </div>

                                  <p className="text-[10px] text-gray-500 mt-0.5">
                                    Kirim: {formatDate(msg.tgl_kirim)}
                                  </p>

                                  <p className="mt-2 text-xs bg-white p-2.5 rounded border border-gray-200 text-gray-800">
                                    {msg.isi_pesan}
                                  </p>

                                  {msg.balasan && (
                                    <div className="mt-3 bg-green-50 p-2.5 rounded border border-green-200">
                                      <p className="text-[10px] font-bold text-green-800">Balasan CS:</p>
                                      <p className="text-xs text-gray-800 mt-1">{msg.balasan}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* New CS ticket form */}
                      <div className="border-t pt-5">
                        <h4 className="text-md font-serif font-bold mb-4">Kirim Pesan Baru ke CS</h4>
                        <form onSubmit={handleKirimCsMessage} className="space-y-4">
                          <div>
                            <input
                              type="text"
                              value={csSubject}
                              onChange={(e) => setCsSubject(e.target.value)}
                              placeholder="Subjek masalah (Contoh: Keterlambatan Pengiriman, Salah Produk)"
                              className="w-full rounded-md bg-[#f3efe9] px-4 py-2 text-xs font-serif outline-none placeholder:text-gray-500"
                              required
                            />
                          </div>

                          <div>
                            <textarea
                              value={csMessage}
                              onChange={(e) => setCsMessage(e.target.value)}
                              placeholder="Jelaskan kendala Anda secara detail di sini..."
                              className="h-20 w-full resize-none rounded-md bg-[#f3efe9] px-4 py-2 text-xs font-serif outline-none placeholder:text-gray-500"
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={sendingCs}
                            className="flex items-center gap-2 rounded-md bg-black px-6 py-2.5 text-xs font-serif text-white hover:bg-[#b89578] transition disabled:opacity-60"
                          >
                            <Send size={12} />
                            {sendingCs ? "Mengirim..." : "Kirim Pesan"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}