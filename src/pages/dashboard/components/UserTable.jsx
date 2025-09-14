const UserTable = ({ users }) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <p className="text-gray-600">No users found.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Blood Group</th>
            <th className="px-4 py-2">Verified</th>
            <th className="px-4 py-2">Active</th>
            <th className="px-4 py-2">Staff</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.blood_group || 'N/A'}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.is_verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.is_verified ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.is_active ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.is_staff ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.is_staff ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
