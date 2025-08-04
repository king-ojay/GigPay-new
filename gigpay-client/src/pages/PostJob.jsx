// src/pages/PostJob.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './PostJob.css';

const PostJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Contract',
    rate: '',
    rateType: 'hourly',
    duration: '',
    description: '',
    requirements: '',
    skills: [],
    experienceLevel: 'Intermediate',
    category: 'Development'
  });

  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const jobCategories = [
    'Development', 'Design', 'Data Science', 'Marketing',
    'Writing', 'Sales', 'Customer Service', 'Other'
  ];

  const experienceLevels = ['Entry Level', 'Intermediate', 'Expert'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.rate.trim()) newErrors.rate = 'Rate is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const jobData = {
        ...formData,
        id: Date.now(),
        postedBy: user?.email || 'employer@example.com',
        postedDate: new Date().toISOString(),
        status: 'Active',
        applicants: 0
      };

      console.log('Job posted:', jobData);
      alert('Job posted successfully! You can manage it from your dashboard.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="post-job-container">
        <div className="post-job-header">
          <h1>Post a New Job</h1>
          <p>Find the perfect talent for your project</p>
        </div>

        <form onSubmit={handleSubmit} className="post-job-form">
          {/* Basic Info and Job Details here... */}

          {/* Job Description */}
          <div className="form-section">
            <h2>Job Description</h2>
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the job responsibilities, expectations, etc."
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>

          {/* Skills */}
          <div className="form-section">
            <h2>Skills Required *</h2>
            <div className="form-group">
              <div className="skill-input-wrapper">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="e.g. JavaScript, Figma"
                />
                <button onClick={handleAddSkill} className="add-skill-btn">Add</button>
              </div>
              {errors.skills && <span className="error-text">{errors.skills}</span>}
              <div className="skills-list">
                {formData.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Posting Job...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
