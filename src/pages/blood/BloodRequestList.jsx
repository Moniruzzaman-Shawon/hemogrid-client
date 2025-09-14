import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../components/ui/Toast.jsx";

const BloodRequestList = () => {
  const { authTokens, user } = useAuthContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let endpoint = "/blood-requests/"; // default: active requests excluding own

        // Admin can see all requests
        if (user?.role === "admin") {
          endpoint = "/blood-requests/admin/requests/";
        } else {
          // Both authenticated and public users see all active requests (excluding their own)
          endpoint = "/blood-requests/";
        }

        const res = await apiClient.get(endpoint, {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });

        // Handle paginated response from Django REST Framework
        const requestsData = res.data.results || res.data;
        setRequests(Array.isArray(requestsData) ? requestsData : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        const msg = "Failed to fetch requests.";
        setError(msg);
        toast.error(msg);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [authTokens, user]);

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-700">Blood Requests</h2>
        {user && (
          <div className="flex gap-2">
            <a 
              href="/dashboard/donor" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Donor Dashboard
            </a>
            <a 
              href="/create-blood-requests" 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Create Request
            </a>
          </div>
        )}
      </div>
      {!Array.isArray(requests) || requests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="p-4 bg-white shadow rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">Blood Group: {req.blood_group}</h3>
                <p className="text-gray-600">Requester: {req.requester_email || 'Hidden'}</p>
                <p className="text-gray-600">Location: {req.location || 'N/A'}</p>
                <p className="text-gray-600">Units: {req.quantity || 1}</p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      req.status === "accepted"
                        ? "text-green-600"
                        : req.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
              </div>
              {req.details && (
                <p className="mt-2 text-gray-500 italic">"{req.details}"</p>
              )}
              <div className="mt-3 flex gap-2">
                {user && req.status === "pending" && req.requester !== user.id && (
                  <button
                    className="btn-red"
                    onClick={async () => {
                      try {
                        await apiClient.post(`/blood-requests/${req.id}/accept/`, {}, {
                          headers: { Authorization: `Bearer ${authTokens?.access}` },
                        });
                        toast.success("Request accepted. Check your email for contact.");
                        try {
                          const c = await apiClient.get(`/blood-requests/${req.id}/contact/`, {
                            headers: { Authorization: `Bearer ${authTokens?.access}` },
                          });
                          toast.info(`Contact: ${c.data.recipient_contact || 'N/A'}`);
                        } catch(e){}
                        setRequests((r) => r.map((x) => x.id === req.id ? { ...x, status: 'accepted' } : x));
                      } catch (e) {
                        toast.error(e.response?.data?.detail || "Failed to accept request");
                      }
                    }}
                  >
                    Accept
                  </button>
                )}
                
                {user && req.status === "accepted" && (
                  <>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      onClick={async () => {
                        try {
                          await apiClient.post(`/blood-requests/${req.id}/complete/`, {}, {
                            headers: { Authorization: `Bearer ${authTokens?.access}` },
                          });
                          toast.success("Request completed successfully!");
                          setRequests((r) => r.map((x) => x.id === req.id ? { ...x, status: 'completed' } : x));
                        } catch (e) {
                          toast.error(e.response?.data?.detail || "Failed to complete request");
                        }
                      }}
                    >
                      Complete
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      onClick={async () => {
                        try {
                          await apiClient.post(`/blood-requests/${req.id}/cancel/`, {}, {
                            headers: { Authorization: `Bearer ${authTokens?.access}` },
                          });
                          toast.success("Request cancelled successfully!");
                          setRequests((r) => r.map((x) => x.id === req.id ? { ...x, status: 'cancelled' } : x));
                        } catch (e) {
                          toast.error(e.response?.data?.detail || "Failed to cancel request");
                        }
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodRequestList;
