import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const VarianDetailPage = () => {
  const { id, vid } = useParams();
  const navigate = useNavigate();
  const [varian, setVarian] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/produk/${id}`);
        const v = data.varian?.find(v => v.id_varian.toString() === vid);
        setVarian(v || null);
      } catch (err) {
        console.error('Failed to fetch varian:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, vid]);

  if (loading) return <LoadingSpinner text="Memuat detail variasi..." />;
  if (!varian) return <div>Variasi tidak ditemukan.</div>;

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Produk dan Stok{' '}
          <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>
            Produk &gt; detail &gt; variasi
          </span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate(`/admin/produk/${id}/varian/${vid}/edit`)} className="btn"
          style={{ background: '#FF9800', color: '#fff', border: 'none' }}>
          Edit Variasi
        </button>
        <button onClick={() => navigate(`/admin/produk/${id}`)} className="btn"
          style={{ background: '#e0e0e0', border: 'none', color: '#111' }}>
          Kembali
        </button>
      </div>

      {[
        { label: 'SKU', value: varian.sku || `M_${varian.id_varian}` },
        { label: 'Warna', value: varian.warna },
        { label: 'Ukuran', value: varian.ukuran },
        { label: 'Stok', value: varian.stok },
        { label: 'Harga', value: formatRupiah(varian.harga) },
      ].map(({ label, value }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.25rem' }}>
          <label style={{ width: '140px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>{label}</label>
          <div style={{ flex: 1, maxWidth: '520px', background: '#f0f0f0', borderRadius: '8px', padding: '0.7rem 1rem', fontSize: '1rem' }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VarianDetailPage;
