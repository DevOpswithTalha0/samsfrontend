import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyEmailTokenQuery } from "../../redux/api/Verification";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useVerifyEmailTokenQuery(token);

  useEffect(() => {
    if (data && data.statusCode === 200) {
      toast.success("Email verified successfully");
      setTimeout(() => navigate("/login"), 2000);
    }

    if (error) {
      toast.error("Verification failed. Redirecting back...");
      setTimeout(() => navigate("/verify-email"), 2000);
    }
  }, [data, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-700 via-indigo-500 to-indigo-400">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg text-center animate-fadeIn">
        {isLoading && (
          <>
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
            <h2 className="text-base sm:text-lg mt-4 font-medium text-gray-600">
              Verifying your email...
            </h2>
          </>
        )}

        {data?.statusCode === 200 && (
          <>
            <FaCheckCircle className="text-green-500 text-4xl sm:text-5xl mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Email Verified
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              You’ll be redirected to login shortly...
            </p>
          </>
        )}

        {error && (
          <>
            <FaTimesCircle className="text-red-500 text-4xl sm:text-5xl mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Token expired or invalid. Redirecting back to request a new one...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
