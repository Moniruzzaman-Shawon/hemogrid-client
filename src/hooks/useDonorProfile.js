import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";

const useDonorProfile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch profile once when user exists
  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("/auth/donor-profile/");
      setProfile(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // Update profile manually (use PATCH for partial updates; let axios set headers)
  const updateProfile = async (formData) => {
    try {
      const res = await apiClient.patch("/auth/donor-profile/", formData);
      setProfile(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data || "Failed to update profile.",
      };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { profile, loading, error, fetchProfile, updateProfile };
};

export default useDonorProfile;
