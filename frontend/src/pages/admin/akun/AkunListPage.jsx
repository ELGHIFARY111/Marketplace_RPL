import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AkunListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus akun ini?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus akun');
    }
  };

  const filtered = users.filter(u =>
    u.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner text="Memuat data akun..." />;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>
          Akun dan Akses
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Akun &gt; daftar
        </p>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0 1.5rem' }} />

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
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
        <Link to="/admin/akun/tambah" className="btn btn-primary" style={{ background: '#4caf50', border: 'none', whiteSpace: 'nowrap' }}>
          + Tambah Akun
        </Link>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Lengkap</th>
              <th>Email</th>
              <th>No. HP</th>
              <th>Level Akses</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id_user}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 500 }}>{u.nama_lengkap}</td>
                <td>{u.email}</td>
                <td>{u.no_hp || '-'}</td>
                <td>
                  <span className={`badge ${u.level_akses === 'admin' ? 'badge-blue' : 'badge-gray'}`}
                    style={{ textTransform: 'capitalize' }}>
                    {u.level_akses}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Link
                      to={`/admin/akun/${u.id_user}/edit`}
                      className="btn btn-outline btn-sm"
                      style={{ background: '#e8e8e8', border: 'none', color: '#111', borderRadius: '6px' }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(u.id_user)}
                      className="btn btn-sm"
                      style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px' }}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                  Tidak ada akun yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AkunListPage;
