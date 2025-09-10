import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-red-800 shadow-sm px-4 lg:px-10">
      {/* Mobile Menu + Logo */}
      <div className="flex items-center navbar-start gap-3">
        {/* Mobile Hamburger */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-4 shadow-lg rounded-lg bg-white w-60 text-gray-800"
          >
            <li>
              <a className="hover:bg-red-100 rounded transition duration-200">Home</a>
            </li>

            {/* Mobile Blood Request */}
            <li tabIndex={0}>
              <details className="group">
                <summary className="cursor-pointer hover:bg-red-100 rounded px-2 py-1 group-open:bg-red-100">
                  Blood Request
                </summary>
                <ul className="p-2 ml-4">
                  <li>
                    <a className="hover:bg-red-100 rounded transition duration-200">Find Donors</a>
                  </li>
                  <li>
                    <a className="hover:bg-red-100 rounded transition duration-200">Request Blood</a>
                  </li>
                  <li>
                    <a className="hover:bg-red-100 rounded transition duration-200">Donate Blood</a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a className="hover:bg-red-100 rounded transition duration-200">About Us</a>
            </li>
            <li>
              <a className="hover:bg-red-100 rounded transition duration-200">Contact</a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current text-white"
          >
            <path d="M12 2C12 2 6 8 6 12s6 10 6 10 6-6 6-10-6-10-6-10zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          </svg>
          <span className="text-white font-bold text-xl font-sans">Hemogrid</span>
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-white px-1 gap-4">
          <li>
            <a className="hover:bg-black rounded px-2 py-1 transition duration-300">Home</a>
          </li>

          {/* Desktop Blood Request Dropdown */}
          <li className="relative group">
            <a className="cursor-pointer hover:bg-black rounded px-2 py-1 transition duration-300">
              Blood Request
            </a>
            <ul className="absolute top-full left-0 mt-1 w-48 bg-red-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <li>
                <a className="block px-4 py-2 hover:bg-black rounded transition duration-200">Find Donors</a>
              </li>
              <li>
                <a className="block px-4 py-2 hover:bg-black rounded transition duration-200">Request Blood</a>
              </li>
              <li>
                <a className="block px-4 py-2 hover:bg-black rounded transition duration-200">Donate Blood</a>
              </li>
            </ul>
          </li>

          <li>
            <a className="hover:bg-black rounded px-2 py-1 transition duration-300">About Us</a>
          </li>
          <li>
            <a className="hover:bg-black rounded px-2 py-1 transition duration-300">Contact</a>
          </li>
        </ul>
      </div>

       {/* Navbar End Buttons */}
      <div className="navbar-end gap-2">
        <Link
          to="/register"
          className="btn bg-white text-red-800 hover:bg-black hover:text-white transition duration-300"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="btn bg-white text-red-800 hover:bg-black hover:text-white transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
