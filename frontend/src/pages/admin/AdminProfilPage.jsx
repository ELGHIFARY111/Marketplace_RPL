// Admin Profil Page Template
import { useState, useEffect } from 'react';

export default function AdminProfilPage() {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // TODO: Fetch admin profile
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSave = async () => {
    // TODO: Update admin profile
    setIsEditing(false);
  };

  return (
    <div className="admin-profil-page">
      <h1>Admin Profile</h1>
      <div className="profile-section">
        {isEditing ? (
          <form>
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {adminData.name}</p>
            <p><strong>Email:</strong> {adminData.email}</p>
            <p><strong>Role:</strong> {adminData.role}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}
