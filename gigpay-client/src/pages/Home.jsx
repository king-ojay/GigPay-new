// src/pages/Home.jsx
import React from 'react';
import { LinkButton } from '../components/common/Button';
import './Home.css';

// Feature data for better maintainability
const FEATURES = {
  workers: {
    title: 'For Gig Workers',
    description: 'Find flexible opportunities that match your skills. Browse jobs, apply with confidence, and get paid securely.',
    benefits: [
      'Browse available gigs',
      'Secure payment system',
      'Build your reputation'
    ],
    button: {
      text: 'Join as Gig Worker',
      variant: 'success'
    }
  },
  employers: {
    title: 'For Employers',
    description: 'Post your projects and connect with skilled professionals. Find the right talent for your needs quickly and efficiently.',
    benefits: [
      'Post unlimited gigs',
      'Review applications easily',
      'Manage projects efficiently'
    ],
    button: {
      text: 'Hire Talent',
      variant: 'primary'
    }
  }
};

const CheckIcon = () => (
  <svg 
    width="16" 
    height="16" 
    fill="currentColor" 
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
);

const FeatureIcon = () => (
  <div className="feature-icon">
    <svg 
      width="32" 
      height="32" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" 
      />
    </svg>
  </div>
);

const FeatureCard = ({ feature }) => (
  <div className="feature-card">
    <FeatureIcon />
    
    <h3 className="feature-title">
      {feature.title}
    </h3>
    
    <p className="feature-description">
      {feature.description}
    </p>
    
    <ul className="feature-benefits">
      {feature.benefits.map((benefit, index) => (
        <li key={index}>
          <CheckIcon />
          {benefit}
        </li>
      ))}
    </ul>
    
    <LinkButton
      to="/register"
      variant={feature.button.variant}
      size="md"
    >
      {feature.button.text}
    </LinkButton>
  </div>
);

const HeroSection = () => (
  <section className="hero-section">
    <h1>Welcome to GigPay</h1>
    
    <p>
      Connect talented gig workers with opportunities. Find work or hire skilled professionals for your projects.
    </p>
    
    <div className="hero-buttons">
      <a href="/register" className="primary">
        Get Started
      </a>
      
      <a href="/login" className="secondary">
        Sign In
      </a>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="features-section">
    <div className="features-header">
      <h2>How GigPay Works</h2>
      
      <p>
        Whether you're looking for work or need to hire talent, GigPay makes it simple and secure.
      </p>
    </div>

    <div className="feature-grid">
      <FeatureCard feature={FEATURES.workers} />
      <FeatureCard feature={FEATURES.employers} />
    </div>
  </section>
);

const CallToActionSection = () => (
  <section className="cta-section">
    <h2>Ready to Get Started?</h2>
    
    <p>
      Join thousands of gig workers and employers who trust GigPay for their freelance needs.
    </p>
    
    <div className="cta-buttons">
      <a href="/register" className="primary">
        Create Your Account
      </a>
      
      <a href="/login" className="secondary">
        Already have an account?
      </a>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
    </div>
  );
}