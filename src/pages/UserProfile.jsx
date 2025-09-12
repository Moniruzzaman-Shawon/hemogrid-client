import { useState, useEffect } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import useDonorProfile from "../hooks/useDonorProfile";

const UserProfile = () => {
  const { profile, loading, error, updateProfile } = useDonorProfile();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    blood_group: "",
    city: "",
    profile_picture: null,
  });
  const [displayImage, setDisplayImage] = useState(null); // separate display state
  const [message, setMessage] = useState("");

  // Initialize form data and display image only once
  useEffect(() => {
    if (profile && !formData.full_name) {
      setFormData({
        full_name: profile.full_name || "",
        blood_group: profile.blood_group || "",
        city: profile.address || "",
        profile_picture: null,
      });
      setDisplayImage(profile.profile_picture || null);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setDisplayImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("blood_group", formData.blood_group);
    data.append("address", formData.city);
    data.append("email", profile.email);
    if (formData.profile_picture) {
      data.append("profile_picture", formData.profile_picture);
    }

    const res = await updateProfile(data);
    if (res.success) {
      setMessage("Profile updated successfully!");
      setEditing(false);
      // update display image with saved profile picture
      setDisplayImage(res.data.profile_picture || displayImage);
      setFormData({ ...formData, profile_picture: null }); // reset file input
    } else {
      setMessage(
        typeof res.error === "string" ? res.error : JSON.stringify(res.error)
      );
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
        <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
          My Donor Profile
        </h2>

        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

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
              readOnly={!editing}
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
              readOnly={!editing}
            />
          </div>

          {/* Edit / Save Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type={editing ? "submit" : "button"}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              onClick={() => !editing && setEditing(true)}
            >
              {editing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
