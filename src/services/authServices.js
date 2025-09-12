import apiClient from "./apiClient";

// Forgot Password (send reset email)
export const forgotPassword = async (email) => {
  return await apiClient.post("/auth/forgot-password/", { email });
};

// Reset Password (with token from email link)
export const resetPassword = async (uidb64, token, new_password) => {
  return await apiClient.post(`/auth/reset-password/${uidb64}/${token}/`, {
    new_password,
  });
};

// Change Password (user must be logged in)
export const changePassword = async (old_password, new_password) => {
  return await apiClient.post("/auth/change-password/", {
    old_password,
    new_password,
  });
};
