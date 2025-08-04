import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const [step, setStep] = useState(1);
  const [basic, setBasic] = useState({ name: '', email: '', password: '', role: 'GigWorker' });
  const [details, setDetails] = useState({ skills: '', experience: '', location: '', companyName: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBasicChange = e => setBasic({ ...basic, [e.target.name]: e.target.value });
  const handleDetailsChange = e => setDetails({ ...details, [e.target.name]: e.target.value });

  const nextStep = e => {
    e.preventDefault();
    if (!basic.name || !basic.email || !basic.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  const submitAll = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const payload = { ...basic, ...details };
      console.log('Registration payload:', payload);
      
      // Success - redirect to login
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
            <h1>
              {step === 1 ? 'Create your account' : 
               basic.role === 'GigWorker' ? 'Complete your profile' : 'Company details'}
            </h1>
            <p>
              {step === 1 ? 'Join the future of work in Rwanda' : 
               'Help us personalize your experience'}
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={step === 1 ? nextStep : submitAll} className="auth-form">
            {error && (
              <div className="auth-message error" aria-live="polite">
                {error}
              </div>
            )}

            {step === 1 ? (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={basic.name}
                    onChange={handleBasicChange}
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={basic.email}
                    onChange={handleBasicChange}
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
                    value={basic.password}
                    onChange={handleBasicChange}
                    placeholder="Create a password"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">I want to</label>
                  <select
                    id="role"
                    name="role"
                    value={basic.role}
                    onChange={handleBasicChange}
                    disabled={isLoading}
                  >
                    <option value="GigWorker">Find work opportunities</option>
                    <option value="Employer">Hire talented workers</option>
                  </select>
                </div>
              </>
            ) : basic.role === 'GigWorker' ? (
              <>
                <div className="form-group">
                  <label htmlFor="skills">Skills</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={details.skills}
                    onChange={handleDetailsChange}
                    placeholder="e.g. Cleaning, Plumbing, Driving"
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience Level</label>
                  <select
                    id="experience"
                    name="experience"
                    value={details.experience}
                    onChange={handleDetailsChange}
                    disabled={isLoading}
                  >
                    <option value="">Select your experience</option>
                    <option value="0-1">New to this work (0-1 year)</option>
                    <option value="1-3">Some experience (1-3 years)</option>
                    <option value="3+">Very experienced (3+ years)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={details.location}
                    onChange={handleDetailsChange}
                    placeholder="e.g. Kigali, Gasabo"
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={details.companyName}
                  onChange={handleDetailsChange}
                  placeholder="Enter your company name"
                  disabled={isLoading}
                />
              </div>
            )}

            <button type="submit" className="auth-btn primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : 
               step === 1 ? 'Continue' : 'Create Account'}
            </button>

            {step === 2 && (
              <button 
                type="button" 
                className="auth-btn secondary" 
                onClick={() => setStep(1)}
                disabled={isLoading}
              >
                Back
              </button>
            )}
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>

        {/* Side Panel */}
        <div className="auth-side-panel">
          <div className="side-content">
            <h2>Welcome to GigPay Rwanda</h2>
            <p>
              {step === 1 ? 
                'Join thousands of professionals connecting with opportunities across Rwanda.' :
                basic.role === 'GigWorker' ? 
                'Complete your profile to get matched with the best opportunities.' :
                'Start posting jobs and finding the perfect talent for your business.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}