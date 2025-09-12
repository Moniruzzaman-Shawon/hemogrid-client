import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  const links = [
    { name: "Profile", path: "/blood-requests" },
    { name: "Dashboard", path: "/dashboard/" },
    { name: "Donors", path: "/donors" },
    { name: "Blood Requests", path: "/blood-requests" },
    { name: "Donate Blood", path: "/blood-requests" },
    { name: "Password Manager", path: "/blood-requests" },
    
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white shadow-lg  flex flex-col p-6 min-h-screen">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold mb-8 tracking-wide">HemoGrid</h1>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
               transform hover:translate-x-1 hover:bg-red-500 hover:shadow-md
               ${isActive ? "bg-gradient-to-r from-red-600 to-red-700 font-semibold shadow-lg" : ""}`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-md">{link.name}</span>
          </NavLink>
        ))}
      </nav>


      {/* Footer / Optional Extra Info */}
      <div className="mt-auto text-sm text-red-100 pt-6 border-t border-red-400">
        © 2025 HemoGrid
      </div>
    </aside>
  );
};

export default Sidebar;
