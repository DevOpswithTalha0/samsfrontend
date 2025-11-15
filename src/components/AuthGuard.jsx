import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, isAdminRoute = false }) => {
  const { user, token, isAdmin } = useSelector((state) => state.user);

  // If user is already logged in, redirect based on role
  if (token && user) {
    if (isAdmin && isAdminRoute) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (isAdmin && !isAdminRoute) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (!isAdmin && !isAdminRoute) {
      return <Navigate to="/" replace />;
    } else if (!isAdmin && isAdminRoute) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default AuthGuard;
