import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import BloodRequestCard from "../../components/blood/BloodRequestCard";

const MyBloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    try {
      const res = await apiClient.get("/blood-requests/my-requests/");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching your blood requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  if (loading) return <p>Loading your requests...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {requests.map((request) => (
        <BloodRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default MyBloodRequests;
