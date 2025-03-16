import { Navigate, Outlet } from "react-router";

import { useAuth } from "../hooks/use-auth";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};
