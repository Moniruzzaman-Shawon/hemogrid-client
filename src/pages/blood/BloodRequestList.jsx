import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../context/AuthContext";

const BloodRequestList = () => {
  const { authTokens, user } = useAuthContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let endpoint = "/api/blood-requests/my-requests/";

        // Admin can see all requests
        if (user?.role === "admin") {
          endpoint = "/api/blood-requests/admin/requests/";
        }

        const res = await apiClient.get(endpoint, {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });

        setRequests(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [authTokens, user]);

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-red-700 mb-6">Blood Requests</h2>
      {requests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="p-4 bg-white shadow rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Recipient: {req.recipient_name}
                </h3>
                <p className="text-gray-600">Donor: {req.donor_name}</p>
                <p className="text-gray-600">Blood Group: {req.blood_group}</p>
                <p className="text-gray-600">Phone: {req.recipient_phone}</p>
                <p className="text-gray-600">Address: {req.recipient_address}</p>
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
              {req.message && (
                <p className="mt-2 text-gray-500 italic">"{req.message}"</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodRequestList;
