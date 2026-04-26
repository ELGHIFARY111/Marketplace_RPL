// Customer Location/Lokasi Page
import { useState } from 'react';

export default function LokasiPage() {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    province: '',
    postal_code: '',
    is_default: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save address to API
  };

  return (
    <div className="lokasi-page">
      <h1>My Addresses</h1>
      <form onSubmit={handleSubmit} className="address-form">
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Province"
          value={address.province}
          onChange={(e) => setAddress({ ...address, province: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={address.postal_code}
          onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={address.is_default}
            onChange={(e) => setAddress({ ...address, is_default: e.target.checked })}
          />
          Set as default address
        </label>
        <button type="submit">Add Address</button>
      </form>

      <div className="saved-addresses">
        <h2>Saved Addresses</h2>
        {/* List of saved addresses */}
      </div>
    </div>
  );
}
