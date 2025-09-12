import { useEffect, useState } from "react";
import BloodRequestService from "../../services/bloodRequestService";

const DonationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await BloodRequestService.getUserDonationHistory();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch donation history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading donation history...</p>;
  if (!history.length) return <p>No donation history found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Donation History</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-red-700 text-white">
          <tr>
            <th className="px-4 py-2">Donor</th>
            <th className="px-4 py-2">Recipient</th>
            <th className="px-4 py-2">Blood Group</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id} className="text-center border-t border-gray-200">
              <td className="px-4 py-2">{h.donor_name}</td>
              <td className="px-4 py-2">{h.recipient_name}</td>
              <td className="px-4 py-2">{h.blood_group}</td>
              <td className="px-4 py-2">{new Date(h.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2">{h.message || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistory;
