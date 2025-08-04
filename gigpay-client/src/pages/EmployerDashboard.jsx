// pages/EmployerDashboard.jsx
import React from 'react';
import "./Dashboard.css";

const postedJobs = [
  {
    id: 1,
    title: 'Web Developer',
    applicants: 8,
  },
  {
    id: 2,
    title: 'Social Media Manager',
    applicants: 3,
  },
];

export default function EmployerDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Employer Dashboard</h1>
      <p>Manage your posted gigs in Rwanda</p>

      <div className="jobs-list">
        {postedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>Applicants: {job.applicants}</p>
            <button className="view-button">View Applications</button>
          </div>
        ))}
      </div>

      <div className="post-job">
        <a href="/post-job">
          <button className="apply-button">Post New Gig</button>
        </a>
      </div>
    </div>
  );
}
