import { createContext, useState, useContext } from "react";
import React from "react";
export const AuthContext = createContext();

export const TOKEN_KEY = "token";

export const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem(TOKEN_KEY);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
export default AuthContextProvider;
