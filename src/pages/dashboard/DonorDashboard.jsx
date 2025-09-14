import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../components/ui/Toast.jsx";
import DonationHistoryCard from "./components/DonationHistoryCard";

const DonorDashboard = () => {
  const { user, authTokens } = useAuthContext();
  const [donations, setDonations] = useState([]);
  const [suggestedRequests, setSuggestedRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("suggested"); // suggested | accepted | history
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch donation history
        try {
          const donationRes = await apiClient.get("/blood-requests/donation-history/", {
            headers: { Authorization: `Bearer ${authTokens?.access}` }
          });
          setDonations(donationRes.data?.results || donationRes.data || []);
        } catch (err) {
          console.log("Donation history fetch failed:", err);
          setDonations([]);
        }

        // Fetch suggested requests (requests matching donor's blood group)
        try {
          if (user?.blood_group) {
            const suggestedRes = await apiClient.get(`/blood-requests/?blood_group=${user.blood_group}`, {
              headers: { Authorization: `Bearer ${authTokens?.access}` }
            });
            setSuggestedRequests(suggestedRes.data?.results || suggestedRes.data || []);
          } else {
            setSuggestedRequests([]);
          }
        } catch (err) {
          console.log("Suggested requests fetch failed:", err);
          setSuggestedRequests([]);
        }

        // Fetch accepted requests (requests the donor has accepted)
        try {
          const acceptedRes = await apiClient.get("/blood-requests/my-requests/", {
            headers: { Authorization: `Bearer ${authTokens?.access}` }
          });
          setAcceptedRequests(acceptedRes.data?.results || acceptedRes.data || []);
        } catch (err) {
          console.log("Accepted requests fetch failed:", err);
          setAcceptedRequests([]);
        }

      } catch (err) {
        console.error("Error fetching donor data:", err);
        toast.error("Failed to load some donor dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user && authTokens) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user, authTokens, toast]);

  const acceptRequest = async (requestId) => {
    try {
      await apiClient.post(`/blood-requests/${requestId}/accept/`, {}, {
        headers: { Authorization: `Bearer ${authTokens?.access}` }
      });
      toast.success("Request accepted! Check your email for contact details.");
      
      // Refresh suggested requests
      const suggestedRes = await apiClient.get(`/blood-requests/?blood_group=${user.blood_group}`, {
        headers: { Authorization: `Bearer ${authTokens?.access}` }
      });
      setSuggestedRequests(suggestedRes.data?.results || suggestedRes.data || []);
      
      // Refresh accepted requests
      const acceptedRes = await apiClient.get("/blood-requests/my-requests/", {
        headers: { Authorization: `Bearer ${authTokens?.access}` }
      });
      setAcceptedRequests(acceptedRes.data?.results || acceptedRes.data || []);
      
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to accept request");
    }
  };

  const completeRequest = async (requestId) => {
    try {
      await apiClient.post(`/blood-requests/${requestId}/complete/`, {}, {
        headers: { Authorization: `Bearer ${authTokens?.access}` }
      });
      toast.success("Request completed successfully!");
      
      // Refresh accepted requests
      const acceptedRes = await apiClient.get("/blood-requests/my-requests/", {
        headers: { Authorization: `Bearer ${authTokens?.access}` }
      });
      setAcceptedRequests(acceptedRes.data?.results || acceptedRes.data || []);
      
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to complete request");
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="donor">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading donor dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  // Fallback if no user data
  if (!user) {
    return (
      <DashboardLayout role="donor">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Please log in to access the donor dashboard.</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="donor">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Donor Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.full_name || user?.email}! Blood Group: {user?.blood_group || "Not set"}</p>
        <p className="text-sm text-gray-500">Availability: {user?.availability_status || "Not set"}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {[
          { key: "suggested", label: "Suggested Requests", count: suggestedRequests.length },
          { key: "accepted", label: "My Accepted Requests", count: acceptedRequests.length },
          { key: "history", label: "Donation History", count: donations.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === tab.key 
                ? "border-red-700 text-red-800 font-semibold" 
                : "border-transparent text-gray-600"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "suggested" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Blood Requests Matching Your Blood Group ({user?.blood_group})</h2>
          {suggestedRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No requests found for your blood group.</p>
              <p className="text-sm mt-2">Check back later or update your blood group in your profile.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedRequests.map((request) => (
                <div key={request.id} className="p-4 bg-white rounded-lg shadow border">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-red-700">Blood Group: {request.blood_group}</h3>
                    <p className="text-gray-600">Location: {request.location}</p>
                    <p className="text-gray-600">Units Needed: {request.quantity}</p>
                    <p className="text-gray-600">Urgency: <span className={`font-semibold ${
                      request.urgency === 'high' ? 'text-red-600' : 
                      request.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{request.urgency}</span></p>
                    <p className="text-sm text-gray-500">Posted: {new Date(request.created_at).toLocaleDateString()}</p>
                  </div>
                  {request.details && (
                    <p className="text-gray-600 text-sm mb-3 italic">"{request.details}"</p>
                  )}
                  <button
                    onClick={() => acceptRequest(request.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Accept Request
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "accepted" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Requests You've Accepted</h2>
          {acceptedRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>You haven't accepted any requests yet.</p>
              <p className="text-sm mt-2">Check the "Suggested Requests" tab to find requests you can help with.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {acceptedRequests.map((request) => (
                <div key={request.id} className="p-4 bg-white rounded-lg shadow border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">Blood Group: {request.blood_group}</h3>
                      <p className="text-gray-600">Location: {request.location}</p>
                      <p className="text-gray-600">Units: {request.quantity}</p>
                      <p className="text-gray-600">Status: <span className={`font-semibold ${
                        request.status === 'accepted' ? 'text-green-600' : 
                        request.status === 'completed' ? 'text-blue-600' : 'text-gray-600'
                      }`}>{request.status}</span></p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(request.created_at).toLocaleDateString()}</span>
                  </div>
                  {request.details && (
                    <p className="text-gray-600 text-sm mb-3 italic">"{request.details}"</p>
                  )}
                  {request.status === 'accepted' && (
                    <button
                      onClick={() => completeRequest(request.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Donation History</h2>
          {donations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No donation history found.</p>
              <p className="text-sm mt-2">Your completed donations will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donations.map((donation) => (
                <DonationHistoryCard key={donation.id} donation={donation} />
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DonorDashboard;
