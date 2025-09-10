import  { useEffect, useState } from "react";
import api from "../lib/api.js"; // your Axios instance

const TestAPI = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await api.get("/api/donors/"); // replace with your actual endpoint
        setDonors(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Donors List</h2>
      <ul>
        {donors.map((donor) => (
          <li key={donor.id}>
            {donor.name} - {donor.blood_group} - {donor.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestAPI;
