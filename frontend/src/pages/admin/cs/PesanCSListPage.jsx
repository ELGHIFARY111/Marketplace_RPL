import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PesanCSListPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/cs');
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat pesan..." />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Kelola Pesan Customer Service</h1>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tanggal</th>
                <th>Pengirim</th>
                <th>Subjek</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id_pesan}>
                  <td>{m.id_pesan}</td>
                  <td>{new Date(m.tgl_kirim).toLocaleDateString('id-ID')}</td>
                  <td>{m.nama_lengkap}</td>
                  <td>{m.subjek}</td>
                  <td>
                    <span className={`badge badge-${m.status_balasan === 'Belum Dibalas' ? 'warning' : 'success'}`}>
                      {m.status_balasan}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/cs/${m.id_pesan}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Detail / Balas</Link>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>Belum ada pesan masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesanCSListPage;
