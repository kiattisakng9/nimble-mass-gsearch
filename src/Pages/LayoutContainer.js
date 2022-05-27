import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar";

const LayoutContainer = (props) => {
  return (
    <>
      <NavigationBar isLoggedIn={props.isLoggedIn} />
      <Outlet />
    </>
  );
};

export default LayoutContainer;
