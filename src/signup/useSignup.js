import { useState } from "react";
import { useAuth } from "../AuthContext";

const useSignup = () => {
  const { login } = useAuth();
  // State for feedback
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Handle signup
  const registerUser = async (values) => {
    const { email, password, confirmPassword } = values;
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status == 200) {
        const { token } = data;

        login(token, { email });
      } else {
        setError(data?.message ?? "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Return form data, feedback states, and the signup function
  return { error, loading, registerUser };
};

export default useSignup;
