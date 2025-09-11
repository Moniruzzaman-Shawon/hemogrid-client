import { useAuthContext } from "../../context/AuthContext";

const TopNav = ({ role }) => {
  const { user, logout } = useAuthContext();

  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <div>
        <h2 className="text-lg font-semibold">{role === "admin" ? "Admin Panel" : "Dashboard"}</h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.full_name || user?.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopNav;
