import { useState } from "react";
import { useAuth } from "../AuthContext";

const useUpdatePassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const updatePassword = async (values) => {
    console.log(values);
    const { password, confirmPassword } = values;

    setLoading(true);
    setError(null);

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      console.log("token from context", token);
      const response = await fetch("http://localhost:3001/update-password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setSuccess(true);
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

  return { error, loading, success, updatePassword };
};

export default useUpdatePassword;
