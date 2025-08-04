import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function BrowseGigs() {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedGigs, setAppliedGigs] = useState(new Set());

  useEffect(() => {
    // Enhanced dummy gigs for testing
    setGigs([
      { 
        id: 1, 
        title: 'Dog Walker Needed', 
        location: 'Kigali',
        pay: 'RWF 15,000/day',
        description: 'Walk my dog twice a day in Kacyiru area. Must love animals.',
        employer: 'Sarah M.',
        posted: '2 days ago',
        type: 'Part-time'
      },
      { 
        id: 2, 
        title: 'Plumbing Work', 
        location: 'Huye',
        pay: 'RWF 15,000',
        description: 'Fix kitchen pipe leaks. Must have plumbing experience.',
        employer: 'John K.',
        posted: '1 day ago',
        type: 'One-time'
      },
      { 
        id: 3, 
        title: 'House Cleaning Service', 
        location: 'Gasabo',
        pay: 'RWF 50,000',
        description: 'Deep cleaning for 4-bedroom house. Supplies provided.',
        employer: 'Maria L.',
        posted: '5 hours ago',
        type: 'One-time'
      },
      { 
        id: 4, 
        title: 'Garden Maintenance', 
        location: 'Kigali',
        pay: 'RWF 8,000/day',
        description: 'Weekly garden maintenance including watering and weeding.',
        employer: 'David R.',
        posted: '1 week ago',
        type: 'Regular'
      }
    ]);
  }, []);

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (gigId) => {
    // Check if job details route exists, otherwise create a modal or navigate to a details page
    navigate(`/job/${gigId}`);
  };

  const handleQuickApply = (gigId, gigTitle) => {
    if (appliedGigs.has(gigId)) {
      alert('You have already applied for this gig!');
      return;
    }

    setAppliedGigs(prev => new Set([...prev, gigId]));
    alert(`Quick application submitted for "${gigTitle}"!\n\nThe employer will contact you if interested.`);
  };

  return (
    <div className="browse-container">
      <h2>Available Gigs</h2>
      <input
        type="text"
        placeholder="Search gigs by title, location, or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      {filteredGigs.length > 0 ? (
        <ul>
          {filteredGigs.map((gig) => (
            <li key={gig.id} className="gig-card">
              <div className="gig-header">
                <h3>{gig.title}</h3>
                <span className="gig-type">{gig.type}</span>
              </div>
              
              <div className="gig-info">
                <p><strong>📍 Location:</strong> {gig.location}</p>
                <p><strong>💰 Pay:</strong> {gig.pay}</p>
                <p><strong>👤 Employer:</strong> {gig.employer}</p>
                <p><strong>📅 Posted:</strong> {gig.posted}</p>
              </div>
              
              <p className="gig-description">{gig.description}</p>
              
              <div className="gig-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => handleViewDetails(gig.id)}
                >
                  View Full Details
                </button>
                <button 
                  className={appliedGigs.has(gig.id) ? 'btn-applied' : 'btn-primary'}
                  onClick={() => handleQuickApply(gig.id, gig.title)}
                  disabled={appliedGigs.has(gig.id)}
                >
                  {appliedGigs.has(gig.id) ? 'Applied ✓' : 'Quick Apply'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p>No gigs found matching your search.</p>
          <p>Try different keywords or browse all available opportunities.</p>
          <button 
            className="btn-primary"
            onClick={() => setSearchTerm('')}
          >
            Show All Gigs
          </button>
        </div>
      )}
    </div>
  );
}