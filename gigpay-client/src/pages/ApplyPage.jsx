import React, { useState } from 'react';
import './ApplyPage.css';

export default function ApplyPage({ jobId }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    const response = await fetch(`http://localhost:5000/api/apply/${jobId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coverLetter }),
    });

    if (response.ok) setSuccess(true);
  };

  return (
    <div className="apply-container">
      <h2>Apply for Gig</h2>
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write your cover letter..."
        rows="6"
      />
      <button onClick={handleApply}>Submit Application</button>
      {success && <p className="success-msg">Application sent successfully!</p>}
    </div>
  );
}
