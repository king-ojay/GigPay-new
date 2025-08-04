// src/components/common/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

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
                <Link 
                  to="/dashboard/gigworker" 
                  className={`nav-item ${isActive('/dashboard/gigworker') ? 'active' : ''}`}
                >
                  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z" />
                  </svg>
                  Dashboard
                </Link>

                <Link 
                  to="/browse-gigs" 
                  className={`nav-item ${isActive('/browse-gigs') ? 'active' : ''}`}
                >
                  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Gigs
                </Link>

                {user.type === 'GigPayer' && (
                  <Link 
                    to="/post-gig" 
                    className={`nav-item ${isActive('/post-gig') ? 'active' : ''}`}
                  >
                    <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post Gig
                  </Link>
                )}

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
