import { Navigate, Outlet } from "react-router";

import { useAuth } from "../hooks/use-auth";

export const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
