import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const AdminUserVerify = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get("/admin/users/");
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user verification
  const handleVerify = async (id) => {
    try {
      await apiClient.post(`/admin/users/${id}/verify/`);
      setSuccess("User verified successfully!");
      setUsers(users.map(user =>
        user.id === id ? { ...user, is_verified: true } : user
      ));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to verify user.");
      setSuccess("");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Verify Users</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Verified</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.full_name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                {user.is_verified ? "Yes" : "No"}
              </td>
              <td className="p-2 border">
                {!user.is_verified && (
                  <button
                    onClick={() => handleVerify(user.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserVerify;
