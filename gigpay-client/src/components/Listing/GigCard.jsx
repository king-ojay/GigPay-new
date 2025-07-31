// src/components/Listing/GigCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function GigCard({ gig }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold">{gig.title}</h3>
      <p className="text-gray-700">{gig.description.substring(0, 100)}…</p>
      <p className="mt-2 font-medium">Budget: {gig.budget}</p>
      <Link to={`/jobs/${gig._id}`} className="text-blue-600 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}
