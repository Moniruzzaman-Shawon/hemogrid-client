import apiClient from "./apiClient";

const BloodRequestService = {
  getUserDonationHistory: async () => {
    const res = await apiClient.get("/blood-requests/donation-history/");
    return res.data;
  },

  getAllDonationHistory: async () => {
    const res = await apiClient.get("/blood-requests/donation-history/all/");
    return res.data;
  }
};

export default BloodRequestService;
