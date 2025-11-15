import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireAuth = true,
}) => {
  const { user, token, isAdmin } = useSelector((state) => state.user);
  const location = useLocation();

  // If no authentication required, render children
  if (!requireAuth) {
    return children;
  }

  // If authentication required but no token, redirect to login
  if (!token || !user) {
    const redirectPath = requireAdmin ? "/admin/login" : "/login";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If admin required but user is not admin, redirect to appropriate login
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If user is admin but trying to access user routes, redirect to admin dashboard
  if (!requireAdmin && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
