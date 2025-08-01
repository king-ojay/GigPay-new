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
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  const submitAll = async e => {
    e.preventDefault();
    try {
      const payload = { ...basic, ...details };
      await axios.post('http://localhost:5001/api/auth/register', payload);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const Input = ({ label, ...props }) => (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold mb-1">{label}</label>
      <input {...props} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
    </div>
  );

  const Select = ({ label, ...props }) => (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold mb-1">{label}</label>
      <select {...props} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
        {props.children}
      </select>
    </div>
  );

  return (
    <form
      onSubmit={step === 1 ? nextStep : submitAll}
      className="max-w-md w-full mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {step === 1 ? 'Step 1: Account Info' : `Step 2: ${basic.role === 'GigWorker' ? 'Work Profile' : 'Company Profile'}`}
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {step === 1 ? (
        <>
          <Input label="Full Name" name="name" placeholder="e.g. Jane Doe" value={basic.name} onChange={handleBasicChange} />
          <Input label="Email" name="email" type="email" placeholder="you@example.com" value={basic.email} onChange={handleBasicChange} />
          <Input label="Password" name="password" type="password" placeholder="Enter password" value={basic.password} onChange={handleBasicChange} />
          <Select label="Role" name="role" value={basic.role} onChange={handleBasicChange}>
            <option value="GigWorker">GigWorker</option>
            <option value="Employer">Employer</option>
          </Select>
        </>
      ) : basic.role === 'GigWorker' ? (
        <>
          <Input label="Skills" name="skills" placeholder="e.g. JavaScript, Figma" value={details.skills} onChange={handleDetailsChange} />
          <Select label="Experience" name="experience" value={details.experience} onChange={handleDetailsChange}>
            <option value="">Select experience</option>
            <option value="0-1">0–1 year</option>
            <option value="1-3">1–3 years</option>
            <option value="3+">3+ years</option>
          </Select>
          <Input label="Location" name="location" placeholder="City or Country" value={details.location} onChange={handleDetailsChange} />
        </>
      ) : (
        <Input label="Company Name" name="companyName" placeholder="e.g. Acme Inc." value={details.companyName} onChange={handleDetailsChange} />
      )}

      <button
        type="submit"
        className={`w-full py-3 mt-4 rounded-lg text-white font-semibold ${
          step === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
        } transition-colors`}
      >
        {step === 1 ? 'Next' : 'Complete Registration'}
      </button>
    </form>
  );
}
