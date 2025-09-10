// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";


const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await register(formData);
      setSuccess("Registration successful! Please log in.");
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      setError("Failed to register. Please try again.",error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-4 text-sm text-green-600">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
