import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

// Create Context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    const userData = localStorage.getItem("userData");
    if (tokens && userData) {
      setAuthTokens(JSON.parse(tokens));
      setUser(JSON.parse(userData));
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      // Login endpoint
      const res = await apiClient.post("auth/login/", { email, password });
      const tokens = res.data;
      const userData = res.data.user; // User data comes from JWT response
      
      setAuthTokens(tokens);
      setUser(userData);
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      localStorage.setItem("userData", JSON.stringify(userData));

      // Role-based redirect
      if (userData.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuthContext = () => useContext(AuthContext);
