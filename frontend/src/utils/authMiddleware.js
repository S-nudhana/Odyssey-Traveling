import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const authMiddleware = (Component) => {
  return () => {
    const isLoggedIn = Cookies.get("token") !== undefined;

    return isLoggedIn ? <Component /> : <Navigate to="/signin" replace />;
  };
};

export default authMiddleware;
