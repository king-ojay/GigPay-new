// src/components/common/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button, LinkButton, NavButton } from './Button';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-orange-500">GigPay</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <>
                <NavButton to="/" active={isActive('/')}>
                  Home
                </NavButton>
                <LinkButton to="/login" variant="ghost" size="sm">
                  Sign In
                </LinkButton>
                <LinkButton to="/register" variant="primary" size="sm">
                  Get Started
                </LinkButton>
              </>
            )}

            {user && user.role === 'GigWorker' && (
              <>
                <NavButton to="/dashboard/gigworker" active={isActive('/dashboard/gigworker')}>
                  Dashboard
                </NavButton>
                <NavButton to="/profile" active={isActive('/profile')}>
                  Profile
                </NavButton>
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}

            {user && user.role === 'Employer' && (
              <>
                <NavButton to="/dashboard/employer" active={isActive('/dashboard/employer')}>
                  Dashboard
                </NavButton>
                <NavButton to="/post-gig" active={isActive('/post-gig')}>
                  Post Gig
                </NavButton>
                <NavButton to="/profile" active={isActive('/profile')}>
                  Profile
                </NavButton>
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-2">
              {!user && (
                <>
                  <NavButton 
                    to="/" 
                    active={isActive('/')}
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </NavButton>
                  <NavButton 
                    to="/login"
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </NavButton>
                  <div className="px-3 py-2">
                    <LinkButton 
                      to="/register" 
                      variant="primary" 
                      size="sm"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </LinkButton>
                  </div>
                </>
              )}

              {user && user.role === 'GigWorker' && (
                <>
                  <NavButton 
                    to="/dashboard/gigworker" 
                    active={isActive('/dashboard/gigworker')}
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavButton>
                  <NavButton 
                    to="/profile" 
                    active={isActive('/profile')}
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </NavButton>
                  <div className="px-3 py-2">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              )}

              {user && user.role === 'Employer' && (
                <>
                  <NavButton 
                    to="/dashboard/employer" 
                    active={isActive('/dashboard/employer')}
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavButton>
                  <NavButton 
                    to="/post-gig" 
                    active={isActive('/post-gig')}
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Post Gig
                  </NavButton>
                  <NavButton 
                    to="/profile" 
                    active={isActive('/profile')}
                    className="block w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </NavButton>
                  <div className="px-3 py-2">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}