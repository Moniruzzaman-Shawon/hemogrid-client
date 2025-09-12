import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await apiClient.post("/auth/register/", {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age,
      });
      setSuccess("Registration successful! Please check your email to verify your account.");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-red-800 mb-6">Create Your Account</h2>

        {success && <p className="text-green-600 mb-3">{success}</p>}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="input"/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input"/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="input"/>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="input"/>
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" min="18" required className="input"/>
          <button type="submit" className="btn-red w-full">Register</button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-red-800 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
