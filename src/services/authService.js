import apiClient from "./api-client";

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/auth/login/", { email, password });
  return response.data; // assuming backend returns { access, refresh, user }
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/auth/register/", userData);
  return response.data;
};
