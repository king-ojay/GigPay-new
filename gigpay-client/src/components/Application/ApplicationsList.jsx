// src/components/Application/ApplicationsList.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function ApplicationsList() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get('/applications')
      .then(res => setApps(res.data))
      .catch(err => alert(err.message));
  }, []);

  if (!apps.length) return <p className="text-center">No applications yet.</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Your Applications</h1>
      <ul>
        {apps.map(app => (
          <li key={app._id} className="bg-white p-4 rounded shadow mb-3">
            <Link to={`/jobs/${app.job._id}`} className="font-semibold text-blue-600">
              {app.job.title}
            </Link>
            <p className="mt-1">{app.message}</p>
            <p className="text-sm text-gray-500">Status: {app.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
