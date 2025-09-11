import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useAuthContext(); // 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md lg:max-w-lg p-8 lg:p-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current text-red-800"
          >
            <path d="M12 2C12 2 6 8 6 12s6 10 6 10 6-6 6-10-6-10-6-10zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          </svg>
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-center text-red-800 mb-6">
          Login to Hemogrid
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-red-800 text-white font-semibold rounded-lg hover:bg-black transition duration-300"
          >
            Login
          </button>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </form>

        <div className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-red-800 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
