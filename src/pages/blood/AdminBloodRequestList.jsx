import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const AdminBloodRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await apiClient.get("/blood-requests/admin/requests/");
        // Handle paginated response from Django REST Framework
        const requestsData = res.data.results || res.data;
        setRequests(Array.isArray(requestsData) ? requestsData : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blood requests.");
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading blood requests...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Blood Requests</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Requester</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Blood Group</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(requests) && requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id} className="text-center">
                <td className="p-2 border">{req.id}</td>
                <td className="p-2 border">{req.requester_email || 'N/A'}</td>
                <td className="p-2 border">{req.location || 'N/A'}</td>
                <td className="p-2 border">{req.blood_group}</td>
                <td className="p-2 border">{req.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-600">No blood requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBloodRequestList;
