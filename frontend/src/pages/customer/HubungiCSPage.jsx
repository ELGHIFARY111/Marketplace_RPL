import { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const HubungiCSPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    subjek: '',
    isi_pesan: ''
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Anda harus login untuk mengirim pesan');
    
    setSending(true);
    setSuccess(false);
    try {
      await api.post('/cs', form);
      setSuccess(true);
      setForm({ subjek: '', isi_pesan: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengirim pesan');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Hubungi Customer Service</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
        Ada pertanyaan atau masalah terkait pesanan? Silakan kirimkan pesan kepada tim kami.
      </p>

      {success && (
        <div style={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4caf50', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#4caf50', textAlign: 'center' }}>
          Pesan berhasil dikirim! Tim kami akan segera merespons melalui email Anda.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Subjek</label>
          <input 
            type="text" 
            required
            value={form.subjek}
            onChange={e => setForm({...form, subjek: e.target.value})}
            placeholder="Contoh: Pertanyaan tentang pesanan #ORD-1234"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-input)', color: '#fff' }}
          />
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Pesan</label>
          <textarea 
            required
            value={form.isi_pesan}
            onChange={e => setForm({...form, isi_pesan: e.target.value})}
            placeholder="Tuliskan keluhan atau pertanyaan Anda secara detail di sini..."
            rows={6}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-input)', color: '#fff', resize: 'vertical' }}
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          disabled={sending || !user}
        >
          {sending ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
        
        {!user && <p style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>Anda harus login terlebih dahulu.</p>}
      </form>
    </div>
  );
};

export default HubungiCSPage;
