import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/",
});

// Attach JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem("authTokens"));
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle 401 globally
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request, token may be expired");
      // Optional: redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default apiClient;