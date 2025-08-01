import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GigWorkerDashboard from './pages/GigWorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import Profile from './pages/Profile';
import CreateJob from './pages/CreateJob';
import FindJob from './pages/FindJob';
import PostJob from './pages/PostJob';
import About from './pages/About';
import RequireRole from './components/RequireRole';
import { AuthProvider } from './context/AuthContext';

function NoMatch() {
  return <div className="p-8">404 — Page not found</div>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard/gigworker"
              element={
                <RequireRole role="gigworker">
                  <GigWorkerDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/dashboard/employer"
              element={
                <RequireRole role="employer">
                  <EmployerDashboard />
                </RequireRole>
              }
            />

            <Route path="/profile" element={<Profile />} />

            {/* Job-related */}
            <Route path="/post-gig" element={<CreateJob />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/jobs" element={<FindJob />} />

            {/* Fallback */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
