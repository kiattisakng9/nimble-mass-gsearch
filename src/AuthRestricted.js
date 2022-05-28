import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const AuthRestricted = ({ children }) => {
  const auth = useAuth();

  const isAuthenticated = auth?.user != null;

  // Navigate to search page if user is logged in
  if (isAuthenticated) {
    return <Navigate to='/search' replace />;
  }
  return children;
};

export default AuthRestricted;
