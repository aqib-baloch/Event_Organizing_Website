import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the child components if the user is authenticated
};

export default ProtectedRoute;
