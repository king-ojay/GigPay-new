// src/components/Profile/ProfileCreate.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function ProfileCreate() {
  const [form, setForm] = useState({ bio: '', skills: '', location: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/profile')
      .then(res => {
        setForm({
          bio: res.data.bio,
          skills: res.data.skills.join(', '),
          location: res.data.location
        });
      })
      .catch(() => {});
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put('/profile', {
        bio: form.bio,
        skills: form.skills.split(',').map(s => s.trim()),
        location: form.location
      });
      alert('Profile saved');
      navigate('/profile/view');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Edit Profile</h2>
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Your bio"
        className="w-full mb-3 p-2 border rounded"
        rows={3}
        required
      />
      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills (comma‑separated)"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
        Save Profile
      </button>
    </form>
  );
}
