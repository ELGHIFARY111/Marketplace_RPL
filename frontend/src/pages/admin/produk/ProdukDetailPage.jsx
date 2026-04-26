import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const ProdukDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [extraPhotos, setExtraPhotos] = useState(0);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const { data } = await api.get(`/produk/${id}`);
      setProduct(data);
      if (data.foto?.length > 3) setExtraPhotos(data.foto.length - 3);
    } catch (err) {
      console.error('Failed to fetch detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVarian = async (idVarian) => {
    if (!window.confirm('Hapus varian ini?')) return;
    try {
      await api.delete(`/produk/${id}/varian/${idVarian}`);
      fetchDetail();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus varian');
    }
  };

  if (loading) return <LoadingSpinner text="Memuat detail produk..." />;
  if (!product) return <div>Produk tidak ditemukan</div>;

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const displayPhotos = product.foto?.slice(0, 3) || [];
  const hasExtra = (product.foto?.length || 0) > 3;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Produk dan Stok{' '}
          <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>
            Produk &gt; detail
          </span>
        </h1>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Product Info + Edit Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <Link
          to={`/admin/produk/edit/${id}`}
          className="btn"
          style={{ background: '#FF9800', color: '#fff', border: 'none', padding: '0.5rem 2rem' }}
        >
          Edit
        </Link>
      </div>

      {/* Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Left: Product Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { label: 'Nama Produk', value: product.nama_produk },
            { label: 'Kategori Produk', value: product.nama_kategori },
            { label: 'Deskrisi Produk', value: product.deskripsi },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <span style={{ width: '160px', fontWeight: 600, fontSize: '0.95rem', flexShrink: 0 }}>{label}</span>
              <div style={{
                flex: 1,
                background: '#f0f0f0',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                minHeight: label === 'Deskrisi Produk' ? '80px' : 'auto',
                fontSize: '0.95rem',
                color: '#333',
                whiteSpace: 'pre-wrap',
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Photos */}
        <div>
          <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Foto Produk</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {/* Main photo - larger */}
            {displayPhotos[0] && (
              <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
                <img
                  src={displayPhotos[0].file_foto && displayPhotos[0].file_foto !== 'placeholder.jpg'
                    ? `${API_URL}/${displayPhotos[0].file_foto}`
                    : 'https://placehold.co/200x200/e8e8e8/666'}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                  alt=""
                />
              </div>
            )}
            {/* Secondary photos */}
            {displayPhotos[1] && (
              <img
                src={displayPhotos[1].file_foto && displayPhotos[1].file_foto !== 'placeholder.jpg'
                  ? `${API_URL}/${displayPhotos[1].file_foto}`
                  : 'https://placehold.co/100x100/e8e8e8/666'}
                style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                alt=""
              />
            )}
            {displayPhotos[2] && (
              <div style={{ position: 'relative' }}>
                <img
                  src={displayPhotos[2].file_foto && displayPhotos[2].file_foto !== 'placeholder.jpg'
                    ? `${API_URL}/${displayPhotos[2].file_foto}`
                    : 'https://placehold.co/100x100/e8e8e8/666'}
                  style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                  alt=""
                />
                {hasExtra && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '1.2rem'
                  }}>
                    +{product.foto.length - 3}
                  </div>
                )}
              </div>
            )}
            {/* No photos */}
            {(!product.foto || product.foto.length === 0) && (
              <div style={{ gridColumn: '1 / 3', background: '#f0f0f0', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: '#888' }}>
                Belum ada foto.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Variant Table */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 1.5rem' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, margin: 0 }}>Variasi Produk</h3>
        <Link
          to={`/admin/produk/${id}/varian/tambah`}
          className="btn"
          style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '0.4rem 1.5rem' }}
        >
          Tambah +
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Warna</th>
              <th>Ukuran</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {product.varian?.map((v, i) => (
              <tr key={v.id_varian}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{v.sku || `M_${v.id_varian}`}</td>
                <td>{v.warna}</td>
                <td>{v.ukuran}</td>
                <td>{v.stok}</td>
                <td>{formatRupiah(v.harga)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Link
                      to={`/admin/produk/${id}/varian/${v.id_varian}`}
                      className="btn btn-sm"
                      style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/admin/produk/${id}/varian/${v.id_varian}/edit`}
                      className="btn btn-sm"
                      style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteVarian(v.id_varian)}
                      className="btn btn-sm"
                      style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px' }}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!product.varian || product.varian.length === 0) && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#888', padding: '1.5rem' }}>
                  Belum ada variasi produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProdukDetailPage;
