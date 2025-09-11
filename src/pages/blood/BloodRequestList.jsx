import { useEffect, useState } from "react";
import BloodRequestCard from "../../components/blood/BloodRequestCard";
import apiClient from "../../services/apiClient";

const BloodRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await apiClient.get("/blood-requests/requests/"); // matches backend
      setRequests(res.data); // make sure res.data is array of requests
    } catch (err) {
      console.error("Error fetching blood requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blood requests...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.length > 0 ? (
        requests.map((req) => <BloodRequestCard key={req.id} request={req} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">No blood requests found.</p>
      )}
    </div>
  );
};

export default BloodRequestList;
