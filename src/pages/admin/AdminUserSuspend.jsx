import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const AdminUserSuspend = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSuspend = async (id) => {
    try {
      await apiClient.post(`/admin/users/${id}/suspend/`);
      setSuccess("User suspended successfully!");
      setUsers(users.map(user => 
        user.id === id ? { ...user, is_active: false } : user
      ));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to suspend user.");
      setSuccess("");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Suspend Users</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
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
                {user.is_active ? "Active" : "Suspended"}
              </td>
              <td className="p-2 border">
                {user.is_active && (
                  <button
                    onClick={() => handleSuspend(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Suspend
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

export default AdminUserSuspend;
