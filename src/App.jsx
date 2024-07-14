import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import SignInForm from "./signin/SignIn";
import SignUp from "./signup/SignUp";
import EmailForm from "./forgotPassword/EmailForm";
import VerifyOtp from "./forgotPassword/VerifyOtpForm";
import UpdatePasswordForm from "./forgotPassword/UpdatePasswordForm";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<EmailForm />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/update-password" element={<UpdatePasswordForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
