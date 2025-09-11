import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

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

  return <div>Welcome, {user.full_name}</div>;
};

export default UserDashboard;
