import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import NavigationBar from "../NavigationBar";

// Application layout container
const LayoutContainer = () => {
  const auth = useAuth();

  const isAuthenticated = auth?.user != null;

  return (
    <>
      <NavigationBar isLoggedIn={isAuthenticated} />
      <Outlet />
    </>
  );
};

export default LayoutContainer;
