// src/pages/FindJobs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlaceholderPages.css';

const FindJobs = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userData');
      
      if (token && user) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    setTimeout(checkAuth, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="placeholder-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="placeholder-page">
        <div className="auth-required-container">
          <div className="auth-required-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <circle cx="12" cy="16" r="1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          
          <h1>Sign In to Find Jobs</h1>
          <p>Discover amazing opportunities waiting for you. Sign in to browse and apply for gigs that match your skills.</p>
          
          <div className="auth-actions">
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary">
              Join as Gig Worker
            </Link>
          </div>
          
          <div className="back-link">
            <Link to="/" className="back-home">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <div className="placeholder-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        
        <h1>Find Your Perfect Gig</h1>
        <p>Great news! You're logged in and ready to explore opportunities. Our job matching system is being fine-tuned to bring you the best gigs.</p>
        
        <div className="placeholder-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <span>Smart job matching</span>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/>
                <path d="M16 8h4"/>
                <path d="M16 12h4"/>
                <path d="M16 16h4"/>
              </svg>
            </div>
            <span>Filter by skills & location</span>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span>Apply with one click</span>
          </div>
        </div>
        
        <div className="no-jobs-state">
          <h3>No Jobs Available Yet</h3>
          <p>We're actively working with employers to bring you exciting opportunities. Check back soon!</p>
        </div>
        
        <div className="placeholder-actions">
          <Link to="/post-job" className="btn-secondary">
            Want to Hire Instead?
          </Link>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
        
        <div className="notify-section">
          <h4>Get Notified</h4>
          <p>Be the first to know when new gigs are posted</p>
          <div className="notify-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="notify-input"
            />
            <button className="notify-btn">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;