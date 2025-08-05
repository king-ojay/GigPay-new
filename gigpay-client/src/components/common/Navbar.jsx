// src/components/common/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">GP</div>
            <span className="logo-text">GigPay</span>
          </Link>

          {/* Navigation Menu */}
          <div className="navbar-menu">
            {user ? (
              <>
                {/* Dashboard - Different routes for different roles */}
                {user.role === 'Employer' ? (
                  <Link 
                    to="/employer-dashboard" 
                    className={`nav-item ${isActive('/employer-dashboard') ? 'active' : ''}`}
                  >
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/gigworker-dashboard" 
                    className={`nav-item ${isActive('/gigworker-dashboard') ? 'active' : ''}`}
                  >
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z" />
                    </svg>
                    Dashboard
                  </Link>
                )}

                {/* Role-specific navigation */}
                {user.role === 'Employer' ? (
                  // Employer Navigation
                  <>
                    <Link 
                      to="/post-gig" 
                      className={`nav-item ${isActive('/post-gig') ? 'active' : ''}`}
                    >
                      <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Post Job
                    </Link>

                    <Link 
                      to="/manage-jobs" 
                      className={`nav-item ${isActive('/manage-jobs') ? 'active' : ''}`}
                    >
                      <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Manage Jobs
                    </Link>

                    <Link 
                      to="/applications" 
                      className={`nav-item ${isActive('/applications') ? 'active' : ''}`}
                    >
                      <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Applications
                    </Link>
                  </>
                ) : (
                  // Gig Worker Navigation
                  <>
                    <Link 
                      to="/browse-gigs" 
                      className={`nav-item ${isActive('/browse-gigs') ? 'active' : ''}`}
                    >
                      <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Browse Gigs
                    </Link>

                    <Link 
                      to="/my-applications" 
                      className={`nav-item ${isActive('/my-applications') ? 'active' : ''}`}
                    >
                      <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      My Applications
                    </Link>
                  </>
                )}

                {/* Common navigation for all logged-in users */}
                <Link 
                  to="/profile" 
                  className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
                >
                  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>

                <div className="user-menu">
                  <span className="user-name">
                    {user.name || user.email}
                  </span>
                  <div className="user-role">
                    {user.role === 'Employer' ? 'Employer' : 'Gig Worker'}
                  </div>
                  <div className="avatar">
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/browse-gigs" className="nav-item">
                  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Gigs
                </Link>
                <Link to="/login" className="login-button">
                  Sign in
                </Link>
                <Link to="/register" className="join-button">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}