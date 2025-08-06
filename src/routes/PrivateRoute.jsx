import { Link, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ child }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) return child;

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return <Link to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
