import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

// Create Context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );

  const navigate = useNavigate();

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
      const res = await apiClient.post("/auth/jwt/create/", { email, password });
      const tokens = res.data;
      setAuthTokens(tokens);
      localStorage.setItem("authTokens", JSON.stringify(tokens));

      const profileRes = await apiClient.get("/auth/donor-profile/", {
        headers: { Authorization: `JWT ${tokens.access}` },
      });
      setUser(profileRes.data);
      localStorage.setItem("userData", JSON.stringify(profileRes.data));

      navigate("/dashboard");
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

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuthContext = () => useContext(AuthContext);
