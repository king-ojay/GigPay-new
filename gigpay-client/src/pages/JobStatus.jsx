import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const JobStatus = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  const markComplete = async () => {
    await api.patch(`/jobs/${id}/complete`);
    alert('Job marked as complete!');
    window.location.reload();
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">{job.title}</h1>
      <p>Status: <strong>{job.status}</strong></p>
      {job.status !== 'completed' && (
        <button onClick={markComplete} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Mark as Complete</button>
      )}
    </div>
  );
};

export default JobStatus;
