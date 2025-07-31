import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [step, setStep] = useState(1);
  const [basic, setBasic] = useState({ name: '', email: '', password: '', role: 'GigWorker' });
  const [details, setDetails] = useState({ skills: '', experience: '', location: '', companyName: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBasicChange = e => setBasic({ ...basic, [e.target.name]: e.target.value });
  const handleDetailsChange = e => setDetails({ ...details, [e.target.name]: e.target.value });

  const nextStep = e => {
    e.preventDefault();
    if (!basic.name || !basic.email || !basic.password) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setStep(2);
  };

  const submitAll = async e => {
    e.preventDefault();
    try {
      const payload = { ...basic, ...details };
      const res = await axios.post('http://localhost:5001/api/auth/register', payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return step === 1 ? (
    <form onSubmit={nextStep} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Step 1: Account Info</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <input name="name" placeholder="Full Name" value={basic.name} onChange={handleBasicChange} className="w-full mb-3 p-2 border rounded" />
      <input name="email" type="email" placeholder="Email" value={basic.email} onChange={handleBasicChange} className="w-full mb-3 p-2 border rounded" />
      <input name="password" type="password" placeholder="Password" value={basic.password} onChange={handleBasicChange} className="w-full mb-3 p-2 border rounded" />
      <select name="role" value={basic.role} onChange={handleBasicChange} className="w-full mb-3 p-2 border rounded">
        <option value="GigWorker">GigWorker</option>
        <option value="Employer">Employer</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Next</button>
    </form>
  ) : (
    <form onSubmit={submitAll} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Step 2: {basic.role==='GigWorker' ? 'Work Profile' : 'Company Profile'}</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {basic.role === 'GigWorker' ? (
        <>
          <input name="skills" placeholder="Skills (comma-separated)" value={details.skills} onChange={handleDetailsChange} className="w-full mb-3 p-2 border rounded" />
          <select name="experience" value={details.experience} onChange={handleDetailsChange} className="w-full mb-3 p-2 border rounded">
            <option value="">Experience</option>
            <option value="0-1">0–1 year</option>
            <option value="1-3">1–3 years</option>
            <option value="3+">3+ years</option>
          </select>
          <input name="location" placeholder="Location" value={details.location} onChange={handleDetailsChange} className="w-full mb-3 p-2 border rounded" />
        </>
      ) : (
        <input name="companyName" placeholder="Company Name" value={details.companyName} onChange={handleDetailsChange} className="w-full mb-3 p-2 border rounded" />
      )}
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Complete Registration</button>
    </form>
  );
}
