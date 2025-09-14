import apiClient from "./apiClient";

const BloodRequestService = {
  getUserDonationHistory: async () => {
    const res = await apiClient.get("/blood-requests/donation-history/");
    return res.data.results || res.data;
  },

  getAllDonationHistory: async () => {
    const res = await apiClient.get("/blood-requests/donation-history/all/");
    return res.data.results || res.data;
  },

  createBloodRequest: async (data) => {
    const res = await apiClient.post("/blood-requests/create/", data);
    return res.data;
  },

  acceptBloodRequest: async (id) => {
    const res = await apiClient.post(`/blood-requests/${id}/accept/`);
    return res.data;
  },

  completeBloodRequest: async (id) => {
    const res = await apiClient.post(`/blood-requests/${id}/complete/`);
    return res.data;
  },

  cancelBloodRequest: async (id) => {
    const res = await apiClient.post(`/blood-requests/${id}/cancel/`);
    return res.data;
  },

  getBloodRequestContact: async (id) => {
    const res = await apiClient.get(`/blood-requests/${id}/contact/`);
    return res.data;
  },

  getMyRequests: async () => {
    const res = await apiClient.get("/blood-requests/my-requests/");
    return res.data.results || res.data;
  },

  getAllRequests: async () => {
    const res = await apiClient.get("/blood-requests/");
    return res.data.results || res.data;
  },

  getAdminRequests: async () => {
    const res = await apiClient.get("/blood-requests/admin/requests/");
    return res.data.results || res.data;
  }
};

export default BloodRequestService;
