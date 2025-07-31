import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileCreate() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    bio: '',
    skills: '',
    experience: '',
    location: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    api
      .get(`/users/${user.id}`)
      .then(res => {
        const p = res.data;
        setProfile({
          bio: p.bio || '',
          skills: (p.skills || []).join(', '),
          experience: p.experience || '',
          location: p.location || '',
          companyName: p.companyName || ''
        });
      })
      .catch(console.error);
  }, [user]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        bio: profile.bio,
        skills: profile.skills.split(',').map(s => s.trim()),
        experience: profile.experience,
        location: profile.location,
        companyName: profile.companyName
      };
      await api.put(`/users/${user.id}`, payload);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.msg || 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <label className="block mb-1">Bio</label>
      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        rows={3}
        className="w-full mb-3 p-2 border rounded"
      />

      {user.role === 'GigWorker' ? (
        <>
          <label className="block mb-1">Skills (comma‑separated)</label>
          <input
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

          <label className="block mb-1">Experience</label>
          <select
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="0-1">0–1 year</option>
            <option value="1-3">1–3 years</option>
            <option value="3+">3+ years</option>
          </select>

          <label className="block mb-1">Location</label>
          <input
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        </>
      ) : (
        <>
          <label className="block mb-1">Company Name</label>
          <input
            name="companyName"
            value={profile.companyName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        </>
      )}

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        Save Profile
      </button>
    </form>
  );
}
