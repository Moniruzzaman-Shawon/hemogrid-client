import { useEffect, useState } from "react";
import DonorCard from "../../components/blood/DonorCard";
import apiClient from "../../services/apiClient";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    try {
      const res = await apiClient.get("/auth/donors/");
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {donors.length > 0 ? (
        donors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
      ) : (
        <p>No donors found.</p>
      )}
    </div>
  );
};

export default DonorList;
