import React, { useRef, useEffect } from "react";
import AuthRestricted from "./AuthRestricted";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import Protected from "./Protected";

const DefaultHome = (props) => {
  const isAuthenticated = useRef(props.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated.current != props.isAuthenticated) {
      isAuthenticated.current =
        isAuthenticated.current != props.isAuthenticated;
    }
  }, [props.isAuthenticated]);

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
