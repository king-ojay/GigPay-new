// src/components/Listing/GigList.jsx
import React from 'react';
import GigCard from './GigCard';

export default function GigList({ gigs }) {
  return (
    <div>
      {gigs.map(gig => (
        <GigCard key={gig._id} gig={gig} />
      ))}
    </div>
  );
}
