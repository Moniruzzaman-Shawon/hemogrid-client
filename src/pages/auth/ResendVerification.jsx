import { useState } from "react";
import { resendVerification } from "../../services/authServices";
import { Link } from "react-router-dom";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await resendVerification(email);
      setMessage("If the email is registered and unverified, a verification link has been sent.");
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-red-800 mb-6">Resend Verification</h2>
        {message && <p className="text-green-600 mb-3">{message}</p>}
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-red w-full disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {loading ? "Sending..." : "Send Verification Email"}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-red-800 font-semibold hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
