import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pesananHariIni: 0,
    pesananDiproses: 0,
    pesananSelesai: 0,
    pendapatan: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [users, pesanan] = await Promise.all([
        api.get('/users'),
        api.get('/pesanan')
      ]);

      const allPesanan = pesanan.data;
      const pesananHariIni = allPesanan.length; // Simplified for mock
      const pesananDiproses = allPesanan.filter(p => p.status_pesanan === 'Diproses').length;
      const pesananSelesai = allPesanan.filter(p => p.status_pesanan === 'Selesai').length;
      const pendapatan = allPesanan.filter(p => p.status_pesanan === 'Selesai').reduce((sum, p) => sum + p.total_harga, 0);

      setStats({
        totalUsers: users.data.length,
        pesananHariIni,
        pesananDiproses,
        pesananSelesai,
        pendapatan
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat dashboard..." />;

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Total Konsumen */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Total Konsumen</p>
          <div style={{ background: '#f5f2eb', borderRadius: '16px', padding: '2rem 1rem', fontSize: '3.5rem', fontWeight: 700 }}>
            {stats.totalUsers}
          </div>
        </div>

        {/* Total Pesanan Hari Ini */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Total Pesanan hari ini</p>
          <div style={{ background: '#f5f2eb', borderRadius: '16px', padding: '2rem 1rem', fontSize: '3.5rem', fontWeight: 700 }}>
            {stats.pesananHariIni}
          </div>
        </div>

        {/* Pesanan Hari Ini (Split) */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Pesanan hari ini</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#666' }}>Pesanan diproses</p>
              <div style={{ background: '#f5f2eb', borderRadius: '16px', padding: '1rem', fontSize: '2.5rem', fontWeight: 700, color: '#f59e0b' }}>
                {stats.pesananDiproses}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#666' }}>Pesanan Selesai</p>
              <div style={{ background: '#f5f2eb', borderRadius: '16px', padding: '1rem', fontSize: '2.5rem', fontWeight: 700, color: '#22c55e' }}>
                {stats.pesananSelesai}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pendapatan */}
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Total Pendapatan/Bulan</p>
        <div style={{ background: '#f5f2eb', borderRadius: '16px', padding: '2rem', fontSize: '2.5rem', fontWeight: 700 }}>
          {formatRupiah(stats.pendapatan)}
        </div>
      </div>

      {/* Notifikasi */}
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1.1rem' }}>Notifikasi</p>
        <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ background: '#e0e0e0', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem', color: '#333' }}>
            ⚠️ Stok Kritis: Sisa 2 pcs untuk 'Kemeja Flanel Merah - Size L'. Segera lakukan restock!
          </div>

          <div style={{ background: '#e0e0e0', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem', color: '#333' }}>
            🔴 Stok Habis: Produk 'Kaos Basic Hitam - Size M' telah habis terjual. Otomatis disembunyikan dari katalog.
          </div>

          <div style={{ background: '#e0e0e0', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem', color: '#333' }}>
            📦 Batas Pengiriman: Pesanan #ORD-0450 harus segera dikirim sebelum jam 15.00 WIB hari ini.
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
