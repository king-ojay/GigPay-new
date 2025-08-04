// src/components/GigDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const GigDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGig = async () => {
    try {
      const res = await api.get(`/gigs/${id}`);
      setGig(res.data);
    } catch (e) {
      console.error("Failed to load gig", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGig();
  }, [id]);

  const markCompleted = async () => {
    if (!user) {
      alert("Unauthorized");
      return;
    }
    try {
      await api.put(`/gigs/${id}`, { status: "completed" });
      alert("Marked as completed");
      fetchGig(); // refresh
    } catch (err) {
      console.error(err);
      alert("Failed to update gig");
    }
  };

  if (loading) return <div>Loading gig...</div>;
  if (!gig) return <div>Gig not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{gig.title}</h2>
      <p className="mb-4">{gig.description}</p>
      <p className="text-sm mb-2">
        Status:{" "}
        <span className={gig.status === "completed" ? "text-green-600" : "text-yellow-600"}>
          {gig.status}
        </span>
      </p>

      {/* Only show "Mark Complete" if not already */}
      {gig.status !== "completed" && (
        <button onClick={markCompleted} className="btn-secondary">
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default GigDetail;
