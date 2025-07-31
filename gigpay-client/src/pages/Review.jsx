import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const Review = () => {
  const { jobId } = useParams();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post(`/reviews`, { jobId, rating, comment });
    alert('Review submitted!');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="w-full border p-2" />
        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Your review..." className="w-full border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Review;
