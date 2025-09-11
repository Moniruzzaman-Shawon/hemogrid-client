import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/auth/donor-profile/"); // absolute path
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchData();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2>Welcome, {userData.full_name}</h2>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserDashboard;
