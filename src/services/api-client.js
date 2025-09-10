import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // your .env variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authTokens");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
