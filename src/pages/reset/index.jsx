import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useScroll } from "framer-motion";

const ResetPassword = () => {
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

  return (
    <>
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center space-x-3 relative overflow-hidden">
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
              <i className="fas fa-key mr-1"></i>
              Reset Password
            </div>
          </div>
          {/* SVG Icon */}
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
            Reset your password to regain access to your account.
          </p>
        </div>
      </nav>

      <div className="flex overflow-hidden flex-col items-center px-20 pt-12 pb-24 bg-white max-md:px-5 max-md:pb-24">
        <div className="flex flex-col w-full max-w-[1338px] max-md:max-w-full">
          <div className="flex flex-wrap gap-2 items-start mt-15 min-h-[780px] max-md:mt-10 max-md:max-w-full">
            <div className="flex overflow-hidden flex-col grow shrink text-black min-w-[240px] w-[394px] max-md:max-w-full bg-gradient-to-br rounded-xl from-indigo-50 to-indigo-100">
              <div className="flex flex-col px-6 pt-10 pb-52 max-md:px-5 max-md:pb-24 max-md:max-w-full">
                <div className="flex flex-col items-center -mb-10 max-md:mb-2.5 max-md:max-w-full">
                  <div className="flex flex-col w-full max-w-[444px] max-md:max-w-full">
                    <div className="flex gap-1.5 justify-center items-center max-w-full text-3xl font-medium whitespace-nowrap bg-white leading-[58px] rounded-[30px] w-[210px]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1536c66e6fed3d4a64f40ba643ce3e371eff65a6766f420ef9ab0c0b96d81465?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
                        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
                        alt=""
                      />
                      <div className="self-stretch my-auto bg-white px-1 rounded-lg ">
                        Reset
                      </div>
                    </div>
                    <div className="flex flex-col justify-center mt-24 w-full max-md:mt-10">
                      <h2 className="text-4xl font-semibold leading-[58px] max-md:max-w-full">
                        Forgot Your Password? No Worries – We're Here to Help!
                      </h2>
                      <p className="mt-6 text-base leading-6 max-md:max-w-full">
                        Our secure password reset system ensures you regain
                        access to your account quickly and safely. Follow the
                        simple steps to reset your password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col grow shrink justify-center items-center min-h-[780px] min-w-[240px] w-[538px] max-md:max-w-full ">
              <div className="flex flex-col max-w-full w-[520px]">
                <div className="flex flex-col justify-center w-full text-center text-black max-md:max-w-full">
                  <h2 className="text-3xl font-semibold max-md:max-w-full">
                    Reset your password
                  </h2>
                  <p className="mt-3.5 text-base max-md:max-w-full">
                    Enter your registration number to receive a password reset
                    link.
                  </p>
                </div>
                <form className="flex flex-col justify-center mt-12 w-full text-base max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col w-full text-black max-md:max-w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                      <div className="flex flex-col w-full max-md:max-w-full">
                        <label
                          htmlFor="registrationNumber"
                          className="font-medium leading-none"
                        >
                          <span className="text-zinc-800">
                            Registration Number
                          </span>
                          <span className="text-red-600"> *</span>
                        </label>
                        <input
                          id="registrationNumber"
                          type="text"
                          className="flex items-center py-3 px-4 mt-2 w-full rounded-lg border border-gray-100 shadow-md tracking-wide text-slate-900 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:outline-none max-md:max-w-full"
                          placeholder="Enter your registration number"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div className="flex flex-col mt-6 w-full max-md:max-w-full">
                        <label
                          htmlFor="email"
                          className="font-medium leading-none"
                        >
                          <span className="text-zinc-800">Email Address</span>
                          <span className="text-red-600"> *</span>
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            className="flex items-center py-3 px-4 mt-2 w-full rounded-lg border border-gray-100 shadow-md tracking-wide text-slate-900 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:outline-none max-md:max-w-full"
                            placeholder="Enter your email address"
                            required
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex flex-col items-center mt-8 w-full font-medium tracking-normal leading-none text-white whitespace-nowrap max-md:max-w-full"
                  >
                    <div className="gap-2.5 self-stretch px-2.5 py-4 w-full bg-indigo-500 rounded-3xl min-h-[48px] hover:bg-indigo-600 hover:cursor-pointer transition duration-300">
                      Send Reset Link
                    </div>
                  </button>
                </form>
              </div>
              <p className="mt-5 text-base text-center text-black max-md:max-w-full">
                <span className="text-zinc-800">Remember your password?</span>
                <Link to="/login" className="text-indigo-500">
                  {" "}
                  Login
                </Link>
              </p>
              <p className="mt-5 text-base text-center text-black max-md:max-w-full">
                <span className="text-zinc-800">Don't have an account?</span>
                <Link to="/signup" className="text-indigo-500">
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
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

export default ResetPassword;
