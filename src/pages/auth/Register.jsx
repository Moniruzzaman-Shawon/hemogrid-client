import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    bloodGroup: "",
    lastDonation: "",
    vaccinated: false,
    monthsSinceVaccine: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Add registration logic
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
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
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="18"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Last Donation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Donation Date</label>
            <input
              type="date"
              name="lastDonation"
              value={formData.lastDonation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
            />
          </div>

          {/* Vaccine Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="vaccinated"
              checked={formData.vaccinated}
              onChange={handleChange}
              className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded"
            />
            <label className="text-gray-700 font-semibold">Have you received any vaccines?</label>
          </div>

          {/* Months since last vaccine (conditional) */}
          {formData.vaccinated && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Months since last vaccine</label>
              <input
                type="number"
                name="monthsSinceVaccine"
                value={formData.monthsSinceVaccine}
                onChange={handleChange}
                placeholder="e.g., 6"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-red-800 text-white font-semibold rounded-lg hover:bg-black transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-800 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
