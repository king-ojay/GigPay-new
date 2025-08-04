import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Auth.css"; // Use the LinkedIn-style CSS

const GigWorkerDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: 'Dog Walker Needed in Kacyiru', 
      location: 'Kigali', 
      pay: 'RWF 15,000/day',
      description: 'Looking for a reliable person to walk my dog twice daily in Kacyiru area.',
      employer: 'Sarah M.',
      posted: '2 days ago'
    },
    { 
      id: 2, 
      title: 'House Cleaner (One-time)', 
      location: 'Kigali', 
      pay: 'RWF 50,000',
      description: 'Need deep cleaning for a 3-bedroom house. Must bring own supplies.',
      employer: 'John K.',
      posted: '1 day ago'
    },
    { 
      id: 3, 
      title: 'Plumber for Kitchen Sink', 
      location: 'Gasabo', 
      pay: 'RWF 15,000',
      description: 'Kitchen sink is blocked and needs professional repair.',
      employer: 'Maria L.',
      posted: '3 hours ago'
    }
  ]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = (jobId, jobTitle) => {
    if (appliedJobs.has(jobId)) {
      alert('You have already applied for this job!');
      return;
    }

    // Add to applied jobs
    setAppliedJobs(prev => new Set([...prev, jobId]));
    
    // Show success message
    alert(`Application submitted successfully for "${jobTitle}"!\n\nThe employer will contact you if selected.`);
    
    // Optional: Navigate to applications page
    // navigate('/my-applications');
  };

  const viewJobDetails = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="gigworker-dashboard">
      <h2>Welcome to GigPay, Rwanda</h2>
      <input
        type="text"
        placeholder="Search gigs (e.g., cleaning, location)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="job-list">
        {filteredJobs.map(job => (
          <li key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Pay:</strong> {job.pay}</p>
            <p><strong>Posted:</strong> {job.posted} by {job.employer}</p>
            
            <div className="job-actions">
              <button 
                className="btn-secondary"
                onClick={() => viewJobDetails(job.id)}
              >
                View Details
              </button>
              <button 
                className={appliedJobs.has(job.id) ? 'btn-applied' : 'btn-primary'}
                onClick={() => handleApply(job.id, job.title)}
                disabled={appliedJobs.has(job.id)}
              >
                {appliedJobs.has(job.id) ? 'Applied ✓' : 'Apply Now'}
              </button>
            </div>
          </li>
        ))}
        {filteredJobs.length === 0 && (
          <div className="no-results">
            <p>No matching gigs found.</p>
            <p>Try searching for different keywords or check back later for new opportunities.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default GigWorkerDashboard;