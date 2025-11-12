import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FaArrowUp, FaShieldAlt, FaUserShield } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/User";
import { adminAccessKey } from "../../../utils/constants";
import { useLoginMutation } from "../../../redux/api/Auth";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading: isApiLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    registrationNumber: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted with data:", formData);
      console.log("API Base URL:", import.meta.env.VITE_API_URL);
      console.log("Login endpoint:", "user/login");

      // Call the login API
      const response = await login({
        registrationNumber: formData.registrationNumber,
        password: formData.password,
      }).unwrap();

      console.log("Login API response:", response);

      // Check if the response indicates admin access
      if (
        response &&
        response.data &&
        response.data.user &&
        response.data.user.role === "admin"
      ) {
        console.log("Admin login successful!");

        // Store token in localStorage
        if (response.data.accessToken) {
          localStorage.setItem(adminAccessKey, response.data.accessToken);
          console.log(
            "Admin token stored:",
            response.data.accessToken.substring(0, 20) + "..."
          );
        } else {
          console.error("No access token in response:", response.data);
        }

        // Dispatch to Redux
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );

        console.log("User dispatched to Redux:", response.data.user);

        // Navigate to dashboard
        console.log("Navigating to dashboard...");
        navigate("/admin/dashboard");
      } else {
        console.log("User is not an admin!");
        toast.error("Access denied! Admin privileges required.");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error types
      if (error.data && error.data.message) {
        toast.error(error.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="text-black text-xl flex items-center hover:text-indigo-700 font-medium"
            >
              <i className="fas fa-home mr-1" />
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <div className="text-indigo-500 text-xl font-semibold flex items-center">
              <FaShieldAlt className="mr-2" />
              Admin Login
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-xl text-center max-w-lg">
            Secure access to the administrative dashboard for managing the
            Student Affairs Management System.
          </p>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pt-12 pb-24 bg-white">
        <div className="flex w-full max-w-7xl flex-col lg:flex-row gap-10">
          <div className="hidden lg:flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100 p-12 rounded-xl w-full max-w-lg">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 bg-white text-3xl font-medium rounded-[30px] px-6 py-4 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <FaUserShield className="w-6 h-6 text-white" />
                </div>
                <span>Admin Portal</span>
              </div>
              <div className="mt-20 text-center text-black px-4">
                <h2 className="text-3xl font-semibold leading-tight">
                  Administrative Dashboard
                </h2>
                <p className="mt-6 text-base">
                  Manage students, events, grievances, and counseling
                  applications with our comprehensive admin panel. Monitor
                  system statistics and ensure smooth operations.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600">
                      25+
                    </div>
                    <div className="text-sm text-gray-600">Events</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600">
                      150+
                    </div>
                    <div className="text-sm text-gray-600">Grievances</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600">
                      80+
                    </div>
                    <div className="text-sm text-gray-600">Counseling</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-md text-black">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-semibold">Admin Access</h2>
                <p className="mt-3.5 text-base">
                  Please enter your admin credentials to continue.
                </p>
              </div>
              <form
                className="flex flex-col justify-center mt-12 text-base w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="registrationNumber" className="font-medium">
                      <span className="text-zinc-800">Username</span>
                      <span className="text-red-600"> *</span>
                    </label>
                    <input
                      id="registrationNumber"
                      type="text"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className="w-full mt-2 py-3 px-4 rounded-lg border border-gray-100 shadow-md text-slate-900 focus:ring-2 focus:ring-indigo-400 outline-none"
                      placeholder="admin"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="font-medium">
                      <span className="text-zinc-800">Password</span>
                      <span className="text-red-600"> *</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full mt-2 py-3 px-4 rounded-lg border border-gray-100 shadow-md text-slate-900 focus:ring-2 focus:ring-indigo-400 outline-none"
                      placeholder="Enter admin password"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full text-white font-medium tracking-normal leading-none"
                >
                  <div className="w-full px-2.5 py-4 bg-indigo-500 rounded-3xl hover:bg-indigo-600 transition duration-300 flex items-center justify-center gap-2">
                    <FaShieldAlt className="w-5 h-5" />
                    {isLoading || isApiLoading
                      ? "Authenticating..."
                      : "Access Admin Panel"}
                  </div>
                </button>
              </form>

              <p className="mt-6 text-base text-center">
                <span className="text-zinc-800">Need help?</span>
                <Link to="/contact" className="text-indigo-500 ml-1">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg z-50"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp className="text-xl" />
      </motion.button>
    </>
  );
};

export default AdminLogin;
