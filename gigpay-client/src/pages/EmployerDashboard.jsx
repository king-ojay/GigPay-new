// src/pages/EmployerDashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

export default function EmployerDashboard() {
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    if (!user) return;
    // Fetch jobs posted by this employer
    api.get(`/jobs/posted/${user.id}`)
      .then(res => setMyJobs(res.data))
      .catch(err => console.error('Error loading posted jobs:', err));
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Posted Gigs</h1>

      <Link
        to="/create"
        className="inline-block mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post New Gig
      </Link>

      {myJobs.length === 0 ? (
        <p>You haven’t posted any gigs yet.</p>
      ) : (
        myJobs.map(job => (
          <div key={job._id} className="mb-4 p-4 border rounded bg-white shadow-sm">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{job.description}</p>
            {'budget' in job && (
              <p className="mt-2"><strong>Budget:</strong> {job.budget}</p>
            )}
            <div className="mt-3 space-x-4">
              <Link
                to={`/jobs/${job._id}/status`}
                className="text-blue-600 hover:underline"
              >
                View / Update Status
              </Link>
              <Link
                to={`/jobs/${job._id}/applicants`}
                className="text-blue-600 hover:underline"
              >
                View Applicants
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
);
}
