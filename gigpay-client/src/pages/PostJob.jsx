// src/pages/PostJob.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PlaceholderPages.css';

const PostJob = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking authentication status
    // In a real app, you'd check localStorage, cookies, or make an API call
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userData');
      
      if (token && user) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    // Add a small delay to simulate loading
    setTimeout(checkAuth, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="placeholder-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
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
          
          <h1>Sign In Required</h1>
          <p>You need to be signed in to post a job. Join thousands of employers who trust <span className="brand-name"><span className="gig">Gig</span><span className="pay">Pay</span></span> for their hiring needs.</p>
          
          <div className="auth-actions">
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Account
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
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            <path d="M12 11h4"/>
            <path d="M12 16h4"/>
            <path d="M8 11h.01"/>
            <path d="M8 16h.01"/>
          </svg>
        </div>
        
        <h1>Post a Job</h1>
        <p>Ready to find your next team member? Our job posting system is coming soon and will help you connect with talented professionals.</p>
        
        <div className="placeholder-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <span>Easy job posting process</span>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span>Access to skilled professionals</span>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <span>Manage applications easily</span>
          </div>
        </div>
        
        <div className="coming-soon-badge">
          <span>Coming Soon</span>
        </div>
        
        <div className="placeholder-actions">
          <Link to="/jobs" className="btn-secondary">
            Browse Available Talent
          </Link>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostJob;