import { useNavigate } from "react-router-dom";
import useVerifyOtp from "./useVerifyOtp";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error, success, loading, verifyOtp } = useVerifyOtp();

  useEffect(() => {
    if (success == true) {
      navigate("/update-password");
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otp = formData.get("otp");
    console.log("otp entered", otp);
    verifyOtp({ email: location.state?.email, otp });
  };
  return (
    <>
      {loading ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Loading...
            </h2>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {error ? (
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
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
                  Enter 4 digit OTP
                </label>
                <div className="mt-2">
                  <input
                    id="otp"
                    name="otp"
                    required
                    autoComplete="otp"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyOtp;
