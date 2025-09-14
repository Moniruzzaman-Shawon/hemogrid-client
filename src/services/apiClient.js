import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/",
});

// Helpers to parse and validate JWTs without external deps
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  const now = Date.now();
  // Add small clock skew tolerance (5s)
  return payload.exp * 1000 < now - 5000;
};

// attach JWT token
apiClient.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem("authTokens"));
  const access = tokens?.access;

  // Resolve absolute path for matching
  let path = "";
  try {
    const url = new URL(config.url, apiClient.defaults.baseURL);
    path = url.pathname || "";
  } catch (e) {
    path = String(config.url || "");
  }

  // Public/auth endpoints that should never carry Authorization
  const publicPaths = [
    "/auth/register/",
    "/auth/verify-email/",
    "/auth/forgot-password/",
    "/auth/reset-password/",
    "/auth/login/",
    "/auth/resend-verification/",
  ];
  const isPublic = publicPaths.some((p) => path.includes(p));

  // Attach Authorization only if not public, token exists, and not expired
  if (!isPublic && access && !isTokenExpired(access)) {
    if (!config.headers || !config.headers.Authorization) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

// Response interceptor to refresh tokens on 401 invalid/expired
let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, token = null) => {
  pendingRequests.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  pendingRequests = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const data = error.response?.data;

    const tokens = JSON.parse(localStorage.getItem("authTokens")) || {};
    const refresh = tokens.refresh;

    const isTokenError =
      status === 401 &&
      (data?.code === "token_not_valid" ||
        data?.detail === "Token is invalid or expired" ||
        data?.messages?.some((m) => /invalid|expired/i.test(m?.message)));

    if (isTokenError && refresh && !originalRequest._retry && !isTokenExpired(refresh)) {
      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise((resolve, reject) => {
          pendingRequests.push({
            resolve: (token) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const res = await apiClient.post("/auth/token/refresh/", { refresh });
        const newTokens = { ...tokens, access: res.data.access };
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
        apiClient.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
        processQueue(null, res.data.access);
        // Retry the original request with new token
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("userData");
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
