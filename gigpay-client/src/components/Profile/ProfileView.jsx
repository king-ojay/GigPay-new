// src/components/Profile/ProfileView.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function ProfileView() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/profile')
      .then(res => setProfile(res.data))
      .catch(err => alert(err.message));
  }, []);

  if (!profile) return <p className="text-center">Loading profile…</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{profile.name || 'Your Profile'}</h2>
      <p className="mb-2"><strong>Bio:</strong> {profile.bio}</p>
      <p className="mb-2"><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <p className="mb-4"><strong>Location:</strong> {profile.location}</p>
      <Link to="/profile/edit" className="text-blue-600">
        Edit Profile
      </Link>
    </div>
  );
}
