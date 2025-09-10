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
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}auth/login/`, {
        email,
        password,
      });

      // Assuming backend returns: { access, refresh, user }
      const { access, refresh, user } = res.data;

      localStorage.setItem("authTokens", access);
      localStorage.setItem("authUser", JSON.stringify(user));
      setUser(user);

      navigate("/dashboard"); // redirect after login
    } catch (err) {
      console.error(err);
      alert("Invalid credentials or server error");
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
