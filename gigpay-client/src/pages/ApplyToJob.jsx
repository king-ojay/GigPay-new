import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const ApplyToJob = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post(`/applications`, {
      jobId: id,
      userId: user._id,
      message
    });
    alert('Application sent!');
    navigate('/my-applications');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">Apply to Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message" className="w-full border p-2 rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ApplyToJob;
