const BloodRequestTable = ({ requests }) => {
  if (!Array.isArray(requests) || requests.length === 0) {
    return <p className="text-gray-600">No blood requests found.</p>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Requester</th>
            <th className="px-4 py-2">Blood Group</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t">
              <td className="px-4 py-2">{req.id}</td>
              <td className="px-4 py-2">{req.requester_email || 'N/A'}</td>
              <td className="px-4 py-2">{req.blood_group}</td>
              <td className="px-4 py-2">{req.location || 'N/A'}</td>
              <td className="px-4 py-2">{req.quantity}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(req.status)}`}>
                  {req.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {new Date(req.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodRequestTable;
