import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './BrowseGigs.css';

const BrowseGigs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const categories = [
    'All Categories',
    'Technology',
    'Design & Creative',
    'Writing & Translation',
    'Sales & Marketing',
    'Admin & Customer Support',
    'Finance & Accounting',
    'Engineering & Architecture',
    'Legal',
    'Manual Labor',
    'Domestic Services',
    'Transportation',
    'Other'
  ];

  useEffect(() => {
    loadJobs();
    loadAppliedJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedCategory]);

  const loadJobs = () => {
    try {
      const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      // Only show active jobs
      const activeJobs = allJobs.filter(job => job.status === 'active');
      setJobs(activeJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAppliedJobs = () => {
    try {
      const applied = JSON.parse(localStorage.getItem(`appliedJobs_${user?.id}`) || '[]');
      setAppliedJobs(new Set(applied));
    } catch (error) {
      console.error('Error loading applied jobs:', error);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    setFilteredJobs(filtered);
  };

  const handleApply = (jobId, jobTitle) => {
    if (!user) {
      alert('Please log in to apply for jobs');
      return;
    }

    if (user.role === 'Employer') {
      alert('Employers cannot apply for jobs. Switch to a Gig Worker account to apply.');
      return;
    }

    if (appliedJobs.has(jobId)) {
      alert('You have already applied for this job!');
      return;
    }

    try {
      // Add to applied jobs
      const newAppliedJobs = [...appliedJobs, jobId];
      setAppliedJobs(new Set(newAppliedJobs));
      localStorage.setItem(`appliedJobs_${user.id}`, JSON.stringify(newAppliedJobs));

      // Update job with application
      const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedJobs = allJobs.map(job => {
        if (job.id === jobId) {
          const application = {
            id: Date.now(),
            applicantId: user.id,
            applicantName: user.name,
            applicantEmail: user.email,
            dateApplied: new Date().toISOString(),
            status: 'pending'
          };
          return {
            ...job,
            applicants: [...(job.applicants || []), application]
          };
        }
        return job;
      });

      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      
      // Update local state
      setJobs(updatedJobs.filter(job => job.status === 'active'));

      alert(`Successfully applied for: ${jobTitle}\n\nThe employer will review your application and contact you if selected.`);
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply for job. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="browse-gigs-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading available gigs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="browse-gigs-container">
      <div className="browse-header">
        <h1>Browse Available Gigs</h1>
        <p>Find your next opportunity in Rwanda</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs by title, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-header">
        <p>{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</p>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="gig-card">
              <div className="gig-header">
                <h3 className="gig-title">{job.title}</h3>
                <div className="gig-budget">{formatBudget(job.budget)}</div>
              </div>

              <div className="gig-meta">
                <div className="meta-item">
                  <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{job.category}</span>
                </div>
                
                {job.location && (
                  <div className="meta-item">
                    <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                )}

                {job.duration && (
                  <div className="meta-item">
                    <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{job.duration}</span>
                  </div>
                )}
              </div>

              <p className="gig-description">
                {job.description.length > 200 
                  ? `${job.description.substring(0, 200)}...` 
                  : job.description
                }
              </p>

              {job.requirements && (
                <div className="gig-requirements">
                  <h4>Requirements:</h4>
                  <p>{job.requirements}</p>
                </div>
              )}

              <div className="gig-footer">
                <div className="gig-stats">
                  <span className="applicants-count">
                    {job.applicants?.length || 0} applicant{(job.applicants?.length || 0) !== 1 ? 's' : ''}
                  </span>
                  <span className="posted-date">
                    Posted {formatDate(job.datePosted)}
                  </span>
                </div>

                <div className="gig-actions">
                  {appliedJobs.has(job.id) ? (
                    <button className="btn-applied" disabled>
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Applied
                    </button>
                  ) : (
                    <button 
                      className="btn-apply"
                      onClick={() => handleApply(job.id, job.title)}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Apply Now
                    </button>
                  )}
                </div>
              </div>

              <div className="employer-info">
                <div className="employer-avatar">
                  {job.employerName.charAt(0).toUpperCase()}
                </div>
                <div className="employer-details">
                  <span className="employer-name">{job.employerName}</span>
                  <span className="employer-label">Employer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search criteria or check back later for new opportunities</p>
        </div>
      )}
    </div>
  );
};

export default BrowseGigs;