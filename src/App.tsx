import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FindDonorPage from './pages/FindDonorPage';
import DonorFormPage from './pages/DonorFormPage';
import EducationPage from './pages/EducationPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedDashboardRedirector from './components/RoleBasedDashboardRedirector'; // Import the new component
import { useUser } from './context/UserContext';
import './App.css';
import React from 'react'; // Import React

const RootRedirect: React.FC = () => {
  const { user } = useUser();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/find-donor" element={<FindDonorPage />} />
        <Route path="/donate" element={<DonorFormPage />} />
        <Route path="/education" element={<EducationPage />} />

        {/* Root path: if logged in, go to /dashboard, otherwise to LoginPage */}
        <Route path="/" element={<RootRedirect />} />

        {/* Protected Dashboard Route - Renders AdminDashboard or UserDashboard based on role */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="/dashboard" element={<RoleBasedDashboardRedirector />} />
        </Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;