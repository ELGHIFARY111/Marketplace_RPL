import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ProdukFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id_kategori: '',
    nama_produk: '',
    deskripsi: '',
    harga: '',
    stok: '',
    berat: ''
  });
  const [photos, setPhotos] = useState([]); // Multiple file upload
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const catRes = await api.get('/kategori');
      setCategories(catRes.data);

      if (isEdit) {
        const prodRes = await api.get(`/produk/${id}`);
        const p = prodRes.data;
        setForm({
          id_kategori: p.id_kategori,
          nama_produk: p.nama_produk,
          deskripsi: p.deskripsi,
          harga: p.harga,
          stok: p.stok,
          berat: p.berat
        });
      } else {
        if (catRes.data.length > 0) {
          setForm(prev => ({ ...prev, id_kategori: catRes.data[0].id_kategori }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let productId = id;

      if (isEdit) {
        await api.put(`/produk/${id}`, form);
      } else {
        const { data } = await api.post('/produk', form);
        productId = data.id_produk;
      }

      // Upload photos if any
      if (photos.length > 0) {
        const formData = new FormData();
        photos.forEach(file => {
          formData.append('foto', file);
        });
        await api.post(`/produk/${productId}/foto`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert(`Produk berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
      navigate('/admin/produk');
    } catch (err) {
      alert(err.response?.data?.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} produk`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/produk" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>{isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h1>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Kategori Produk</label>
            <select 
              required
              className="form-control"
              value={form.id_kategori}
              onChange={e => setForm({...form, id_kategori: e.target.value})}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map(c => (
                <option key={c.id_kategori} value={c.id_kategori}>{c.nama_kategori}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Nama Produk</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={form.nama_produk}
              onChange={e => setForm({...form, nama_produk: e.target.value})}
              placeholder="Contoh: Kemeja Flanel Kotak-kotak"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Deskripsi Produk</label>
            <textarea 
              required
              className="form-control"
              rows={6}
              value={form.deskripsi}
              onChange={e => setForm({...form, deskripsi: e.target.value})}
              placeholder="Tuliskan spesifikasi, bahan, dll..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Harga Dasar (Rp)</label>
              <input 
                type="number" 
                required
                className="form-control"
                value={form.harga}
                onChange={e => setForm({...form, harga: e.target.value})}
                placeholder="Contoh: 150000"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Stok Global</label>
              <input 
                type="number" 
                required
                className="form-control"
                value={form.stok}
                onChange={e => setForm({...form, stok: e.target.value})}
                placeholder="Total stok keseluruhan"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Berat (gram)</label>
              <input 
                type="number" 
                required
                className="form-control"
                value={form.berat}
                onChange={e => setForm({...form, berat: e.target.value})}
                placeholder="Untuk keperluan ongkir"
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Upload Foto Baru (Maks 5 file)</label>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              className="form-control"
              onChange={handlePhotoChange}
              style={{ padding: '0.5rem' }}
            />
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              *Foto lama tidak akan terhapus secara otomatis. Jika ini edit produk, foto baru akan ditambahkan.
            </p>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Produk')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProdukFormPage;
