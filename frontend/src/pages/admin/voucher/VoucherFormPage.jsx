import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const VoucherFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    kode_voucher: '',
    persentase: '',
    maks_potongan: '',
    min_belanja: '',
    batas_waktu: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchVoucher();
    }
  }, [id]);

  const fetchVoucher = async () => {
    try {
      const { data } = await api.get('/voucher');
      const v = data.find(v => v.id_voucher.toString() === id);
      if (v) {
        setForm({ 
          kode_voucher: v.kode_voucher,
          persentase: v.persentase,
          maks_potongan: v.maks_potongan,
          min_belanja: v.min_belanja,
          batas_waktu: new Date(v.batas_waktu).toISOString().split('T')[0]
        });
      } else {
        alert('Voucher tidak ditemukan');
        navigate('/admin/voucher');
      }
    } catch (err) {
      console.error('Failed to fetch voucher:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/voucher/${id}`, form);
      } else {
        await api.post('/voucher', form);
      }
      alert(`Voucher berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
      navigate('/admin/voucher');
    } catch (err) {
      alert(err.response?.data?.message || `Gagal ${isEdit ? 'memperbarui' : 'menambah'} voucher`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat form..." />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/voucher" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>{isEdit ? 'Edit Voucher' : 'Tambah Voucher'}</h1>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Kode Voucher</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={form.kode_voucher}
              onChange={e => setForm({...form, kode_voucher: e.target.value.toUpperCase()})}
              placeholder="Contoh: ZENVY2024"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Persentase Diskon (%)</label>
            <input 
              type="number" 
              required
              min="1"
              max="100"
              className="form-control"
              value={form.persentase}
              onChange={e => setForm({...form, persentase: e.target.value})}
              placeholder="Contoh: 10"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Maksimal Potongan (Rp)</label>
            <input 
              type="number" 
              required
              className="form-control"
              value={form.maks_potongan}
              onChange={e => setForm({...form, maks_potongan: e.target.value})}
              placeholder="Contoh: 50000"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Minimal Belanja (Rp)</label>
            <input 
              type="number" 
              required
              className="form-control"
              value={form.min_belanja}
              onChange={e => setForm({...form, min_belanja: e.target.value})}
              placeholder="Contoh: 100000"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Batas Waktu</label>
            <input 
              type="date" 
              required
              className="form-control"
              value={form.batas_waktu}
              onChange={e => setForm({...form, batas_waktu: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={saving}
          >
            {saving ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Voucher')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoucherFormPage;
