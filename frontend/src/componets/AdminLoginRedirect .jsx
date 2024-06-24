import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminLoginRedirect = ({ children }) => {
  const {isAuthenticated, user} = useSelector((state) => state.auth);
  console.log(isAuthenticated,user)
  if (isAuthenticated &&  user.is_superuser) {
    console.log("HHIIHIHIH")
    return <Navigate to="/adminhome" />;
  }else if(isAuthenticated){
    return <Navigate to='/' />
  }

  return children;
};

export default AdminLoginRedirect;
