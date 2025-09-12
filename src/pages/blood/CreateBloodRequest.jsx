import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const CreateBloodRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { donorId, donorName } = location.state || {}; // passed from donor card

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        donor: donorId,
        donor_name: donorName,
        recipient_name: recipientName,
        recipient_phone: recipientPhone,
        recipient_address: recipientAddress,
        blood_group: bloodGroup,
        message,
      };

      await apiClient.post("/blood-requests/blood-requests/create/", payload); 
      setSuccess("Blood request sent successfully!");
      setError("");

      // Reset form
      setRecipientName("");
      setRecipientPhone("");
      setRecipientAddress("");
      setBloodGroup("");
      setMessage("");

      // Optionally redirect to My Requests page
      // navigate("/blood-requests/my-requests");
    } catch (err) {
      console.error(err);
      setError("Failed to send request. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-red-700">
        Request Blood from {donorName || "Donor"}
      </h2>

      {success && <p className="text-green-600 mb-3">{success}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Your Phone"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Your Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-lg"
        />
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <textarea
          placeholder="Optional message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default CreateBloodRequest;
