import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GigWorkerDashboard from './pages/GigWorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import PostGig from './pages/PostGig';
import BrowseGigs from './pages/BrowseGigs';
import Profile from './pages/Profile'; // ADD THIS IMPORT

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/browse-gigs" element={<BrowseGigs />} />
      
      {/* Unified dashboard route that shows correct dashboard based on user type */}
      <Route
        path="/dashboard/gigworker"
        element={
          <ProtectedRoute>
            {user?.type === 'GigWorker' ? (
              <GigWorkerDashboard />
            ) : user?.type === 'GigPayer' ? (
              <EmployerDashboard />
            ) : (
              <div className="error-page">
                <h2>Invalid user role</h2>
                <p>Please contact support if this error persists.</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Separate employer dashboard route (optional - you can remove if not needed) */}
      <Route
        path="/dashboard/employer"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Post gig route - only for employers */}
      <Route
        path="/post-gig"
        element={
          <ProtectedRoute>
            {user?.type === 'GigPayer' ? (
              <PostGig />
            ) : (
              <div className="error-page">
                <h2>Access Denied</h2>
                <p>Only employers can post gigs.</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Profile route - FIXED */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Add Apply route for the apply button */}
      <Route
        path="/apply/:gigId"
        element={
          <ProtectedRoute>
            <div>Apply to Gig - Coming Soon!</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}