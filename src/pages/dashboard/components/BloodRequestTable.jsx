const BloodRequestTable = ({ requests }) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Requester</th>
          <th className="border px-4 py-2">Blood Group</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req.id}>
            <td className="border px-4 py-2">{req.id}</td>
            <td className="border px-4 py-2">{req.requester_name}</td>
            <td className="border px-4 py-2">{req.blood_group}</td>
            <td className="border px-4 py-2">{req.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BloodRequestTable;
