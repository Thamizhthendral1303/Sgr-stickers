
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Checking administrator authentication status..." fullScreen />;
  }

  if (!currentUser) {
    // Redirect them to the admin login page
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
