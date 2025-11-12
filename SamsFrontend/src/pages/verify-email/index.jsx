import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useResendVerificationEmailMutation } from "../../redux/api/Verification";

const VerifyEmail = () => {
  const [cooldown, setCooldown] = useState(30);
  const [email, setEmail] = useState("");
  const [resendEmail, { isLoading }] = useResendVerificationEmailMutation();

  const emailRegex =
    /^[A-Za-z]{2}\d{2}-[A-Za-z]{3}-\d{3}@STUDENTS\.CUISAHIWAL\.EDU\.PK$/;

  const handleEmailChange = (e) => {
    let input = e.target.value.toUpperCase();

    input = input.replace(/^([A-Za-z]{2}\d{2})(?=\w)/, "$1-");
    input = input.replace(/^([A-Za-z]{2}\d{2}-[A-Za-z]{3})(?=\w)/, "$1-");

    if (input.length > 12) {
      input = input.slice(0, 12);
    }

    if (input.length >= 12) {
      input = input + "@STUDENTS.CUISAHIWAL.EDU.PK";
    }

    setEmail(input);
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error(
        "Please enter a valid email in the format: AA00-AAA-000@STUDENTS.CUISAHIWAL.EDU.PK"
      );
      return;
    }

    try {
      await resendEmail({ email }).unwrap();
      toast.success("Verification email resent!");
      setCooldown(30);
    } catch (error) {
      toast.error("Failed to resend email. Try again.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-lg w-full text-center animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to{" "}
          <span className="font-medium text-indigo-600">
            {email || "your email"}
          </span>
          . <br />
          Please check your inbox to continue.
        </p>

        {cooldown === 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Enter the email address where you need the verification link:
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="AA00-AAA-000@STUDENTS.CUISAHIWAL.EDU.PK"
              className="w-full p-2 border rounded-lg text-gray-800 mb-4"
            />
          </div>
        )}

        <button
          onClick={handleResend}
          disabled={cooldown > 0 || isLoading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
            cooldown > 0 || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
