// User Profile Page Template
import { useState, useEffect } from 'react';

export default function ProfilPage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // TODO: Fetch user profile dari API
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    // TODO: Update profile ke API
    setIsEditing(false);
  };

  return (
    <div className="profil-page">
      <h1>My Profile</h1>
      <div className="profile-info">
        {isEditing ? (
          <form>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}
