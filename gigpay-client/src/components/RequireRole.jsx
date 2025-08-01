import React from 'react';
import { Navigate } from 'react-router-dom';

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  } catch {
    return {};
  }
};

const RequireRole = ({ role, children }) => {
  const user = getUser();
  if (!user?.role) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default RequireRole;
