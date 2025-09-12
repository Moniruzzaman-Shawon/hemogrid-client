import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach JWT token
apiClient.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("authTokens"));
  if (tokens?.access) {
    config.headers.Authorization = `JWT ${tokens.access}`;
  }
  return config;
});

export default apiClient;
