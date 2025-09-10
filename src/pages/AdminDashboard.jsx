import useAuthContext from "../hooks/useAuthContext";

const AdminDashboard = () => {
  const { user, logoutUser } = useAuthContext();

  if (!user || user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
