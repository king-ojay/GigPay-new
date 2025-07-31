// src/pages/ApplyPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ApplyPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => alert(err.message));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post(`/jobs/${id}/apply`, { message });
      alert('Application sent!');
      navigate('/applications');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!job) return <p className="text-center">Loading gig…</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Apply to: {job.title}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your cover message"
          className="w-full mb-4 p-2 border rounded"
          rows={5}
          required
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          Send Application
        </button>
      </form>
    </div>
  );
}co