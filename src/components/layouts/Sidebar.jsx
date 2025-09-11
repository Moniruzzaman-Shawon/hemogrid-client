import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  const links = [
    { name: "Dashboard", path: "/dashboard/admin" },
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Blood Requests", path: "/dashboard/admin/requests" },
    { name: "Stats", path: "/dashboard/admin/stats" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">HemoGrid Admin</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200 font-semibold" : ""}`
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
