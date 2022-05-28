import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const Protected = ({ children }) => {
  const auth = useAuth();

  const isAuthenticated = auth?.user != null;

  // Unauthorized users will be navigated to login page
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default Protected;
