import { useState, useEffect } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import useDonorProfile from "../hooks/useDonorProfile";
import { useToast } from "../components/ui/Toast.jsx";

const UserProfile = () => {
  const { profile, loading, error, updateProfile } = useDonorProfile();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    blood_group: "",
    city: "",
    availability_status: "available",
    last_donation_date: "",
    profile_picture: null,
  });
  const [displayImage, setDisplayImage] = useState(null); // separate display state
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState("");

  // Initialize form data and display image only once
  useEffect(() => {
    if (profile && !formData.full_name) {
      setFormData({
        full_name: profile.full_name || "",
        blood_group: profile.blood_group || "",
        city: profile.address || "",
        availability_status: profile.availability_status || "available",
        last_donation_date: profile.last_donation_date || "",
        profile_picture: null,
      });
      setDisplayImage(profile.profile_picture || null);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (!file) return;
      // Client-side validation for image type and size (5MB)
      const isImage = /^image\/(jpeg|jpg|png|webp|gif)$/i.test(file.type);
      const isSmall = file.size <= 5 * 1024 * 1024;
      if (!isImage) {
        const msg = "Please upload a valid image file (JPG, PNG, GIF, WebP).";
        setImageError(msg);
        toast.error(msg);
        return;
      }
      if (!isSmall) {
        const msg = "Image is too large. Max 5MB allowed.";
        setImageError(msg);
        toast.error(msg);
        return;
      }
      setImageError("");
      setFormData({ ...formData, [name]: file });
      setDisplayImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Prevent submit if image invalid
    if (imageError) {
      toast.error(imageError);
      return;
    }

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("blood_group", formData.blood_group);
    data.append("address", formData.city);
    data.append("availability_status", formData.availability_status);
    if (formData.last_donation_date) data.append("last_donation_date", formData.last_donation_date);
    if (formData.profile_picture) {
      data.append("profile_picture", formData.profile_picture);
    }

    const res = await updateProfile(data);
    if (res.success) {
      toast.success("Profile updated successfully!");
      setEditing(false);
      // update display image with saved profile picture
      setDisplayImage(res.data.profile_picture || displayImage);
      setFormData({ ...formData, profile_picture: null }); // reset file input
    } else {
      const err = res.error || {};
      if (err.profile_picture) {
        const msg = "Please upload a valid image file (JPG, PNG, GIF, WebP).";
        setImageError(msg);
        toast.error(msg);
      }
      const friendly = err.detail || err.non_field_errors?.[0] || "Failed to update profile.";
      toast.error(friendly);
    }
  };

  if (loading)
    return (
      <DashboardLayout>
        <p className="text-center mt-20 text-gray-500">Loading profile...</p>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <p className="text-center mt-20 text-red-600">{error}</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-red-600">My Donor Profile</h2>
          {!editing && (
            <button type="button" className="btn-red" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Success/error messages are shown as toasts */}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center md:col-span-2">
            <div className="w-32 h-32 mb-2 rounded-full overflow-hidden border-2 border-red-600 relative">
              {displayImage && (
                <img
                  src={displayImage}
                  alt={formData.full_name || "Profile"}
                  className="w-32 h-32 rounded-full object-cover border-2 border-red-600"
                />
              )}
              {editing && (
                <label className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-1 cursor-pointer hover:bg-red-700">
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*"
                  />
                  ✎
                </label>
              )}
            </div>
            {imageError && <p className="text-red-600 text-sm">{imageError}</p>}
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-gray-500 font-semibold">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`p-2 border rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
              required
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="text-gray-500 font-semibold">Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className={`p-2 border rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-gray-500 font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`p-2 border rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />
          </div>

          {/* Availability */}
          <div className="flex flex-col">
            <label className="text-gray-500 font-semibold">Availability</label>
            <select
              name="availability_status"
              value={formData.availability_status}
              onChange={handleChange}
              className={`p-2 border rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            >
              <option value="available">Available</option>
              <option value="not_available">Not Available</option>
              <option value="busy">Busy</option>
            </select>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Quick Toggle Availability
              </button>
            )}
          </div>

          {/* Last Donation Date */}
          <div className="flex flex-col">
            <label className="text-gray-500 font-semibold">Last Donation Date</label>
            <input
              type="date"
              name="last_donation_date"
              value={formData.last_donation_date || ""}
              onChange={handleChange}
              className={`p-2 border rounded ${editing ? "" : "bg-gray-100 cursor-not-allowed"}`}
              disabled={!editing}
            />
          </div>

          {/* Actions (only in edit mode) */}
          {editing && (
            <div className="md:col-span-2 flex justify-center gap-3 mt-4">
              <button type="submit" className="btn-red">Save Changes</button>
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={() => {
                  setFormData({
                    full_name: profile.full_name || "",
                    blood_group: profile.blood_group || "",
                    city: profile.address || "",
                    availability_status: profile.availability_status || "available",
                    last_donation_date: profile.last_donation_date || "",
                    profile_picture: null,
                  });
                  setDisplayImage(profile.profile_picture || null);
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
