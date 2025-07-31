// src/pages/JobList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from backend API
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Failed to fetch jobs', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available yet.</p>
      ) : (
        jobs.map((job) => (
          <Link
            to={`/job/${job.id}`}
            key={job.id}
            className="block p-4 bg-white rounded shadow mb-4 hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>{job.company}</p>
            <p className="text-sm text-gray-600">{job.location}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default JobList;
