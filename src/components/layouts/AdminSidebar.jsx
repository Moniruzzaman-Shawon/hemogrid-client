import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  if (role !== "admin") return null;

  const links = [
    { name: "Dashboard", path: "/dashboard/admin" },
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Blood Requests", path: "/dashboard/admin/requests" },
    { name: "Statistics", path: "/dashboard/admin/stats" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 flex flex-col mt-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-6 py-3 hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
