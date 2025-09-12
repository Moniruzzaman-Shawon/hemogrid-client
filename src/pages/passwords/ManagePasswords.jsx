import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../services/authServices";

const ManagePasswords = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Mode: forgot or reset
  const mode = location.pathname.includes("reset-password") ? "reset" : "forgot";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "forgot") {
        await forgotPassword(email);
        setMessage("Password reset email sent!");
      } else if (mode === "reset") {
        await resetPassword(uidb64, token, newPassword);
        setMessage("Password reset successfully!");
        navigate("/login");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">
        {mode === "forgot" ? "Forgot Password" : "Reset Password"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "forgot" && (
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {mode === "reset" && (
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full input input-bordered"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        )}

        <button type="submit" className="btn btn-primary w-full">
          {mode === "forgot" ? "Send Reset Link" : "Reset Password"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default ManagePasswords;
