import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const AdminStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get("/admin/stats/");
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch statistics.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-2xl font-bold">{stats.total_users || 0}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Donors</h3>
          <p className="text-2xl font-bold">{stats.total_donors || 0}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Blood Requests</h3>
          <p className="text-2xl font-bold">{stats.total_requests || 0}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Pending Requests</h3>
          <p className="text-2xl font-bold">{stats.pending_requests || 0}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Completed Requests</h3>
          <p className="text-2xl font-bold">{stats.completed_requests || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
