import { useState } from "react";
import { useAuth } from "../AuthContext";

const useSignIn = () => {
  const { login } = useAuth();
  // State for feedback
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle signup
  const signIn = async (values) => {
    setLoading(true);
    setError(null);
    const { email, password } = values;
    if (values.email === "" || values.password === "") {
      setError("Please fill all the fields");
    }
    try {
      const response = await fetch("http://127.0.0.1:3001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("data from api call", data);

      if (response.status == 200) {
        const { token } = data;
        login(token, { email: "some email" });
        return userData;
      } else {
        setError(data?.message ?? "Invalid email or password");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Return form data, feedback states, and the signup function
  return { error, loading, signIn };
};

export default useSignIn;
