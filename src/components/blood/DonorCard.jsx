const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{donor.full_name}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Blood Group:</span> {donor.blood_group}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">District:</span> {donor.district}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Phone:</span> {donor.phone || "N/A"}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Last Donation:</span> {donor.last_donation || "Never"}
      </p>
    </div>
  );
};

export default DonorCard;
