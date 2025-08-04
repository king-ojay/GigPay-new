import React, { useEffect, useState } from 'react';
import './MyApplications.css';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/my-applications')
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="applications-container">
      <h2>My Applications</h2>
      <ul>
        {applications.map(app => (
          <li key={app._id} className="application-card">
            <h3>{app.jobTitle}</h3>
            <p><strong>Status:</strong> {app.status}</p>
            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
