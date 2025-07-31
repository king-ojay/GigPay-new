// src/components/JobStatus/JobStatusUpdater.jsx
import React, { useState } from 'react';
import api from '../../api';

export default function JobStatusUpdater({ jobId, currentStatus, onUpdate }) {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = async e => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await api.patch(`/jobs/${jobId}/status`, { status: newStatus });
      alert('Status updated');
      onUpdate?.(newStatus);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-sm">
      <label className="block mb-2 font-medium">Update Status:</label>
      <select
        value={status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
