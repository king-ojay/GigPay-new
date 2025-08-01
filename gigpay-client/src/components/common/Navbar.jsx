import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // optionally redirect to homepage or login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          {/* ... your logo svg ... */}
          <div className="logo-icon">
            {/* (keep your existing SVG here) */}
          </div>
          <span className="logo-text">
            <span className="gig">Gig</span>
            <span className="pay">Pay</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/jobs" className="navbar-link">Find Jobs</Link>
          <Link to="/post-job" className="navbar-link">Post a Job</Link>
          <Link to="/about" className="navbar-link">About</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="navbar-auth">
          {user ? (
            <>
              <Link to="/profile" className="auth-link profile">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="auth-link logout"
                style={{ background: "none", border: "none", cursor: "pointer", color: "white", marginLeft: "1rem" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link login">Sign In</Link>
              <Link to="/register" className="auth-link register">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/jobs" className="mobile-link" onClick={toggleMenu}>
            Find Jobs
          </Link>
          <Link to="/post-job" className="mobile-link" onClick={toggleMenu}>
            Post a Job
          </Link>
          <Link to="/about" className="mobile-link" onClick={toggleMenu}>
            About
          </Link>

          <div className="mobile-auth">
            {user ? (
              <>
                <Link to="/profile" className="mobile-auth-link profile" onClick={toggleMenu}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="mobile-auth-link logout"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "white", marginLeft: "1rem" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-auth-link login" onClick={toggleMenu}>
                  Sign In
                </Link>
                <Link to="/register" className="mobile-auth-link register" onClick={toggleMenu}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
