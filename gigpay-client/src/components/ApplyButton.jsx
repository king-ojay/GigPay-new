// src/components/ApplyButton.jsx
import React, { useContext, useState } from "react";
import api from "../api"; // your axios instance
import { AuthContext } from "../context/AuthContext";

const ApplyButton = ({ gigId, onApplied }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const applyToGig = async () => {
    if (!user) {
      alert("Please log in to apply");
      return;
    }
    setLoading(true);
    try {
      await api.post(`/gigs/${gigId}/apply`, {}); // endpoint from backend
      alert("Application submitted");
      if (onApplied) onApplied();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error || "Failed to apply. You might have already applied."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={applyToGig}
      disabled={loading}
      className="btn-primary inline-block px-4 py-2 rounded"
    >
      {loading ? "Applying..." : "Apply"}
    </button>
  );
};

export default ApplyButton;
