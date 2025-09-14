import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import InputField from "../../components/ui/InputField.jsx";
import { resetPassword } from "../../services/authServices";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setSubmitting(true);
      await resetPassword(uidb64, token, password, confirmPassword);
      setMessage("Password has been reset successfully.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const apiError = err.response?.data;
      setError(apiError?.error || apiError?.detail || "Failed to reset password. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="New Password"
          name="new_password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter new password"
        />
        <InputField
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm new password"
        />
        <button type="submit" disabled={submitting} className="btn-red w-full disabled:opacity-50 flex items-center justify-center gap-2">
          {submitting && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          {submitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
