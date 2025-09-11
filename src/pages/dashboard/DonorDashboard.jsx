import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import DonationHistoryCard from "./components/DonationHistoryCard";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [camps, setCamps] = useState([
    // Temporary placeholder until API for camps exists
    { id: 1, name: "NSU Blood Camp", date: "2025-09-15" },
    { id: 2, name: "City Hospital Camp", date: "2025-09-20" },
  ]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await apiClient.get("donation-history/");
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>

      {/* Donation History */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Donation History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <DonationHistoryCard key={donation.id} donation={donation} />
          ))}
        </div>
      </div>

      {/* Upcoming Blood Camps */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Blood Camps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {camps.map((camp) => (
            <div key={camp.id} className="p-4 bg-white rounded-lg shadow">
              {camp.name} <br /> {new Date(camp.date).toLocaleDateString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
