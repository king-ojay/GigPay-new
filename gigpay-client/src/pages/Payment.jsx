import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const Payment = () => {
  const { jobId } = useParams();

  const handlePayment = async () => {
    const res = await api.post(`/payments/checkout`, { jobId });
    window.location.href = res.data.url; // redirect to Stripe
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
      <button onClick={handlePayment} className="bg-indigo-600 text-white px-6 py-3 rounded">Pay Now</button>
    </div>
  );
};

export default Payment;
