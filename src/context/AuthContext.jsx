import { createContext } from "react";

export const Auth = createContext(null);
const AuthContext = ({ children, authInfo }) => {
  return <Auth.Provider value={authInfo}>{children}</Auth.Provider>;
};

export default AuthContext;
