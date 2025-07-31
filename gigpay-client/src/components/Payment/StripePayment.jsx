// src/components/Payment/StripePayment.jsx
import React, { useState } from 'react';
import api from '../../api';

export default function StripePayment({ jobId }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/payments/stripe/${jobId}`);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="py-2 px-4 bg-green-600 text-white rounded"
    >
      {loading ? 'Redirecting…' : 'Pay with Stripe'}
    </button>
  );
}
