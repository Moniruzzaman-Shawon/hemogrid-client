import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import BloodRequestCard from "../../components/blood/BloodRequestCard";

const MyBloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    try {
      const res = await apiClient.get("/blood-requests/my-requests/");
      // Handle paginated response from Django REST Framework
      const requestsData = res.data.results || res.data;
      setRequests(Array.isArray(requestsData) ? requestsData : []);
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
      {Array.isArray(requests) && requests.length > 0 ? (
        requests.map((request) => (
          <BloodRequestCard key={request.id} request={request} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600">No blood requests found.</p>
      )}
    </div>
  );
};

export default MyBloodRequests;
