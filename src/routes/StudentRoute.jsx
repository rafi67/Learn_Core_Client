import { Navigate, useLocation } from "react-router";
import useVerifyUser from "../hooks/useVerifyUser";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";

const StudentRoute = ({ children }) => {
  const { userType, isLoading } = useVerifyUser();
  const {user} = useAuth();
  const location = useLocation();

  if(isLoading) return <Loading/>;

  if (user && userType?.role === "student") return children;

  return <Navigate to="/" state={{from: location}}/>;
};

export default StudentRoute;
