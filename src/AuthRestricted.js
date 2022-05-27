import React from "react";
import { Navigate } from "react-router-dom";

const AuthRestricted = ({ isAuthenticated, children }) => {
  // Navigate to search page if user is logged in
  if (isAuthenticated) {
    return <Navigate to='/search' replace />;
  }
  return children;
};

export default AuthRestricted;
