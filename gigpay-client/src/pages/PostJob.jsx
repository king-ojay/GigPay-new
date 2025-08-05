import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './PostGig.css';

const PostGig = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    duration: '',
    requirements: '',
    contactInfo: ''
  });

  const categories = [
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.title || !formData.description || !formData.budget) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      // Create job object
      const newJob = {
        id: Date.now(), // Simple ID generation
        ...formData,
        employerId: user.id,
        employerName: user.name,
        employerEmail: user.email,
        datePosted: new Date().toISOString(),
        applicants: [],
        status: 'active'
      };

      // Get existing jobs from localStorage
      const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      
      // Add new job
      existingJobs.push(newJob);
      
      // Save back to localStorage
      localStorage.setItem('jobs', JSON.stringify(existingJobs));

      // Update employer's posted jobs count
      const employerJobs = existingJobs.filter(job => job.employerId === user.id);
      localStorage.setItem('employerJobsCount', employerJobs.length.toString());

      setSuccess('Job posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        budget: '',
        duration: '',
        requirements: '',
        contactInfo: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/employer-dashboard');
      }, 2000);

    } catch (err) {
      setError('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-gig-page">
      <div className="post-gig-container">
        <div className="post-gig-header">
          <h1>Post a New Job</h1>
          <p>Find the perfect talent for your project in Rwanda</p>
        </div>

        <form onSubmit={handleSubmit} className="post-gig-form">
          {error && (
            <div className="message error">
              {error}
            </div>
          )}
          
          {success && (
            <div className="message success">
              {success}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Web Developer, Graphic Designer"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you need done, project goals, and any specific requirements..."
              rows="6"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kigali, Gasabo or Remote"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget (RWF) *</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. 50000"
                min="1000"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Project Duration</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Select duration</option>
              <option value="1-3 days">1-3 days</option>
              <option value="1 week">1 week</option>
              <option value="2-4 weeks">2-4 weeks</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3+ months">3+ months</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="requirements">Requirements & Skills</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List required skills, experience level, tools, etc..."
              rows="4"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Contact Information</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Phone number or preferred contact method"
              disabled={isLoading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/employer-dashboard')}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostGig;