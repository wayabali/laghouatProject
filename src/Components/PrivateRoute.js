import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAdmin = localStorage.getItem('isAdmin'); // Check if the user is an admin
  return isAdmin ? element : <Navigate to="/admin-dashboard" />; // Redirect to login if not admin
};

export default PrivateRoute;
