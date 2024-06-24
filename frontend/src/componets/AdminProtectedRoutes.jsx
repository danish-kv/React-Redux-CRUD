import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const AdminProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log('admin home protedted',isAuthenticated,user)

  if (!isAuthenticated || !user || !user.is_superuser) {
    return <Navigate to="/adminlogin" />;
  }

  return children;
};

export default AdminProtectedRoutes;