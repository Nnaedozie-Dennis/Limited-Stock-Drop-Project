import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = true;
  //CHANGE LATER TO FALSE, VERY IMPORTANT

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
