// src/pages/PostGig.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './PostGig.css';

export default function PostGig() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    budget: '',
    budgetType: 'fixed', // fixed, hourly
    urgency: '',
    location: '',
    estimatedTime: '',
    skills: [],
    contactMethod: 'platform' // platform, phone, email
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const categories = {
    'Home Services': ['Plumbing', 'Electrical', 'Cleaning', 'Gardening', 'Handyman', 'Painting'],
    'Pet Care': ['Dog Walking', 'Pet Sitting', 'Grooming', 'Training'],
    'Education & Training': ['Tutoring', 'Music Lessons', 'Sports Coaching', 'Language Teaching'],
    'Moving & Labor': ['Moving Help', 'Furniture Assembly', 'Heavy Lifting', 'Delivery'],
    'Technology': ['Computer Repair', 'Setup', 'Tech Support', 'Web Development'],
    'Event Services': ['Photography', 'Catering Help', 'Event Setup', 'Entertainment']
  };

  const urgencyOptions = [
    'Today (ASAP)',
    'Tomorrow', 
    'This Week',
    'This Weekend',
    'Next Week',
    'Flexible'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your API
    console.log('Gig posted:', formData);
    alert('Gig posted successfully! (This would actually submit to your backend)');
  };

  return (
    <div className="post-gig-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">
            Post a Gig
          </h1>
          <p className="header-subtitle">
            Tell us about the task you need help with
          </p>
        </div>
      </div>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-content">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">
                Gig Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Fix Kitchen Pipes - Urgent Plumbing Help Needed"
                className="form-input"
                required
              />
              <p className="form-hint">Be specific about what you need help with</p>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe what needs to be done, any specific requirements, and what you're looking for in a helper..."
                className="form-textarea"
                required
              />
            </div>

            {/* Category and Subcategory */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  {Object.keys(categories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Subcategory *
                </label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                  disabled={!formData.category}
                >
                  <option value="">Select a subcategory</option>
                  {formData.category && categories[formData.category]?.map(subCat => (
                    <option key={subCat} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Budget Type *
                </label>
                <select
                  name="budgetType"
                  value={formData.budgetType}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Budget Amount * {formData.budgetType === 'hourly' ? '(per hour)' : '(total)'}
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder={formData.budgetType === 'hourly' ? 'e.g., $25/hour' : 'e.g., $80-120'}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Urgency and Time */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  When do you need this done? *
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select urgency</option>
                  {urgencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Estimated Time Needed
                </label>
                <input
                  type="text"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  placeholder="e.g., 2-3 hours, Half day, 2 days"
                  className="form-input"
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Toronto, ON or your postal code"
                className="form-input"
                required
              />
            </div>

            {/* Skills */}
            <div className="form-group">
              <label className="form-label">
                Required Skills or Qualities
              </label>
              <div className="skill-input-container">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="e.g., Plumbing experience, Reliable, Own tools"
                  className="skill-input"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="skill-add-btn"
                >
                  Add
                </button>
              </div>
              {formData.skills.length > 0 && (
                <div className="skills-list">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-tag"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="skill-remove-btn"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Method */}
            <div className="form-group">
              <label className="form-label contact-label">
                How should people contact you?
              </label>
              <div className="contact-options">
                <label className="contact-option">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="platform"
                    checked={formData.contactMethod === 'platform'}
                    onChange={handleInputChange}
                    className="contact-radio"
                  />
                  <div>
                    <span className="contact-method-title">Through GigPay platform</span>
                    <p className="contact-method-desc">Recommended for secure communication</p>
                  </div>
                </label>
                <label className="contact-option">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={handleInputChange}
                    className="contact-radio"
                  />
                  <span className="contact-method">Direct phone contact</span>
                </label>
                <label className="contact-option">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleInputChange}
                    className="contact-radio"
                  />
                  <span className="contact-method">Direct email contact</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <div className="actions-container">
              <button
                type="button"
                className="draft-btn"
              >
                Save as Draft
              </button>
              <div className="action-buttons">
                <button
                  type="button"
                  className="preview-btn"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                >
                  Post Gig
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Tips Section */}
        <div className="tips-section">
          <div className="tips-container">
            <div className="tips-icon">
              <svg className="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="tips-content">
              <h3 className="tips-title">
                Tips for posting a successful gig
              </h3>
              <ul className="tips-list">
                <li>• Be specific about what needs to be done and your expectations</li>
                <li>• Include all relevant details like materials, tools, or access requirements</li>
                <li>• Set a fair budget based on the complexity and time required</li>
                <li>• Respond quickly to applicants to show you're serious</li>
                <li>• Check applicant profiles and reviews before making your decision</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}