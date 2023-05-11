import React, { useContext } from "react";
import { AuthContext } from "../services/application.context";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteByRole({ children, role }) {
  const [authState, setAuthState] = useContext(AuthContext);
  if (authState.roles.includes(role)) {
    return children;
  } else {
    return <Navigate to={"/notAuthorized"} />;
  }
}
