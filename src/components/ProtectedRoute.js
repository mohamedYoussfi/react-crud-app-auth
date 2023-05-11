import React, { useContext } from "react";
import { AuthContext } from "../services/application.context";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useContext(AuthContext);
  if (authState.isAuthenticated) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
  return <div>ProtectedRoute</div>;
}
