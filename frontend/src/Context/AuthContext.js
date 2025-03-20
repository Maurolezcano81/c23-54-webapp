import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Token, SetToken] = useState("hardcoded_token");
  const [Name, SetName] = useState("John Doe");
  const [idUser, SetIdUser] = useState(1);
  const [Role, SetRole] = useState("admin");

  useEffect(() => {
    login(Token);
  }, []);

  const login = (token) => {
    const decoded = {
      id: 1,
      name: "John Doe",
      role: 1,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expira en 1 hora
    };

    localStorage.setItem("Token", token);
    SetToken(token);
    SetIdUser(decoded.id);
    SetName(decoded.name);
    SetRole(decoded.role);

    const expirationTime = decoded.exp * 1000 - Date.now();
    if (expirationTime > 0) {
      setTimeout(() => {
        logout();
      }, expirationTime);
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    SetToken(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ login, logout, Token, Role, Name, idUser }}>
      {children}
    </AuthContext.Provider>
  );
};
