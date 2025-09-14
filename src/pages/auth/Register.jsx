import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useToast } from "../../components/ui/Toast.jsx";
import InputField from "../../components/ui/InputField.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [offerResend, setOfferResend] = useState(false);
  const [resending, setResending] = useState(false);

  const firstErrorRef = useRef(null);
  const toast = useToast();
  const handleResend = async () => {
    try {
      setResending(true);
      const email = formData.email.toLowerCase();
      if (!email) return;
      const { resendVerification } = await import("../../services/authServices.js");
      await resendVerification(email);
      toast.success("Verification email sent if account is unverified.");
      setOfferResend(false);
    } catch (e) {
      toast.error("Failed to send verification email.");
    } finally {
      setResending(false);
    }
  };

  // Helper to normalize backend error payloads into field arrays
  const extractErrors = (data) => {
    const out = {};
    if (!data || typeof data !== "object") return out;
    // DRF style: {field: [messages], non_field_errors: [..], detail: ".."}
    Object.entries(data).forEach(([key, val]) => {
      const msgs = Array.isArray(val) ? val : [String(val)];
      // Map backend full_name -> frontend name
      const mappedKey = key === "full_name" ? "name" : key;
      out[mappedKey] = (out[mappedKey] || []).concat(msgs);
    });
    return out;
  };

  const isValidEmail = (email) => {
    // Basic RFC 5322 compliant-ish regex for practical validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setSubmitting(true);

    if (!isValidEmail(formData.email)) {
      setSubmitting(false);
      toast.error("Please enter a valid email address.");
      setErrors((e) => ({ ...e, email: ["Invalid email address"] }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSubmitting(false);
      toast.error("Passwords do not match.");
      setErrors({ password: ["Passwords do not match."], confirmPassword: ["Passwords do not match."] });
      return;
    }

    try {
      await apiClient.post("/auth/register/", {
        full_name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        age: Number(formData.age),
      });
      setSuccess("Registration successful! Please check your email to verify your account.");
      toast.success("Registration successful! Check your email to verify.");
      setSubmitted(true);
    } catch (err) {
      const payload = err.response?.data;
      const fieldErrors = extractErrors(payload);
      setErrors(fieldErrors);
      const message =
        Object.values(fieldErrors)[0]?.[0] ||
        payload?.detail ||
        "Registration failed. Please try again.";
      toast.error(message);
      // Offer resend only when email already exists (likely unverified)
      const emailErrors = fieldErrors.email || [];
      setOfferResend(emailErrors.some((m) => /exist|already/i.test(m)));
    }
    finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-red-800">Create your account</h1>
          <p className="text-gray-600 mt-1">Join Hemogrid to request or donate blood</p>
        </div>

        {success && (
          <div className="mb-4 p-3 rounded bg-green-50 text-green-700 border border-green-200">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            label="Full Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            error={Boolean(errors.name)}
            leftIcon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            )}
            ref={errors.name && !firstErrorRef.current ? firstErrorRef : null}
            disabled={submitted}
          />

          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            error={Boolean(errors.email)}
            leftIcon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" opacity="0"/>
                <path d="M4 8l8 5 8-5"/>
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
              </svg>
            )}
            ref={errors.email && !firstErrorRef.current ? firstErrorRef : null}
            disabled={submitted}
          />

          <InputField
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="At least 8 characters"
            error={Boolean(errors.password)}
            leftIcon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            rightIcon={showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.84 2.99-5.2 5.5-6.64"/>
                <path d="M1 1l22 22"/>
                <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/>
                <path d="M14.12 14.12L9.88 9.88"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
            onRightIconClick={() => setShowPassword((v) => !v)}
            disabled={submitted}
          />

          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-enter password"
            error={Boolean(errors.confirmPassword)}
            leftIcon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            rightIcon={showConfirm ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.84 2.99-5.2 5.5-6.64"/>
                <path d="M1 1l22 22"/>
                <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/>
                <path d="M14.12 14.12L9.88 9.88"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
            onRightIconClick={() => setShowConfirm((v) => !v)}
            disabled={submitted}
          />

          <InputField
            label="Age"
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            min="18"
            required
            placeholder="18+"
            error={Boolean(errors.age)}
            ref={errors.age && !firstErrorRef.current ? firstErrorRef : null}
          />

          {!submitted ? (
            <>
              <button type="submit" disabled={submitting} className="btn-red w-full disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {submitting ? "Registering..." : "Register"}
              </button>
              {offerResend && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full mt-2 text-sm text-red-800 font-semibold hover:underline disabled:opacity-50"
                >
                  {resending ? "Sending..." : "Resend verification email"}
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" className="btn-red w-full text-center">Go to Login</Link>
            </div>
          )}
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-red-800 font-semibold">Login</Link>
        </p>
        {/* Resend link removed; shown contextually when needed */}
      </div>
    </div>
  );
};

export default Register;
