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
        const statsRes = await apiClient.get("/blood-requests/admin/stats/");
        setStats(statsRes.data);

        // Fetch users
        const usersRes = await apiClient.get("/auth/admin/users/");
        setUsers(usersRes.data);

        // Fetch blood requests
        const requestsRes = await apiClient.get("/blood-requests/admin/requests/");
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
          <StatsCard title="Total Requests" value={stats.total_requests} />
          <StatsCard title="Fulfilled Requests" value={stats.fulfilled_requests} />
          <StatsCard title="Active Donors" value={stats.active_donors} />
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

      {/* Most Active Donors */}
      {stats?.most_active_donors && (
        <div>
          <h2 className="text-xl font-bold mb-2">Most Active Donors</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Donations</th>
                </tr>
              </thead>
              <tbody>
                {stats.most_active_donors.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="px-4 py-2">{d.email}</td>
                    <td className="px-4 py-2">{d.donation_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
