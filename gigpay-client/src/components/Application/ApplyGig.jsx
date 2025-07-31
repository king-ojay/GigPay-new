// src/components/Application/ApplyGig.jsx
import React, { useState } from 'react';
import api from '../../api';

export default function ApplyGig({ jobId, onSuccess }) {
  const [message, setMessage] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post(`/jobs/${jobId}/apply`, { message });
      alert('Applied successfully');
      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Why are you a good fit?"
        className="w-full mb-3 p-2 border rounded"
        rows={4}
        required
      />
      <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded">
        Submit Application
      </button>
    </form>
  );
}
