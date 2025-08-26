import { Link, Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) return children;

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return <Navigate to="/signIn" state={{ from: location }} />;
};

export default PrivateRoute;
