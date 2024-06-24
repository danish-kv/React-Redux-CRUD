import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const UserProtectedRoute = ({ element }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user && !user.is_superuser) {
    return element;
  } else if (isAuthenticated && user && user.is_superuser) {
    return <Navigate to="/adminhome" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtectedRoute;
