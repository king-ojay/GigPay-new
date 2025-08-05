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
      
      {/* Simple role-based dashboard routes */}
      <Route
        path="/employer-dashboard"
        element={
          <ProtectedRoute>
            {user?.role === 'Employer' ? (
              <EmployerDashboard />
            ) : (
              <div className="error-page">
                <h2>Access Denied</h2>
                <p>This dashboard is only for employers.</p>
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/gigworker-dashboard"
        element={
          <ProtectedRoute>
            {user?.role === 'GigWorker' ? (
              <GigWorkerDashboard />
            ) : (
              <div className="error-page">
                <h2>Access Denied</h2>
                <p>This dashboard is only for gig workers.</p>
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Alternative dashboard routes with role-specific paths */}
      <Route
        path="/dashboard/gigworker"
        element={
          <ProtectedRoute>
            {user?.role === 'GigWorker' ? (
              <GigWorkerDashboard />
            ) : (
              <div className="error-page">
                <h2>Access Denied</h2>
                <p>This dashboard is only for gig workers.</p>
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dashboard/employer"
        element={
          <ProtectedRoute>
            {user?.role === 'Employer' ? (
              <EmployerDashboard />
            ) : (
              <div className="error-page">
                <h2>Access Denied</h2>
                <p>This dashboard is only for employers.</p>
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Generic dashboard route that redirects based on role */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {user?.role === 'Employer' ? (
              <EmployerDashboard />
            ) : user?.role === 'GigWorker' ? (
              <GigWorkerDashboard />
            ) : (
              <div className="error-page">
                <h2>Invalid user role</h2>
                <p>Please contact support if this error persists.</p>
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Post gig route - only for employers */}
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
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      {/* Profile route - accessible to all authenticated users */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Apply route - only for gig workers */}
      <Route
        path="/apply/:gigId"
        element={
          <ProtectedRoute>
            {user?.role === 'GigWorker' ? (
              <div>Apply to Gig - Coming Soon!</div>
            ) : (
              <div className="error-page">
                <h2>Access Denied</h2>
                <p>Only gig workers can apply to gigs.</p>
                <p>Your role: {user?.role}</p>
              </div>
            )}
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for 404 */}
      <Route 
        path="*" 
        element={
          <div className="error-page">
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
          </div>
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