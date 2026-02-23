import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard'; // Citizen Dashboard
import OfficerDashboard from '../pages/OfficerDashboard'; // Officer Dashboard
import AdminDashboard from '../pages/AdminDashboard'; 
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen Only Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Citizen']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Officer Only Route */}
      <Route 
        path="/officer-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Officer', 'Admin']}>
            <OfficerDashboard />
          </ProtectedRoute>
        } 
      />
      // AppRoutes.jsx mein ye route add karein:
<Route 
  path="/admin-dashboard" 
  element={
    <ProtectedRoute allowedRoles={['Admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
    </Routes>
    // AppRoutes.jsx mein ye route add karein
  
  );
};

export default AppRoutes;