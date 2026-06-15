// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const isAuthenticated = true;
//   //CHANGE LATER TO FALSE, VERY IMPORTANT

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;




import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  return children;
};

export default ProtectedRoute;
