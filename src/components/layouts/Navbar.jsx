import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-red-800 shadow-sm px-4 md:px-8 lg:px-10">
      {/* Logo */}
      <div className="flex items-center navbar-start gap-3">
        <Link to="/" className="flex items-center gap-2">
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
          <span className="text-white font-bold text-xl font-sans">
            Hemogrid
          </span>
        </Link>
      </div>

      {/* Mobile Hamburger Menu (right side) */}
      <div className="navbar-end sm:block md:hidden">
        <div className="dropdown dropdown-end">
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
              <Link
                to="/"
                className="hover:bg-red-100 rounded transition duration-200"
              >
                Home
              </Link>
            </li>
            <li tabIndex={0}>
              <details className="group">
                <summary className="cursor-pointer hover:bg-red-100 rounded px-2 py-1 group-open:bg-red-100">
                  Blood Request
                </summary>
                <ul className="p-2 ml-4">
                  <li>
                    <Link
                      to="/donors"
                      className="hover:bg-red-100 rounded transition duration-200"
                    >
                      Find Donors
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blood-requests"
                      className="hover:bg-red-100 rounded transition duration-200"
                    >
                      Request Blood
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/donate-blood"
                      className="hover:bg-red-100 rounded transition duration-200"
                    >
                      Donate Blood
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link
                to="/aboutUs"
                className="hover:bg-red-100 rounded transition duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:bg-red-100 rounded transition duration-200"
              >
                Contact
              </Link>
            </li>

            {/* Mobile Login/Register Buttons */}
            <li className="mt-2">
              <Link
                to="/register"
                className="btn w-full mb-2 bg-white text-red-800 hover:bg-black hover:text-white transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn w-full bg-white text-red-800 hover:bg-black hover:text-white transition duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop + Tablet Menu (md and above) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal text-white px-1 gap-4">
          <li>
            <Link
              to="/"
              className="hover:bg-black rounded px-2 py-1 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <span className="cursor-pointer hover:bg-black rounded px-2 py-1 transition duration-300">
              Blood Request
            </span>
            <ul className="absolute top-full left-0 mt-1 w-48 bg-red-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <li>
                <Link
                  to="/donors"
                  className="block px-4 py-2 hover:bg-black rounded transition duration-200"
                >
                  Find Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/blood-requests"
                  className="block px-4 py-2 hover:bg-black rounded transition duration-200"
                >
                  Request Blood
                </Link>
              </li>
              <li>
                <Link
                  to="/donate-blood"
                  className="block px-4 py-2 hover:bg-black rounded transition duration-200"
                >
                  Donate Blood
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/aboutUs"
              className="hover:bg-black rounded px-2 py-1 transition duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:bg-black rounded px-2 py-1 transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop + Tablet Login/Register Buttons */}
      <div className="navbar-end hidden md:flex gap-2">
        <Link
          to="/register"
          className="btn bg-white text-red-800 hover:bg-black hover:text-white transition duration-300 
               md:px-3 md:py-1 md:text-sm lg:px-4 lg:py-2 lg:text-base"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="btn bg-white text-red-800 hover:bg-black hover:text-white transition duration-300
               md:px-3 md:py-1 md:text-sm lg:px-4 lg:py-2 lg:text-base"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
