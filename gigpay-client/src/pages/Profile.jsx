// src/pages/Profile.jsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../pages/Profile.css';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    // You can fetch actual profile data here if connected to backend
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving profile...', formData);
    alert('Profile updated!');
    // TODO: Send updated profile to backend
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Full Name
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} type="email" required />
        </label>

        <label>
          Phone Number
          <input name="phone" value={formData.phone} onChange={handleChange} type="tel" />
        </label>

        <label>
          Location
          <input name="location" value={formData.location} onChange={handleChange} />
        </label>

        <label>
          Short Bio
          <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
