import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

export default function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data));
  }, [jobId]);

  if (!job) return <p>Loading job...</p>;

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Budget:</strong> RWF {job.budget}</p>
    </div>
  );
}
