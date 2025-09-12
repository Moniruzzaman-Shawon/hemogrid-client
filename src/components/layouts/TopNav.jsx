import { useAuthContext } from "../../context/AuthContext";

const TopNav = ({ role }) => {
  const { user, logoutUser } = useAuthContext();

  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-gray-200 shadow-md  px-6 py-4 md:py-3 sticky top-0 z-50">
      {/* Title */}
      <div className="mb-3 md:mb-0">
        <h2 className="text-xl md:text-2xl font-semibold  text-black">
          {role === "admin" ? "Admin Panel" : "Dashboard"}
        </h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
        <span className="font-medium text-gray-700 truncate max-w-[180px]">
          {user?.full_name || user?.email}
        </span>
        <button
          onClick={logoutUser} // use correct function
          className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition duration-300 shadow-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopNav;
