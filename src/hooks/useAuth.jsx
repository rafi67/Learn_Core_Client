import { useContext } from "react";
import AuthContext from "../context/authContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
