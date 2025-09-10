import  { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useApi } from "../hooks/useApi";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const { get } = useApi();
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await get("/api/donors/");
      setDonors(res.data);
    };
    fetchDonors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>

      <h2>Available Donors</h2>
      <ul>
        {donors.map((d) => (
          <li key={d.id}>{d.name} - {d.blood_type}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
