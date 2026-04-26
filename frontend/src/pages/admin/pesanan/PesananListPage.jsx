import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const STATUS_COLORS = {
  'Dikirim':    { bg: '#2196F3', color: '#fff' },
  'Diproses':   { bg: '#9C27B0', color: '#fff' },
  'Selesai':    { bg: '#4CAF50', color: '#fff' },
  'Dibatalkan': { bg: '#f44336', color: '#fff' },
  'Pembayaran': { bg: '#FF9800', color: '#fff' },
  'Belum Bayar':{ bg: '#FF9800', color: '#fff' },
  'Sudah Bayar':{ bg: '#2196F3', color: '#fff' },
};

const PesananListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [newStatus, setNewStatus] = useState('Dikirim');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/pesanan');
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = orders.filter(o =>
    o.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
    o.no_pesanan?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? filtered.map(o => o.id_pesanan) : []);
  };

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBatalkan = () => setSelected([]);

  const handlePerbarui = async () => {
    if (selected.length === 0) return alert('Pilih pesanan terlebih dahulu.');
    if (!window.confirm(`Update status ${selected.length} pesanan menjadi "${newStatus}"?`)) return;
    setUpdating(true);
    try {
      await Promise.all(selected.map(id => api.put(`/pesanan/${id}/status`, { status_pesanan: newStatus })));
      alert('Status berhasil diperbarui!');
      setSelected([]);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data pesanan..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Pesanan
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Pesanan &gt; perbarui status
        </p>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Pencarian ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingRight: '2.5rem' }}
          />
          <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#999', pointerEvents: 'none' }}>🔍</span>
        </div>

        {/* Pilih Semua */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <input
            type="checkbox"
            checked={selected.length === filtered.length && filtered.length > 0}
            onChange={handleSelectAll}
            style={{ width: '16px', height: '16px' }}
          />
          Pilih Semua
        </label>

        {/* Batal & Perbarui */}
        <button
          onClick={handleBatalkan}
          className="btn"
          style={{ background: '#e0e0e0', border: 'none', color: '#111' }}
        >
          Batal
        </button>
        <button
          onClick={handlePerbarui}
          className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none' }}
          disabled={updating}
        >
          {updating ? 'Memperbarui...' : 'Perbarui'}
        </button>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => {
              const statusStyle = STATUS_COLORS[o.status_pesanan] || { bg: '#9E9E9E', color: '#fff' };
              return (
                <tr key={o.id_pesanan}>
                  <td>
                    <Link to={`/admin/pesanan/${o.id_pesanan}`} style={{ color: 'inherit', fontWeight: 600 }}>
                      {i + 1}
                    </Link>
                  </td>
                  <td style={{ fontWeight: 500 }}>{o.nama_lengkap || 'User'}</td>
                  <td>{new Date(o.tgl_pesanan).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                  <td>{formatRupiah(o.total_harga)}</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.9rem',
                      borderRadius: '6px',
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}>
                      {o.status_pesanan}
                    </span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(o.id_pesanan)}
                      onChange={() => handleSelect(o.id_pesanan)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                  Belum ada pesanan masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PesananListPage;
