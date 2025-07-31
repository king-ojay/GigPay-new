import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function GigWorkerDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get('/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Gigs</h1>
      {jobs.map(job => (
        <Link
          key={job._id}
          to={`/jobs/${job._id}`}
          className="block mb-3 p-4 border rounded hover:bg-gray-50"
        >
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.companyName}</p>
        </Link>
      ))}
    </div>
  );
}
