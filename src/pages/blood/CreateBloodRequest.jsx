import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { AuthContext } from "../../context/AuthContext";

const CreateBloodRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { donorId, donorName } = location.state || {};
  const { user, authTokens } = useContext(AuthContext);

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in or donor info missing
  useEffect(() => {
    if (!user) navigate("/login", { state: { from: location } });
    else if (!donorId || !donorName) navigate("/donors");
  }, [user, donorId, donorName, navigate, location]);

  if (!user || !donorId || !donorName) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      await apiClient.post("/blood-requests/blood-request-create/", payload, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });

      setSuccess("Blood request sent successfully!");
      setError("");

      // Reset form
      setRecipientName("");
      setRecipientPhone("");
      setRecipientAddress("");
      setBloodGroup("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Failed to send request. Please try again."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-red-700">
        Request Blood from {donorName}
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
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Optional message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded-lg transition duration-200 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateBloodRequest;
