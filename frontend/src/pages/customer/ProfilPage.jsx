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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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
      alert("Gagal memuat data provinsi");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProfile = await api.get("/users/profile");
        setProfile(resProfile.data);

        await fetchAlamat();
        await fetchProvinces();
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      alert("Gagal memuat kabupaten/kota");
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
      alert("Gagal memuat kecamatan");
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
      alert("Gagal memuat desa/kelurahan");
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
        alert("Lengkapi semua data alamat dulu");
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

      alert("Alamat berhasil ditambahkan");

      resetFormAlamat();
      await fetchAlamat();
    } catch (error) {
      console.error("Gagal menambah alamat:", error);
      alert(error.response?.data?.message || "Gagal menambah alamat");
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

      alert("Alamat berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus alamat:", error);
      alert("Gagal menghapus alamat");
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

  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <div className="w-full bg-[#f3efe9]">
        <Navbar />

        <main className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <User size={42} className="fill-black" />
              <h1 className="text-4xl font-serif font-bold">Profil</h1>
            </div>

            <section className="rounded-[55px] bg-white px-20 py-10">
              <div className="mb-14 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-gray-100">
                    <User size={48} className="text-gray-600" />
                  </div>

                  <h2 className="text-3xl font-serif">
                    {profile?.nama_lengkap || "Nama Pengguna"}
                  </h2>
                </div>

                <button
                  onClick={() => navigate("/profil/edit")}
                  className="flex items-center gap-2 font-serif font-bold hover:text-[#b89578] transition"
                >
                  <Edit size={20} />
                  Edit Profil
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-14 gap-y-16">
                <div>
                  <label className="mb-2 block font-serif font-bold">
                    Nama
                  </label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    {profile?.nama_lengkap || "-"}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    Kata Sandi
                  </label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    ********
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    Email
                  </label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    {profile?.email || "-"}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-serif font-bold">
                    No Telepon
                  </label>
                  <div className="rounded-md bg-[#f3efe9] py-3 text-center font-serif font-bold text-gray-800">
                    {profile?.no_telp || "-"}
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <div className="mb-5 flex items-center gap-3">
                  <MapPin size={26} />
                  <h3 className="text-2xl font-serif font-bold">
                    Alamat Pengiriman
                  </h3>
                </div>

                <div className="space-y-3">
                  {alamatList.length === 0 ? (
                    <p className="font-serif text-gray-500">
                      Belum ada alamat tersimpan.
                    </p>
                  ) : (
                    alamatList.map((alamat) => (
                      <div
                        key={alamat.id_alamat}
                        className="rounded-md bg-[#f3efe9] px-5 py-4 font-serif"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold">
                              {alamat.label_alamat || "Alamat"} -{" "}
                              {alamat.nama_penerima}
                            </p>

                            <p className="text-sm text-gray-700">
                              No. Telp: {alamat.no_telp_penerima || "-"}
                            </p>

                            <p className="mt-2">
                              <span className="font-bold">Info tambahan:</span>{" "}
                              {alamat.informasi_tambahan || "-"}
                            </p>

                            <p>
                              {alamat.desa ? `${alamat.desa}, ` : ""}
                              {alamat.kecamatan ? `${alamat.kecamatan}, ` : ""}
                              {alamat.kabupaten_kota
                                ? `${alamat.kabupaten_kota}, `
                                : ""}
                              {alamat.provinsi ? `${alamat.provinsi}, ` : ""}
                              {alamat.kode_pos || ""}
                            </p>

                            <p className="text-sm text-gray-600">
                              ID RajaOngkir: {alamat.destination_id || "-"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleHapusAlamat(alamat.id_alamat)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <input
                    name="label_alamat"
                    value={formAlamat.label_alamat}
                    onChange={handleChangeAlamat}
                    placeholder="Label alamat, contoh: Rumah"
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none placeholder:text-gray-500"
                  />

                  <input
                    name="nama_penerima"
                    value={formAlamat.nama_penerima}
                    onChange={handleChangeAlamat}
                    placeholder="Nama penerima"
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none placeholder:text-gray-500"
                  />

                  <input
                    name="no_telp_penerima"
                    value={formAlamat.no_telp_penerima}
                    onChange={handleChangeAlamat}
                    placeholder="No telepon penerima"
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none placeholder:text-gray-500"
                  />

                  <select
                    value={selectedProvinceId}
                    onChange={handlePilihProvinsi}
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none"
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
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none disabled:opacity-60"
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
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none disabled:opacity-60"
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
                    className="rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none disabled:opacity-60"
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
                    className="rounded-md bg-[#e9e3dc] px-4 py-3 font-serif outline-none placeholder:text-gray-500"
                  />

                  <div className="col-span-2">
                    <label className="mb-2 block font-serif font-bold">
                      Informasi Tambahan
                    </label>

                    <textarea
                      name="informasi_tambahan"
                      value={formAlamat.informasi_tambahan}
                      onChange={handleChangeAlamat}
                      placeholder="Contoh: Jl. Melati No. 10, RT 01/RW 02, rumah pagar hitam"
                      className="h-28 w-full resize-none rounded-md bg-[#f3efe9] px-4 py-3 font-serif outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTambahAlamat}
                  disabled={savingAlamat}
                  className="mt-5 flex items-center gap-2 rounded-md bg-black px-7 py-3 font-serif text-white hover:bg-[#b89578] transition disabled:opacity-60"
                >
                  <Plus size={20} />
                  {savingAlamat ? "Menyimpan..." : "Simpan / Tambah Alamat"}
                </button>
              </div>

              <div className="mt-20 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-serif font-bold hover:text-red-500 transition"
                >
                  <LogOut size={22} className="fill-black hover:fill-red-500" />
                  Keluar
                </button>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}