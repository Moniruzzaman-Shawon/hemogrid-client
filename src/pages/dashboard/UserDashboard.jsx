import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useToast } from "../../components/ui/Toast.jsx";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("recipient"); // recipient | my | history
  const [recipientRequests, setRecipientRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, recipientRes, myReqRes, histRes] = await Promise.all([
          apiClient.get("/auth/donor-profile/"),
          apiClient.get("/blood-requests/"),
          apiClient.get("/blood-requests/my-requests/"),
          apiClient.get("/blood-requests/donation-history/"),
        ]);
        setUser(profileRes.data);
        setRecipientRequests(recipientRes.data?.results || recipientRes.data || []);
        setMyRequests(myReqRes.data?.results || myReqRes.data || []);
        setHistory(histRes.data?.results || histRes.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        toast.error("Failed to load dashboard data");
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const acceptRequest = async (id) => {
    try {
      await apiClient.post(`/blood-requests/${id}/accept/`);
      toast.success("Request accepted");
      setRecipientRequests((list) => list.map((r) => (r.id === id ? { ...r, status: "accepted" } : r)));
    } catch (e) {
      toast.error(e.response?.data?.detail || "Failed to accept request");
    }
  };

  const updateMyRequestStatus = async (id, status) => {
    try {
      await apiClient.put(`/blood-requests/${id}/update-status/`, { status });
      toast.success(`Request ${status}.`);
      setMyRequests((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (e) {
      toast.error(e.response?.data?.detail || "Failed to update status");
    }
  };

  const refreshTab = async (tab) => {
    try {
      setTabLoading(true);
      if (tab === "recipient") {
        const res = await apiClient.get("/blood-requests/");
        setRecipientRequests(res.data?.results || res.data || []);
      } else if (tab === "my") {
        const res = await apiClient.get("/blood-requests/my-requests/");
        setMyRequests(res.data?.results || res.data || []);
      } else if (tab === "history") {
        const res = await apiClient.get("/blood-requests/donation-history/");
        setHistory(res.data?.results || res.data || []);
      }
    } catch (e) {
      toast.error("Failed to refresh data");
    } finally {
      setTabLoading(false);
    }
  };

  if (loading || !user) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout role="user">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.full_name || user?.email || "User"}</h1>
        <p className="text-gray-600">Blood Group: {user?.blood_group || "Not set"}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b">
        {[
          { key: "recipient", label: "Recipient Requests" },
          { key: "my", label: "My Requests" },
          { key: "history", label: "Donation History" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key); refreshTab(t.key); }}
            className={`px-4 py-2 -mb-px border-b-2 ${activeTab === t.key ? "border-red-700 text-red-800 font-semibold" : "border-transparent text-gray-600"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "recipient" && (
        <div>
          {tabLoading ? <p>Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipientRequests.length === 0 ? (
                <p>No active requests found.</p>
              ) : recipientRequests.map((req) => (
                <div key={req.id} className="p-4 bg-white rounded shadow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Blood Group: {req.blood_group}</h3>
                    <p className="text-gray-600">Requester: {req.requester_email || 'Hidden'}</p>
                    <p className="text-gray-600">Location: {req.location || 'N/A'}</p>
                    <p className="text-gray-600">Units: {req.quantity || 1}</p>
                    <p className="text-gray-600">Status: {req.status}</p>
                  </div>
                  {req.status === 'pending' && (
                    <button className="btn-red mt-3" onClick={async () => { await acceptRequest(req.id); try { const c= await apiClient.get(`/blood-requests/${req.id}/contact/`); toast.info(`Contact: ${c.data.recipient_contact || 'N/A'}`);} catch(e){} }}>Accept</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "my" && (
        <div>
          {tabLoading ? <p>Loading...</p> : (
            <div className="space-y-3">
              {Array.isArray(myRequests) && myRequests.length === 0 ? (
                <p>No requests created by you.</p>
              ) : (myRequests || []).map((req) => (
                <div key={req.id} className="p-4 bg-white rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{req.recipient_name}</h3>
                      <p className="text-gray-600">Blood Group: {req.blood_group}</p>
                      <p className="text-gray-600">Status: {req.status}</p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(req.created_at).toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {req.status === 'pending' && (
                      <button className="btn-red" onClick={() => updateMyRequestStatus(req.id, 'cancelled')}>Cancel</button>
                    )}
                    {req.status === 'accepted' && (
                      <button className="btn-red" onClick={() => updateMyRequestStatus(req.id, 'completed')}>Mark Completed</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div>
          {tabLoading ? <p>Loading...</p> : (
            <div className="space-y-3">
              {history.length === 0 ? (
                <p>No donation history.</p>
              ) : history.map((h) => (
                <div key={h.id} className="p-4 bg-white rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Request #{h.blood_request}</p>
                      <p className="text-gray-600">Status: {h.status}</p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(h.accepted_at).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
