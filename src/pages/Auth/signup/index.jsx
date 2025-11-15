import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useRegisterMutation } from "../../../redux/api/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/User";
import { toast } from "react-toastify";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
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
      const rawValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      let formatted = rawValue;

      if (rawValue.length > 4 && rawValue.length <= 7) {
        formatted = `${rawValue.slice(0, 4)}-${rawValue.slice(4)}`;
      } else if (rawValue.length > 7) {
        formatted = `${rawValue.slice(0, 4)}-${rawValue.slice(
          4,
          7
        )}-${rawValue.slice(7, 10)}`;
      }

      setFormData((prev) => ({
        ...prev,
        registrationNumber: formatted,
        email:
          formatted.length === 12
            ? `${formatted}@STUDENTS.CUISAHIWAL.EDU.PK`
            : "",
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData).unwrap();
      if (response.statusCode === 200) {
        dispatch(setUser(response.data));
        navigate("/verify-email");
      }
    } catch (err) {
      console.error("Registration failed!");
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-2 flex justify-center items-center space-x-3 relative overflow-hidden">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-black text-xl flex items-center hover:text-indigo-700 transition font-medium relative"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>
            <span className="text-gray-500">/</span>
            <div className="text-indigo-500 text-xl font-semibold flex items-center">
              <i className="fas fa-user-plus mr-1"></i> Sign Up
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
          <p className="text-gray-600 mt-2 text-xl">
            Create your account and start exploring our services today.
          </p>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pt-12 pb-24 bg-white">
        <div className="flex flex-col w-full max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-between min-h-[780px]">
            <div className="hidden md:flex flex-col grow-0 shrink-0 text-black w-[550px]  bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
              <div className="flex flex-col px-6 pt-10 pb-20">
                <div className="flex flex-col items-center">
                  <div className="flex flex-col w-full max-w-[400px]">
                    <div className="flex gap-1.5 justify-center items-center text-3xl font-medium bg-white leading-[58px]  rounded-[30px] w-[190px]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1536c66e6fed3d4a64f40ba643ce3e371eff65a6766f420ef9ab0c0b96d81465"
                        className="object-contain aspect-square w-[30px]"
                        alt=""
                      />
                      <div className="bg-white px-1 rounded-lg">Sign Up</div>
                    </div>
                    <div className="flex flex-col justify-center mt-16 w-full">
                      <h2 className="text-2xl md:text-4xl font-semibold leading-[48px]">
                        Join the Student Affairs Management System – Simplifying
                        Student Services
                      </h2>
                      <p className="mt-6 text-base md:text-lg leading-6">
                        Creating a SAMS account gives you full access to
                        essential student services,
                        <br />
                        all in one convenient platform. With your account, you
                        can:
                        <br />
                        - Report Grievances
                        <br />
                        - Register for Events
                        <br />
                        - Request Counseling Sessions.
                        <br /> <br />
                        By signing up, you unlock a smarter, faster, and more
                        organized way to engage
                        <br />
                        with student life. SAMS helps you stay connected,
                        supported, and informed.
                        <br />
                        <br />
                        Your campus. Your voice. Your space—digitally organized
                        with SAMS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full md:w-[500px] mx-auto">
              <div className="flex flex-col w-full max-w-[600px]">
                <div className="flex flex-col text-center text-black">
                  <h2 className="text-3xl font-semibold">
                    Create Your Account
                  </h2>
                  <p className="mt-3.5 text-base">
                    Sign up to get started with our platform.
                  </p>
                </div>

                <form
                  className="flex flex-col mt-12 text-base"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="fullName" className="font-medium">
                    Full Name<span className="text-red-600"> *</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                  />

                  <label
                    htmlFor="registrationNumber"
                    className="font-medium mt-6"
                  >
                    Registration Number<span className="text-red-600"> *</span>
                    <span className="text-gray-500 text-sm ml-1">
                      (e.g. AA00-BBB-000)
                    </span>
                  </label>
                  <input
                    id="registrationNumber"
                    type="text"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your registration number"
                  />

                  <label htmlFor="email" className="font-medium mt-6">
                    Email<span className="text-red-600"> *</span>
                    <span className="text-gray-500 text-sm ml-1">
                      (Auto-generated)
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    className="form-input cursor-not-allowed"
                    disabled
                  />

                  <label htmlFor="phoneNo" className="font-medium mt-6">
                    Phone Number<span className="text-red-600"> *</span>
                    <span className="text-gray-500 text-sm ml-1">
                      (e.g. 923001234567)
                    </span>
                  </label>
                  <input
                    id="phoneNo"
                    type="tel"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />

                  <label htmlFor="password" className="font-medium mt-6">
                    Password<span className="text-red-600"> *</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your password"
                  />

                  <label htmlFor="confirmPassword" className="font-medium mt-6">
                    Confirm Password<span className="text-red-600"> *</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Confirm your password"
                  />

                  <button
                    type="submit"
                    className="submit-btn mt-8"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </button>
                </form>

                <p className="mt-5 text-base text-center text-black">
                  Already have an account?
                  <Link to="/login" className="text-indigo-500 ml-1">
                    Login
                  </Link>
                </p>
              </div>
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
