const BloodRequestCard = ({ request }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">
        {request.blood_group} Blood Needed
      </h3>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">District:</span> {request.district}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Units:</span> {request.units}
      </p>
      {request.message && (
        <p className="text-gray-700 mb-2">{request.message}</p>
      )}
      <p className="text-sm text-gray-500">
        Requested by: {request.requester?.full_name || request.requester?.email}
      </p>
    </div>
  );
};

export default BloodRequestCard;
