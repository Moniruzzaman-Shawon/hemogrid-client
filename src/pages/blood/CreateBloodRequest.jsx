import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { AuthContext } from "../../context/AuthContext";
import InputField from "../../components/ui/InputField.jsx";
import { useToast } from "../../components/ui/Toast.jsx";

const CreateBloodRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authTokens } = useContext(AuthContext);

  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [locationText, setLocationText] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [details, setDetails] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [expiresAt, setExpiresAt] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Redirect if not logged in or donor info missing
  useEffect(() => {
    if (!user) navigate("/login", { state: { from: location } });
    
    // Check if user has completed donor profile
    if (user && (!user.blood_group || !user.full_name)) {
      setError("Please complete your donor profile first. Go to Dashboard > Profile to set your blood group and personal information.");
      toast.error("Please complete your donor profile first.");
    }
  }, [user, navigate, location, toast]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Form validation
    if (!bloodGroup) {
      setError("Please select a blood group");
      toast.error("Please select a blood group");
      setLoading(false);
      return;
    }

    if (!locationText.trim()) {
      setError("Please enter a location");
      toast.error("Please enter a location");
      setLoading(false);
      return;
    }

    if (!contactInfo.trim()) {
      setError("Please enter contact information");
      toast.error("Please enter contact information");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        blood_group: bloodGroup,
        quantity: Number(quantity) || 1,
        location: locationText.trim(),
        contact_info: contactInfo.trim(),
        details: details.trim(),
        urgency: urgency,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
      };

      const response = await apiClient.post("/blood-requests/create/", payload, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });

      console.log("Request created successfully:", response.data);
      toast.success("Blood request created successfully!");
      
      // Redirect immediately to blood requests list
      navigate("/blood-requests", { replace: true });
    } catch (err) {
      console.error(err);
      const payload = err.response?.data;
      setError(payload?.detail || "Failed to create request. Please try again.");
      toast.error(payload?.detail || "Failed to create request.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-red-700 mb-2">Create Blood Request</h2>
        <p className="text-gray-600">Fill out the form below to request blood from donors</p>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          {error.includes("complete your donor profile") && (
            <div className="mt-2">
              <a 
                href="/dashboard/profile" 
                className="text-red-800 underline hover:text-red-900"
              >
                Complete Profile Now →
              </a>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group Required *
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Units Needed *
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="e.g., 2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Hospital name or area"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Information *
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Phone number or email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency Level
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="low">Low - Can wait a few days</option>
              <option value="medium">Medium - Within 24-48 hours</option>
              <option value="high">High - Urgent, needed immediately</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expires At (Optional)
            </label>
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details (Optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Any additional information about the request..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          {loading ? "Creating Request..." : "Create Blood Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateBloodRequest;
