import  { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../lib/api";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        try {
          const res = await api.get("/api/auth/dashboard/");
          setUser(res.data);
        } catch {
          localStorage.clear();
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login/", { email, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    const userRes = await api.get("/api/auth/dashboard/");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
