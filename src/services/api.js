import apiClient from "./apiClient";

const api = {
  auth: {
    register: (data) => apiClient.post("/auth/register/", data),
    login: (data) => apiClient.post("/auth/jwt/create/", data),
    refresh: (data) => apiClient.post("/auth/jwt/refresh/", data),
    changePassword: (data) => apiClient.post("/auth/change-password/", data),
    verifyEmail: (uid, token) => apiClient.get(`/auth/verify-email/${uid}/${token}/`),
  },
  users: {
    profile: () => apiClient.get("/auth/donor-profile/"),
    listDonors: () => apiClient.get("/auth/donors/"),
  },
  admin: {
    listUsers: () => apiClient.get("/admin/users/"),
    suspendUser: (id) => apiClient.post(`/admin/users/${id}/suspend/`),
    verifyUser: (id) => apiClient.post(`/admin/users/${id}/verify/`),
    listRequests: () => apiClient.get("/admin/requests/"),
    stats: () => apiClient.get("/admin/stats/"),
  },
  bloodRequests: {
    list: () => apiClient.get("/blood-requests/requests/"),
    create: (data) => apiClient.post("/blood-requests/blood-requests/create/", data),
    accept: (id) => apiClient.post(`/blood-requests/blood-requests/${id}/accept/`),
    updateStatus: (id, data) => apiClient.put(`/blood-requests/blood-requests/${id}/update-status/`, data),
    myRequests: () => apiClient.get("/blood-requests/my-requests/"),
    donationHistory: () => apiClient.get("/blood-requests/donation-history/"),
    allDonations: () => apiClient.get("/blood-requests/donation-history/all/"),
  },
  notifications: {
    list: () => apiClient.get("/notifications/"),
    markRead: (id) => apiClient.post(`/notifications/mark-read/${id}/`),
  },
};

export default api;
