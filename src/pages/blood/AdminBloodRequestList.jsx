import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const AdminBloodRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await apiClient.get("/admin/requests/");
        setRequests(res.data);
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
            <th className="p-2 border">Donor</th>
            <th className="p-2 border">Recipient</th>
            <th className="p-2 border">Blood Group</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="text-center">
              <td className="p-2 border">{req.id}</td>
              <td className="p-2 border">{req.donor_name}</td>
              <td className="p-2 border">{req.recipient_name}</td>
              <td className="p-2 border">{req.blood_group}</td>
              <td className="p-2 border">{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBloodRequestList;
