import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const UserLoginRedirect = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation()
  console.log(location);
  console.log('Redux state:', isAuthenticated, user); // Check Redux state here

  if (isAuthenticated && user && !user.is_superuser) {
    return <Navigate to="/" />;
  } else if (isAuthenticated && user && user.is_superuser) {
    return <Navigate to="/adminhome" />;
  }

  return children;
};

export default UserLoginRedirect;
