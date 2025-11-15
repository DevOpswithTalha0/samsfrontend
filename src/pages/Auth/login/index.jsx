import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useLoginMutation } from "../../../redux/api/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/User";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    registrationNumber: "",
    password: "",
  });

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

    if (id === "registrationNumber") {
      let formatted = value.replace(/[^a-zA-Z0-9]/g, "");
      if (formatted.length > 4)
        formatted = formatted.slice(0, 4) + "-" + formatted.slice(4);
      if (formatted.length > 8)
        formatted = formatted.slice(0, 8) + "-" + formatted.slice(8);
      formatted = formatted.slice(0, 12);
      setFormData((prev) => ({
        ...prev,
        [id]: formatted.toUpperCase(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();
      if (response.statusCode === 420) {
        navigate("/verify-email");
      } else if (response.statusCode === 200) {
        const { user, accessToken } = response.data;
        dispatch(setUser({ user, token: accessToken }));
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-black text-xl flex items-center hover:text-indigo-700 font-medium"
            >
              <i className="fas fa-home mr-1" />
              Home
            </a>
            <span className="text-gray-500">/</span>
            <div className="text-indigo-500 text-xl font-semibold flex items-center">
              <i className="fas fa-sign-in-alt mr-1" />
              Login
            </div>
          </div>
          {/* <svg
            className="absolute -right-10 -top-4 w-8 h-8 text-gray-400 opacity-60 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg> */}
          <p className="text-gray-600 mt-2 text-xl text-center max-w-lg">
            Access your account to view your profile and continue your journey
            with us.
          </p>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pt-12 pb-24 bg-white">
        <div className="flex w-full max-w-7xl flex-col lg:flex-row gap-10">
          <div className="hidden lg:flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100 p-12 rounded-xl w-full max-w-lg">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2 bg-white text-3xl font-medium  rounded-[30px] px-5 py-3">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1536c66e6fed3d4a64f40ba643ce3e371eff65a6766f420ef9ab0c0b96d81465?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
                  className="w-8 h-8"
                  alt=""
                />
                <span>Login</span>
              </div>
              <div className="mt-20 text-center text-black px-4">
                <h2 className="text-3xl font-semibold leading-tight">
                  Welcome to Student Affairs Management System
                </h2>
                <p className="mt-6 text-base">
                  We empower students by offering a user-friendly platform to
                  report grievances, register for events, and request counseling
                  sessions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div className="w-full max-w-md text-black">
              <div className="text-center">
                <h2 className="text-3xl font-semibold">Welcome back!</h2>
                <p className="mt-3.5 text-base">
                  Please login to access your account.
                </p>
              </div>
              <form
                className="flex flex-col justify-center mt-12 text-base w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="registrationNumber" className="font-medium">
                      <span className="text-zinc-800">Registration Number</span>
                      <span className="text-red-600"> *</span>
                      <span className="text-gray-500 text-sm ml-1">
                        (e.g. AA00-BBB-000)
                      </span>
                    </label>
                    <input
                      id="registrationNumber"
                      type="text"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className="w-full mt-2 py-3 px-4 rounded-lg border border-gray-100 shadow-md text-slate-900 focus:ring-2 focus:ring-indigo-400 outline-none"
                      placeholder="Enter your registration number"
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
                      placeholder="Enter password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full text-white font-medium tracking-normal leading-none"
                >
                  <div className="w-full px-2.5 py-4 bg-indigo-500 rounded-3xl hover:bg-indigo-600 transition duration-300">
                    {isLoading ? "Loading..." : "Login"}
                  </div>
                </button>

                {/* Admin Login Link - More Visible */}
                <div className="mt-6 text-center">
                  <Link
                    to="/admin/login"
                    className="text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 border-b border-dotted border-gray-300 hover:border-indigo-400"
                    title="Administrator Login"
                  >
                    Admin Access
                  </Link>
                </div>
              </form>

              <p className="mt-5 text-base text-center">
                <span className="text-zinc-800">
                  Don't have an account yet?
                </span>
                <Link to="/signup" className="text-indigo-500">
                  {" "}
                  Sign up
                </Link>
              </p>
              <p className="mt-5 text-base text-center">
                <span className="text-zinc-800">Forgot Password?</span>
                <Link to="/reset-password" className="text-indigo-500">
                  {" "}
                  Reset Now
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

export default Index;
