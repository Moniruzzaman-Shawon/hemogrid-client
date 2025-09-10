import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hemogrid.vercel.app/api/v1",
});

// Automatically attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token).access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
