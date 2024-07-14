import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const storedData = localStorage.getItem("userData");

  useEffect(() => {
    if (storedData) {
      const data = JSON.parse(storedData);
      setToken(data.token);
      setUser(data.user);
      setAuthenticated(true);
    }
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    setAuthenticated(true);
    localStorage.setItem("userData", JSON.stringify({ token, user }));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
