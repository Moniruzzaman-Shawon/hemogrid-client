// src/services/authService.js
import apiClient from "./apiClient";

// Forgot password
export const forgotPassword = async (email) => {
  return apiClient.post("/auth/forgot-password/", { email });
};

// Reset password
export const resetPassword = async (uidb64, token, new_password, confirm_password) => {
  return apiClient.post(`/auth/reset-password/${uidb64}/${token}/`, {
    new_password,
    confirm_password: confirm_password ?? new_password,
  });
};

// Resend verification email
export const resendVerification = async (email) => {
  return apiClient.post(`/auth/resend-verification/`, { email });
};

// Change password (for logged-in user)
export const changePassword = async (old_password, new_password) => {
  return apiClient.post("/auth/change-password/", {
    old_password,
    new_password,
  });
};
