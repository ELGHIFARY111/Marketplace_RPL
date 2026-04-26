import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const VoucherListPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const { data } = await api.get('/voucher');
      setVouchers(data);
    } catch (err) {
      console.error('Failed to fetch vouchers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus voucher ini?')) return;
    try {
      await api.delete(`/voucher/${id}`);
      fetchVouchers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus voucher');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat data voucher..." />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Kelola Voucher</h1>
        <Link to="/admin/voucher/tambah" className="btn btn-primary">+ Tambah Voucher</Link>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Kode Voucher</th>
                <th>Diskon</th>
                <th>Max. Potongan</th>
                <th>Min. Belanja</th>
                <th>Batas Waktu</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map(v => {
                const isExpired = new Date() > new Date(v.batas_waktu);

                return (
                  <tr key={v.id_voucher}>
                    <td><strong>{v.kode_voucher}</strong></td>
                    <td>{v.persentase}%</td>
                    <td>{formatRupiah(v.maks_potongan)}</td>
                    <td>{formatRupiah(v.min_belanja)}</td>
                    <td>{new Date(v.batas_waktu).toLocaleDateString('id-ID')}</td>
                    <td>
                      <span className={`badge badge-${isExpired ? 'danger' : 'success'}`}>
                        {isExpired ? 'Kedaluwarsa' : 'Aktif'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/admin/voucher/edit/${v.id_voucher}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Edit</Link>
                        <button 
                          onClick={() => handleDelete(v.id_voucher)}
                          className="btn btn-outline" 
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', color: '#ff4444', borderColor: '#ff4444' }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {vouchers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>Belum ada data voucher.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VoucherListPage;
