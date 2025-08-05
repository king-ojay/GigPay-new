// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.email && formData.password) {
        // 🔍 Check existing users in localStorage first
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = existingUsers.find(user => user.email === formData.email);

        let userData;
        
        if (existingUser) {
          // Use existing user data
          userData = existingUser;
        } else {
          // Create new user for demo - determine role based on email
          const role = formData.email.toLowerCase().includes('employer') ? 'Employer' : 'GigWorker';
          
          userData = {
            id: Date.now(),
            email: formData.email,
            name: formData.email.split('@')[0],
            role: role, // ✅ FIXED: Use 'role' not 'type'
            loginTime: new Date().toISOString(),
          };

          // Save to users list for future logins
          existingUsers.push(userData);
          localStorage.setItem('users', JSON.stringify(existingUsers));
        }

        // Store auth token
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        
        // ✅ FIXED: Use AuthContext login function
        login(userData);

        setMessage('Login successful! Redirecting...');
        
        // ✅ FIXED: Redirect based on actual user role
        setTimeout(() => {
          if (userData.role === 'Employer') {
            navigate('/employer-dashboard');
          } else {
            navigate('/gigworker-dashboard');
          }
        }, 500);
      } else {
        setMessage('Please fill in all fields');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <span className="gig">Gig</span><span className="pay">Pay</span>
            </div>
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {message && (
              <div className="auth-message" aria-live="polite">
                {message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-btn primary" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>

        {/* Side Panel */}
        <div className="auth-side-panel">
          <div className="side-content">
            <h2>Join the future of work</h2>
            <p>Connect with opportunities that match your skills and grow your career in the gig economy.</p>

            {/* Demo users for testing */}
            <div style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
              <p><strong>Demo accounts:</strong></p>
              <p>Employer: employer@test.com</p>
              <p>GigWorker: worker@test.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;