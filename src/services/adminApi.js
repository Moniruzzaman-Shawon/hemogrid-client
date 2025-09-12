import apiClient from "./apiClient";

// Users
export const fetchAdminUsers = () => apiClient.get("/admin/users/");
export const suspendUser = (id) => apiClient.post(`/admin/users/${id}/suspend/`);
export const verifyUser = (id) => apiClient.post(`/admin/users/${id}/verify/`);

// Blood Requests
export const fetchAdminBloodRequests = () => apiClient.get("/admin/requests/");

// Stats
export const fetchAdminStats = () => apiClient.get("/admin/stats/");
