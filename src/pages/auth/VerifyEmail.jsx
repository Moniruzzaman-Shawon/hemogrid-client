import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

const VerifyEmail = () => {
  const { uidb64, token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await apiClient.get(`/auth/verify-email/${uidb64}/${token}/`);
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setMessage("Invalid or expired link.");
      }
    };
    verify();
  }, [uidb64, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-800">{message}</h2>
      </div>
    </div>
  );
};

export default VerifyEmail;
