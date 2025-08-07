import { useContext } from "react";
import { Auth } from "../context/authContext";

const useAuth = () => {
  const authContext = useContext(Auth);
  return authContext;
};

export default useAuth;
