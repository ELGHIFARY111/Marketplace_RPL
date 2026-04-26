import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const KuponTambahPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    kode_kupon: '',
    tgl_kadaluarsa: '',
    kuota: 0,
    persentase_diskon: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/kupon', form);
      alert('Kupon berhasil ditambahkan!');
      navigate('/admin/promosi/kupon');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambah kupon');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/admin/promosi/kupon');

  const adjustNum = (key, delta) => {
    setForm(prev => ({ ...prev, [key]: Math.max(0, Number(prev[key]) + delta) }));
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Kupon <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>Tambah</span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={handleCancel} className="btn" style={{ background: '#e0e0e0', border: 'none', color: '#111' }}>
          Batal
        </button>
        <button
          form="kupon-form"
          type="submit"
          className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none' }}
          disabled={saving}
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

      <form id="kupon-form" onSubmit={handleSubmit}>
        {/* Kode Kupon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Kode Kupon</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Masukkan Kode Kupon ..."
            value={form.kode_kupon}
            onChange={e => setForm({ ...form, kode_kupon: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }}
          />
        </div>

        {/* Tanggal Kadaluarsa */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Masukkan Tanggal Kadaluarsa</label>
          <input
            type="date"
            required
            className="form-control"
            placeholder="Masukkan Tanggal Kadaluarsa ....."
            value={form.tgl_kadaluarsa}
            onChange={e => setForm({ ...form, tgl_kadaluarsa: e.target.value })}
            style={{ maxWidth: '520px', background: '#f0f0f0' }}
          />
        </div>

        {/* Kuota - stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Masukkan Kuota</label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', maxWidth: '520px', width: '100%' }}>
            <button type="button" onClick={() => adjustNum('kuota', 1)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 700 }}>+</button>
            <input
              type="number"
              value={form.kuota}
              onChange={e => setForm({ ...form, kuota: Math.max(0, Number(e.target.value)) })}
              style={{ flex: 1, border: 'none', background: 'none', textAlign: 'center', fontSize: '1rem', padding: '0.5rem' }}
            />
            <button type="button" onClick={() => adjustNum('kuota', -1)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 700 }}>−</button>
          </div>
        </div>

        {/* Persentase Diskon - stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ width: '260px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>Masukkan Presentase Diskon</label>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', maxWidth: '520px', width: '100%' }}>
            <button type="button" onClick={() => adjustNum('persentase_diskon', 1)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 700 }}>+</button>
            <span style={{ flex: 1, textAlign: 'center', fontSize: '1rem' }}>{form.persentase_diskon}%</span>
            <button type="button" onClick={() => adjustNum('persentase_diskon', -1)}
              style={{ padding: '0.75rem 1.25rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 700 }}>−</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default KuponTambahPage;
