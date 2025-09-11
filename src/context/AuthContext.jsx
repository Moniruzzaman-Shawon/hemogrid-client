import { createContext, useState } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode"; // Use * as jwt_decode for Vite

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authTokens");
    return token ? jwt_decode(JSON.parse(token).access) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(
  "http://127.0.0.1:8000/api/auth/jwt/create/",
  { email, password }
);

      // Save tokens
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // Decode access token to get user info
      setUser(jwt_decode(response.data.access));

      alert("Login successful!");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("Server error. Try again later.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
