import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      // Login endpoint
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/login/`, {
        email,
        password,
      });

      const { access, refresh } = res.data;

      // Save tokens
      localStorage.setItem("authTokens", JSON.stringify({ access, refresh }));

      // Decode JWT to get basic user info
      const payload = JSON.parse(atob(access.split(".")[1]));
      const user = { email: payload.email }; // Add more fields if JWT contains them
      localStorage.setItem("authUser", JSON.stringify(user));
      setUser(user);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      throw new Error("Invalid credentials or server error");
    }
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login");
  };

  return { user, login, logout };
};

export default useAuth;
