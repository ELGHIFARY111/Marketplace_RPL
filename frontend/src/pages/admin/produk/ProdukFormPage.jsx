import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ProdukFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    id_kategori: '',
    nama_produk: '',
    deskripsi: '',
    harga: '',
    stok: '',
    berat: ''
  });
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);       // File objects
  const [previewURLs, setPreviewURLs] = useState([]);   // URL previews of new photos
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingPhoto, setDeletingPhoto] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

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
          berat: p.berat || ''
        });
        setExistingPhotos(p.foto || []);
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

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files);
    setNewPhotos(prev => [...prev, ...files]);
    const previews = files.map(f => URL.createObjectURL(f));
    setPreviewURLs(prev => [...prev, ...previews]);
    e.target.value = '';
  };

  const removeNewPhoto = (idx) => {
    URL.revokeObjectURL(previewURLs[idx]);
    setNewPhotos(prev => prev.filter((_, i) => i !== idx));
    setPreviewURLs(prev => prev.filter((_, i) => i !== idx));
  };

  const removeExistingPhoto = async (fotoId) => {
    if (!window.confirm('Hapus foto ini?')) return;
    setDeletingPhoto(fotoId);
    try {
      await api.delete(`/produk/${id}/foto/${fotoId}`);
      setExistingPhotos(prev => prev.filter(f => f.id_foto !== fotoId));
    } catch (err) {
      alert('Gagal menghapus foto');
    } finally {
      setDeletingPhoto(null);
    }
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

      if (newPhotos.length > 0) {
        const formData = new FormData();
        newPhotos.forEach(file => formData.append('foto', file));
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

  const handleCancel = () => navigate('/admin/produk');

  if (loading) return <LoadingSpinner text="Memuat form produk..." />;

  const allPhotoCount = existingPhotos.length + newPhotos.length;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Produk dan Stok{' '}
          <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>
            Produk &gt; {isEdit ? 'edit' : 'tambah'}
          </span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={handleCancel} className="btn"
          style={{ background: '#e0e0e0', border: 'none', color: '#111', padding: '0.6rem 1.8rem' }}>
          Batal
        </button>
        <button form="produk-form" type="submit" className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '0.6rem 1.8rem' }}
          disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <form id="produk-form" onSubmit={handleSubmit}>
        {/* Nama Produk */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Nama Produk</label>
          <input
            type="text"
            required
            className="form-control"
            value={form.nama_produk}
            onChange={e => setForm({ ...form, nama_produk: e.target.value })}
            placeholder="Masukkan Nama..."
            style={{ maxWidth: '520px', background: '#f0f0f0', border: 'none', borderRadius: '8px' }}
          />
        </div>

        {/* Kategori Produk */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Kategori Produk</label>
          <select
            required
            className="form-control"
            value={form.id_kategori}
            onChange={e => setForm({ ...form, id_kategori: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0', border: 'none', borderRadius: '8px' }}
          >
            <option value="">Masukkan Kategori...</option>
            {categories.map(c => (
              <option key={c.id_kategori} value={c.id_kategori}>{c.nama_kategori}</option>
            ))}
          </select>
        </div>

        {/* Deskripsi Produk */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>
          <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0, marginTop: '0.5rem' }}>Deskrisi Produk</label>
          <textarea
            required
            className="form-control"
            rows={5}
            value={form.deskripsi}
            onChange={e => setForm({ ...form, deskripsi: e.target.value })}
            placeholder="Masukkan Deskripsi..."
            style={{ maxWidth: '520px', background: '#f0f0f0', border: 'none', borderRadius: '8px', resize: 'vertical' }}
          />
        </div>

        {/* Hidden fields: harga, stok, berat */}
        <input type="hidden" value={form.harga} onChange={e => setForm({ ...form, harga: e.target.value })} />

        {/* Foto Produk */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0, marginTop: '0.5rem' }}>Foto Produk</label>
          <div style={{ flex: 1, maxWidth: '680px' }}>
            {/* Add Photo Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              style={{
                background: '#4caf50', color: '#fff', border: 'none', borderRadius: '8px',
                padding: '0.5rem 1.5rem', fontWeight: 700, cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem'
              }}
            >
              Tambah +
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoAdd}
            />

            {/* Photo Grid */}
            {allPhotoCount > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '0.5rem',
              }}>
                {/* Existing Photos */}
                {existingPhotos.map(foto => (
                  <div key={foto.id_foto} style={{ position: 'relative' }}>
                    <img
                      src={foto.file_foto && foto.file_foto !== 'placeholder.jpg'
                        ? `${API_URL}/${foto.file_foto}`
                        : 'https://placehold.co/120x120/e8e8e8/666'}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '8px', background: '#e8e8e8' }}
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingPhoto(foto.id_foto)}
                      disabled={deletingPhoto === foto.id_foto}
                      style={{
                        position: 'absolute', top: '4px', right: '4px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#ff0000', fontSize: '1.2rem', fontWeight: 900, lineHeight: 1,
                        textShadow: '0 0 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* New Photos (preview) */}
                {previewURLs.map((url, idx) => (
                  <div key={`new-${idx}`} style={{ position: 'relative' }}>
                    <img
                      src={url}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '8px' }}
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => removeNewPhoto(idx)}
                      style={{
                        position: 'absolute', top: '4px', right: '4px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#ff0000', fontSize: '1.2rem', fontWeight: 900, lineHeight: 1,
                        textShadow: '0 0 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div style={{
                background: '#f0f0f0', borderRadius: '12px', padding: '2.5rem',
                textAlign: 'center', color: '#666'
              }}>
                <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1rem' }}>
                  Belum ada foto produk, silahkan tambahkan...
                </p>
                <div style={{
                  width: '80px', height: '80px', margin: '0 auto',
                  border: '3px solid #888', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#888'
                }}>
                  🖼
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extra fields for Tambah mode (harga, stok, berat) - shown at bottom */}
        {!isEdit && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
              <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Harga Dasar (Rp)</label>
              <input
                type="number"
                required
                className="form-control"
                value={form.harga}
                onChange={e => setForm({ ...form, harga: e.target.value })}
                placeholder="Contoh: 150000"
                style={{ maxWidth: '300px', background: '#f0f0f0', border: 'none', borderRadius: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
              <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Stok Global</label>
              <input
                type="number"
                required
                className="form-control"
                value={form.stok}
                onChange={e => setForm({ ...form, stok: e.target.value })}
                placeholder="Total stok"
                style={{ maxWidth: '300px', background: '#f0f0f0', border: 'none', borderRadius: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
              <label style={{ width: '180px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Berat (gram)</label>
              <input
                type="number"
                required
                className="form-control"
                value={form.berat}
                onChange={e => setForm({ ...form, berat: e.target.value })}
                placeholder="Untuk ongkos kirim"
                style={{ maxWidth: '300px', background: '#f0f0f0', border: 'none', borderRadius: '8px' }}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProdukFormPage;
