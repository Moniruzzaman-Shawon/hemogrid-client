// src/services/authService.js
import apiClient from "./apiClient";

// Forgot password
export const forgotPassword = async (email) => {
  return apiClient.post("/auth/forgot-password/", { email });
};

// Reset password
export const resetPassword = async (uidb64, token, new_password) => {
  return apiClient.post(`/auth/reset-password/${uidb64}/${token}/`, {
    new_password,
  });
};

// Change password (for logged-in user)
export const changePassword = async (old_password, new_password) => {
  return apiClient.post("/auth/change-password/", {
    old_password,
    new_password,
  });
};
