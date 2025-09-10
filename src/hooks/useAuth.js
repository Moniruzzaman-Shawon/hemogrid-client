import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    try {
      const token = localStorage.getItem("authTokens");
      return token ? JSON.parse(token) : null;
    } catch {
      return null;
    }
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  const handleAPIError = (error, defaultMessage = "Something Went Wrong!") => {
    console.error(error);
    if (error.response && error.response.data) {
      const message = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(message);
      return { success: false, message };
    }
    setErrorMsg(defaultMessage);
    return { success: false, message: defaultMessage };
  };

  // Fetch current user
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Fetch user error", error);
    }
  };

  // Login
  const loginUser = async (credentials) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", credentials);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Login failed");
      return { success: false, message: error.response?.data?.detail };
    }
  };

  // Register
  const registerUser = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", data);
      return { success: true, message: "Registration successful. Check your email." };
    } catch (error) {
      return handleAPIError(error, "Registration Failed");
    }
  };

  // Logout
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
  };
};

export default useAuth;
