import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ProfileView() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .get(`/users/${user.id}`)
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p className="p-6 text-center">Loading profile…</p>;
  if (!profile) return <p className="p-6 text-center">No profile found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      {profile.role === 'GigWorker' && (
        <>
          <p><strong>Skills:</strong> {profile.skills?.join(', ')}</p>
          <p><strong>Experience:</strong> {profile.experience}</p>
          <p><strong>Location:</strong> {profile.location}</p>
        </>
      )}
      {profile.role === 'Employer' && (
        <p><strong>Company Name:</strong> {profile.companyName}</p>
      )}
      <Link
        to="/profile/create"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit Profile
      </Link>
    </div>
  );
}
