import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/auth/donor-profile/");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <DashboardLayout role="user">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.full_name || "User"}</h1>
      <p>Email: {user?.email}</p>
    </DashboardLayout>
  );
};

export default UserDashboard;
