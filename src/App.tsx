import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage'; // New import
import FindDonorPage from './pages/FindDonorPage'; // New import
import DonorFormPage from './pages/DonorFormPage'; // New import
import EducationPage from './pages/EducationPage'; // New import
import Navbar from './components/Navbar';
import './App.css';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const userString = localStorage.getItem('loggedInUser');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If user doesn't have the required role, redirect to their own dashboard or home
    return user.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

function App() {
  const userString = localStorage.getItem('loggedInUser');
  const user = userString ? JSON.parse(userString) : null;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-donor" element={<FindDonorPage />} />
        <Route path="/donate" element={<DonorFormPage />} />
        <Route path="/education" element={<EducationPage />} />

        {/* Root path: if logged in, go to HomePage, otherwise to LoginPage */}
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}
        />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/user" element={<UserDashboard />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;