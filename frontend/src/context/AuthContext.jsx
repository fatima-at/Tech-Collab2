import { createContext, useState, useContext } from "react";
import React from "react";
import { refresh } from "../services/AuthApi";
export const AuthContext = createContext();

export const TOKEN_KEY = "token";

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPageReadyToRender, setIsPageReadyToRender] = useState(false);

  const checkAuthentication = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setAuthUser({});
      if (isAuthenticated) setIsAuthenticated(false);
      if (!isPageReadyToRender) setIsPageReadyToRender(true);
      return;
    }
    try {
      const response = await refresh({ token });
      if (response.status) {
        setAuthUser(response.user);
        localStorage.setItem(TOKEN_KEY, response.token);
        if (!isAuthenticated) setIsAuthenticated(true);
        if (!isPageReadyToRender) setIsPageReadyToRender(true);
      } else {
        localStorage.setItem(TOKEN_KEY, "");
        setAuthUser({});
        if (isAuthenticated) setIsAuthenticated(false);
        if (!isPageReadyToRender) setIsPageReadyToRender(true);
      }
    } catch (error) {
      localStorage.setItem(TOKEN_KEY, "");
      setAuthUser({});
      if (isAuthenticated) setIsAuthenticated(false);
      if (!isPageReadyToRender) setIsPageReadyToRender(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        checkAuthentication,
        isAuthenticated,
        setIsAuthenticated,
        isPageReadyToRender,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
export default AuthContextProvider;
