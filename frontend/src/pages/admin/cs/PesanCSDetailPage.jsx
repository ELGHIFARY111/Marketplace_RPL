import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PesanCSDetailPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balasan, setBalasan] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      const { data } = await api.get('/cs');
      const msg = data.find(m => m.id_pesan.toString() === id);
      if (msg) setMessage(msg);
    } catch (err) {
      console.error('Failed to fetch message detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.put(`/cs/${id}/reply`);
      alert('Berhasil menandai pesan sebagai sudah dibalas.');
      // In a real system, we'd send the `balasan` via email here
      fetchMessage();
      setBalasan('');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal membalas pesan');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat detail pesan..." />;
  if (!message) return <div>Pesan tidak ditemukan</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/cs" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>&larr; Kembali</Link>
        <h1 style={{ margin: 0 }}>Detail Pesan CS</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', alignSelf: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Dari:</p>
              <strong>{message.nama_lengkap}</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Tanggal:</p>
              <strong>{new Date(message.tgl_kirim).toLocaleString('id-ID')}</strong>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Subjek:</p>
            <h3 style={{ color: 'var(--primary)' }}>{message.subjek}</h3>
          </div>
          
          <div>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Isi Pesan:</p>
            <div style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--border)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {message.isi_pesan}
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Balas Pesan</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ marginRight: '0.5rem' }}>Status Saat Ini:</span>
            <span className={`badge badge-${message.status_balasan === 'Belum Dibalas' ? 'warning' : 'success'}`}>
              {message.status_balasan}
            </span>
          </div>

          <form onSubmit={handleReply}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Isi Balasan (akan dikirim ke email pelanggan)</label>
              <textarea 
                required
                className="form-control"
                rows={8}
                value={balasan}
                onChange={e => setBalasan(e.target.value)}
                placeholder="Tuliskan balasan Anda di sini..."
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={sending || message.status_balasan === 'Sudah Dibalas'}
            >
              {sending ? 'Mengirim...' : message.status_balasan === 'Sudah Dibalas' ? 'Telah Dibalas' : 'Kirim Balasan & Tandai Selesai'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default PesanCSDetailPage;
