import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/ui/InputField.jsx";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { resendVerification } from "../../services/authServices";
import { useToast } from "../../components/ui/Toast.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useAuthContext();
  const [submitting, setSubmitting] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the page to redirect to after login
  // If coming from a protected page, use that, otherwise default to dashboard
  const from = location.state?.from || "/dashboard"; 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await loginUser(email, password);

      // Redirect back to original page or dashboard
      if (from.donorId && from.donorName) {
        // coming from DonorCard click
        navigate("/create-blood-requests", {
          state: { donorId: from.donorId, donorName: from.donorName },
          replace: true,
        });
      } else if (from.pathname) {
        // coming from other protected page
        navigate(from.pathname, { replace: true });
      } else {
        // default
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      const payload = err.response?.data || {};
      const detail = payload?.detail || err.message || "Login failed";
      setError(detail);
      setCanResend(/verify/i.test(detail) || payload?.code === "inactive_or_unverified");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      setResending(true);
      await resendVerification(email.toLowerCase());
      toast.success("Verification email sent if account is unverified.");
      setCanResend(false);
    } catch (e) {
      toast.error("Failed to send verification email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md lg:max-w-lg p-8 lg:p-12">
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
          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-red w-full disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {submitting ? "Logging in..." : "Login"}
          </button>
          {error && (
            <div className="mt-2">
              <p className="text-red-600 text-sm">{error}</p>
              {canResend && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="mt-2 text-sm text-red-800 font-semibold hover:underline disabled:opacity-50"
                >
                  {resending ? "Sending..." : "Resend verification email"}
                </button>
              )}
            </div>
          )}
        </form>

        <div className="flex items-center justify-between mt-4 text-gray-600">
          <Link
            to="/forgot-password"
            className="text-sm text-red-800 font-semibold hover:underline"
          >
            Forgot password?
          </Link>
          <div>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-800 font-semibold hover:underline"
            >
              Register
            </Link>
            {/* Resend verification is shown above only when needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
