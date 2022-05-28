import React from "react";
import AuthRestricted from "./AuthRestricted";
import { useAuth } from "./Contexts/AuthContext";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import Protected from "./Protected";

const DefaultHome = () => {
  const auth = useAuth();

  const isAuthenticated = auth?.user != null;

  /**
   * Set default landing page
   * Logged in users will have search page as landing page
   * Unauthorized users will have login page as landing page
   */
  return (
    <>
      {isAuthenticated ? (
        <Protected isAuthenticated={isAuthenticated.current}>
          <SearchPage />
        </Protected>
      ) : (
        <AuthRestricted isAuthenticated={isAuthenticated.current}>
          <LoginPage />
        </AuthRestricted>
      )}
    </>
  );
};

export default DefaultHome;
