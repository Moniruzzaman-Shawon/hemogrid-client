import { useState } from "react";
import apiClient from "../../services/apiClient";

const CreateBloodRequest = () => {
  const [formData, setFormData] = useState({
    blood_group: "",
    district: "",
    units: 1,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post("/blood-requests/blood-requests/create/", formData);
      setSuccess("Blood request created successfully!");
      setFormData({ blood_group: "", district: "", units: 1, message: "" });
    } catch (err) {
      console.error("Error creating blood request:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Blood Request</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="blood_group"
          value={formData.blood_group}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
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
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="units"
          min="1"
          value={formData.units}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Additional message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-black transition"
        >
          {loading ? "Creating..." : "Create Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateBloodRequest;
