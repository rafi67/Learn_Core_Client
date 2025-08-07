import { createContext } from "react";

const AuthContext = ({ children, authInfo }) => {
  const Auth = createContext(null);
  return <Auth.Provider value={authInfo}>{children}</Auth.Provider>;
};

export default AuthContext;
