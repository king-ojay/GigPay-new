// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>Connect with local talent for any task</h1>
              <p>
                From plumbing repairs to dog walking, find skilled professionals in your neighborhood. 
                Post a task or offer your services today.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn-primary">Get Started</Link>
                <Link to="/browse-gigs" className="btn-secondary">Browse Gigs</Link>
              </div>
            </div>
            <div className="task-card">
              <div className="card">
                <div className="card-header">
                  <div className="icon-box">🔧</div>
                  <div>
                    <h3>Fix Kitchen Pipes</h3>
                    <p className="timestamp">Posted 2 hours ago</p>
                  </div>
                </div>
                <p className="description">
                  Need urgent plumbing help. Kitchen sink is leaking and pipes need repair...
                </p>
                <div className="card-footer">
                  <span className="price">$80-120</span>
                  <button className="btn-primary small">Apply Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section how-it-works">
        <div className="container">
          <h2>How GigPay Works</h2>
          <p className="section-subtitle">
            Whether you're looking for help or offering your services, getting started is simple
          </p>
          <div className="steps-grid">
            <div className="step">
              <div className="step-icon">➕</div>
              <h3>Post or Browse</h3>
              <p>Post a task you need help with or browse available gigs in your area</p>
            </div>
            <div className="step">
              <div className="step-icon">🔗</div>
              <h3>Connect</h3>
              <p>Connect with qualified professionals or clients through our secure platform</p>
            </div>
            <div className="step">
              <div className="step-icon">💰</div>
              <h3>Get Paid</h3>
              <p>Complete the work and get paid securely through our platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section categories">
        <div className="container">
          <h2>Popular Categories</h2>
          <p className="section-subtitle">Find the right professional for any task</p>
          <div className="category-grid">
            {[
              { name: 'Home Services', icon: '🏠', count: '150+' },
              { name: 'Pet Care', icon: '🐕', count: '80+' },
              { name: 'Moving & Labor', icon: '📦', count: '120+' },
              { name: 'Technology', icon: '💻', count: '90+' },
              { name: 'Education', icon: '📚', count: '60+' },
              { name: 'Events', icon: '🎉', count: '40+' }
            ].map((category, index) => (
              <div key={index} className="category-card">
                <div className="icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.count} gigs</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section safety">
        <div className="container">
          <div className="safety-grid">
            <div className="safety-text">
              <h2>Your safety is our priority</h2>
              <div className="safety-list">
                <div className="safety-item">
                  <span className="check-icon">✔</span>
                  <div>
                    <h3>Verified Profiles</h3>
                    <p>All users go through identity verification</p>
                  </div>
                </div>
                <div className="safety-item">
                  <span className="check-icon">✔</span>
                  <div>
                    <h3>Secure Payments</h3>
                    <p>Payments are protected and processed securely</p>
                  </div>
                </div>
                <div className="safety-item">
                  <span className="check-icon">✔</span>
                  <div>
                    <h3>24/7 Support</h3>
                    <p>Our support team is always here to help</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="trust-box">
              <div className="icon-large">✅</div>
              <h3>Trusted by thousands</h3>
              <p>Join our community of verified professionals and clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of people connecting through local gigs</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-light">Sign Up Today</Link>
            <Link to="/browse-gigs" className="btn-outline-light">Find Gigs Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
