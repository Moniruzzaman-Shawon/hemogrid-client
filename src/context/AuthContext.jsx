// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(); // named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("authTokens"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (tokens && userData) setUser(userData);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post("/auth/jwt/create/", { email, password });
      localStorage.setItem("authTokens", JSON.stringify(res.data));

      const profileRes = await apiClient.get("/auth/donor-profile/");
      localStorage.setItem("userData", JSON.stringify(profileRes.data));
      setUser(profileRes.data);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
