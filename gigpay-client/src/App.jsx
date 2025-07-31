// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GigWorkerDashboard from './pages/GigWorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import Profile from './pages/Profile';
import CreateJob from './pages/CreateJob';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/gigworker" element={<GigWorkerDashboard />} />
            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-gig" element={<CreateJob />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;