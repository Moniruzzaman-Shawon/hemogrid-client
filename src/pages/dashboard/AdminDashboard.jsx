import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import StatsCard from "./components/StatsCard";
import UserTable from "./components/UserTable";
import BloodRequestTable from "./components/BloodRequestTable";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch admin stats
        const statsRes = await apiClient.get("admin/stats/");
        setStats(statsRes.data);

        // Fetch users
        const usersRes = await apiClient.get("admin/users/");
        setUsers(usersRes.data);

        // Fetch blood requests
        const requestsRes = await apiClient.get("admin/requests/");
        setRequests(requestsRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard title="Total Users" value={stats.total_users} />
          <StatsCard title="Total Donors" value={stats.total_donors} />
          <StatsCard title="Pending Requests" value={stats.pending_requests} />
          <StatsCard title="Completed Donations" value={stats.completed_donations} />
        </div>
      )}

      {/* Users Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">All Users</h2>
        <UserTable users={users} />
      </div>

      {/* Blood Requests Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Blood Requests</h2>
        <BloodRequestTable requests={requests} />
      </div>
    </div>
  );
};

export default AdminDashboard;
