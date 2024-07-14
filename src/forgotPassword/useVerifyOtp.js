import { useState } from "react";
import { useAuth } from "../AuthContext";

const useVerifyOtp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const verifyOtp = async ({ email, otp }) => {
    setLoading(true);
    try {
      if (!email || !otp) {
        setError("Invalid email or OTP");
        return;
      }
      const response = await fetch("http://localhost:3001/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.status === 200) {
        const { token } = data;
        login(token, { email });
        setSuccess(true);
      } else {
        setError(data?.message ?? "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { error, success, loading, verifyOtp };
};

export default useVerifyOtp;
