import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      setSubmitting(true);
      await forgotPassword(email);
      setMessage("Password reset link has been sent to your email.");
    } catch (err) {
      setError("Failed to send reset email. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" disabled={submitting} className="btn-red w-full disabled:opacity-50 flex items-center justify-center gap-2">
          {submitting && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          {submitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <div className="mt-4 flex items-center justify-end text-sm">
        <Link to="/login" className="text-red-800 font-semibold hover:underline">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
