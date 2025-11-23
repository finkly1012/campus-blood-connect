import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';

const RoleBasedDashboardRedirector: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    // Should ideally be caught by ProtectedRoute, but as a fallback
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default RoleBasedDashboardRedirector;
