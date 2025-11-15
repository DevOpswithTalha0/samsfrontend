import React from "react";
import { FaEdit, FaBell, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const GrievanceHero = () => {
  return (
    <div className="bg-white py-10 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-left gap-10">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-wide relative">
              Raise the{" "}
              <span
                style={{ fontFamily: "dancingScript" }}
                className="text-indigo-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl relative inline-block"
              >
                Grievance
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4 md:h-5 text-indigo-500"
                  viewBox="0 0 200 30"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,15 C50,0 150,0 200,15"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 tracking-wide">
              The Grievance Management System in SAMS provides students with a
              structured and efficient platform to report and resolve their
              concerns. Whether the issue is related to academics,
              administration, or personal matters, this system ensures fairness,
              transparency, and timely resolution.
            </p>

            <div className="mt-8">
              <motion.ul
                className="space-y-4 text-gray-800 text-base sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
              >
                <motion.li
                  className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                    <FaEdit className="text-lg" />
                  </div>
                  <span className="font-medium">Easy Complaint Submission</span>
                </motion.li>

                <motion.li
                  className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                    <FaBell className="text-lg" />
                  </div>
                  <span className="font-medium">Real-Time Status Updates</span>
                </motion.li>

                <motion.li
                  className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                    <FaCheckCircle className="text-lg" />
                  </div>
                  <span className="font-medium">
                    Efficient Issue Resolution
                  </span>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/assets/images/grievance/hero.png"
              alt="University Life Illustration"
              className="object-contain max-w-[80%] sm:max-w-[90%] md:max-w-[100%] lg:max-w-[90%] xl:max-w-[80%] h-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceHero;
