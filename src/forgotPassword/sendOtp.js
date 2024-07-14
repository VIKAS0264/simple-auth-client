import { useState } from "react";

const useSendOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const sendOtp = async (email) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.status === 400) {
        setError(
          responseData?.message ?? "Something went wrong couldn't send OTP"
        );
      } else if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, sendOtp };
};

export default useSendOtp;
