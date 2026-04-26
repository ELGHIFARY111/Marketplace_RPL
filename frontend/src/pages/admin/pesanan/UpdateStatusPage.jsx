import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../services/api';

const STATUS_OPTIONS = [
  { label: 'Diproses',   bg: '#9C27B0', color: '#fff' },
  { label: 'Dikirim',    bg: '#2196F3', color: '#fff' },
  { label: 'Dibatalkan', bg: '#f44336', color: '#fff' },
  { label: 'Pembayaran', bg: '#FF9800', color: '#fff' },
  { label: 'Selesai',    bg: '#4CAF50', color: '#fff' },
];

const UpdateStatusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // IDs and current status may be passed via navigation state
  const ids = location.state?.ids || [];
  const currentStatus = location.state?.currentStatus || 'Dikirim';

  const [selectedStatus, setSelectedStatus] = useState('Dikirim');
  const [updating, setUpdating] = useState(false);

  const handleConfirm = async () => {
    if (ids.length === 0) return alert('Tidak ada pesanan yang dipilih.');
    if (!window.confirm(`Konfirmasi update status menjadi "${selectedStatus}"?`)) return;
    setUpdating(true);
    try {
      await Promise.all(ids.map(id => api.put(`/pesanan/${id}/status`, { status_pesanan: selectedStatus })));
      alert('Status berhasil diperbarui!');
      navigate('/admin/pesanan');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal memperbarui status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Card wrapper */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
      }}>
        {/* Header */}
        <div style={{
          background: '#e8e0d8',
          padding: '1.25rem 2rem',
          textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', margin: 0 }}>
            Konfirmasi Update Status Pesanan
          </h2>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>
          {/* ID Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
            <label style={{ width: '100px', fontWeight: 700, fontSize: '1rem' }}>ID</label>
            <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1rem', color: '#333' }}>
              {ids.length > 0 ? ids.join(' , ') : '—'}
            </div>
          </div>

          {/* Current Status Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <label style={{ width: '100px', fontWeight: 700, fontSize: '1rem' }}>Status</label>
            <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1rem', color: '#333' }}>
              {currentStatus}
            </div>
          </div>

          {/* Status Radio Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem 1.5rem', marginBottom: '2rem' }}>
            {STATUS_OPTIONS.map(opt => (
              <label
                key={opt.label}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              >
                <input
                  type="radio"
                  name="status"
                  value={opt.label}
                  checked={selectedStatus === opt.label}
                  onChange={() => setSelectedStatus(opt.label)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{
                  padding: '0.4rem 1.1rem',
                  borderRadius: '6px',
                  background: opt.bg,
                  color: opt.color,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>

          {/* Hint */}
          <p style={{ fontSize: '0.9rem', color: '#444', marginBottom: '2rem', fontWeight: 500 }}>
            *Pilih lah salah satu status yang diinginkan, atau pilih hapus untuk menghapus pesanan
          </p>

          {/* Confirm Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleConfirm}
              disabled={updating}
              style={{
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.85rem 4rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {updating ? 'Memproses...' : 'Konfirmasi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusPage;
