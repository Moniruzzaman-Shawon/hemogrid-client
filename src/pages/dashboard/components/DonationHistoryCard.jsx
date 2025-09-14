const DonationHistoryCard = ({ donation }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow border">
      <div className="mb-3">
        <h3 className="font-bold text-lg text-red-700">Request #{donation.blood_request}</h3>
        <p className="text-gray-600">Status: <span className={`font-semibold ${
          donation.status === 'completed' ? 'text-green-600' : 
          donation.status === 'accepted' ? 'text-blue-600' : 'text-gray-600'
        }`}>{donation.status}</span></p>
        <p className="text-gray-600">Accepted: {new Date(donation.accepted_at).toLocaleDateString()}</p>
      </div>
      {donation.status === 'completed' && (
        <div className="text-sm text-green-600 font-semibold">
          ✓ Donation Completed
        </div>
      )}
    </div>
  );
};

export default DonationHistoryCard;
