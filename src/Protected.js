import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ isAuthenticated, children }) => {
  // Unauthorized users will be navigated to login page
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default Protected;
