import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get(`/applications/user/${user._id}`).then(res => setApps(res.data));
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {apps.map(app => (
        <div key={app._id} className="border p-4 rounded mb-2 bg-white">
          <p><strong>Job Title:</strong> {app.job?.title}</p>
          <p><strong>Message:</strong> {app.message}</p>
          <p><strong>Status:</strong> {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
