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
import Profile from './pages/Profile';

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/browse-gigs" element={<BrowseGigs />} />
      
      {/* ✅ ADDED: Missing routes that Register.jsx redirects to */}
      <Route
        path="/employer-dashboard"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/gigworker-dashboard"
        element={
          <ProtectedRoute>
            <GigWorkerDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Existing unified dashboard route */}
      <Route
        path="/dashboard/gigworker"
        element={
          <ProtectedRoute>
            {user?.role === 'GigWorker' ? (
              <GigWorkerDashboard />
            ) : user?.role === 'Employer' ? (
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
      
      {/* Existing employer dashboard route */}
      <Route
        path="/dashboard/employer"
        element={
          <ProtectedRoute>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Post gig route - fixed role check */}
      <Route
        path="/post-gig"
        element={
          <ProtectedRoute>
            {user?.role === 'Employer' ? (
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
      
      {/* Profile route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Apply route */}
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