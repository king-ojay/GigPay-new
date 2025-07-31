// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', role: 'seeker' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="seeker">Job Seeker</option>
        <option value="client">Client</option>
      </select>
      <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">
        Register
      </button>
    </form>
  );
}
