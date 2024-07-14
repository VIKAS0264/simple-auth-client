import { useNavigate } from "react-router-dom";
import useSendOtp from "./sendOtp";
import { useEffect } from "react";
import { useState } from "react";

const EmailForm = () => {
  const { loading, success, error, sendOtp } = useSendOtp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (success == true) {
      navigate("/verify-otp", { state: { email: email } });
    }
  }, [success]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    setEmail(email);
    console.log("send otp to this email", email);
    sendOtp(email);
  };
  return loading ? (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Loading...
        </h2>
      </div>
    </div>
  ) : (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-sm font-bold leading-9 tracking-tight text-gray-900">
            Please provide your registered email address
          </h2>
        </div>
        {error ? (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-sm font-bold leading-9 tracking-tight text-red-600">
              {error}
            </h2>
          </div>
        ) : null}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailForm;
