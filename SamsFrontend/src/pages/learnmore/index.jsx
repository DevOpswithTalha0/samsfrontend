import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
const Index = () => {
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
              Learn More
            </div>
          </div>
          {/* SVG Icon */}
          <svg
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
          </svg>
          <p className="text-gray-600 mt-2 text-xl">
            Discover the features and purpose of the SAMS - Student Affairs
            Management System.
          </p>
        </div>
      </nav>

      {/* Learn More Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">
            Welcome to SAMS (Student Affairs Management System)
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SAMS is an integrated platform designed to streamline student
                affairs management in universities. It helps students, staff,
                and faculty to manage and track various academic,
                administrative, and personal activities. Developed for COMSATS
                University Islamabad, Sahiwal Campus, SAMS aims to enhance
                student engagement and improve operational efficiency across
                various departments.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Key Features
              </h2>
              <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
                <li>Student Registration & Profile Management</li>
                <li>Course Enrollment and Academic Tracking</li>
                <li>Student Support Services Integration</li>
                <li>Fee Management System</li>
                <li>Real-time Notifications and Alerts</li>
                <li>Event and Activity Management</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Purpose and Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The main goal of SAMS is to create an easy-to-use platform for
                managing all student affairs in one place. It helps students
                stay updated on their academic progress, manage their personal
                and administrative tasks, and ensures they have a smooth
                experience throughout their time at university. With SAMS,
                COMSATS University aims to modernize the student management
                process while improving communication and overall student
                engagement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Benefits for Students and Faculty
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SAMS provides significant benefits to both students and faculty
                by offering a unified platform for accessing all necessary
                information, managing academic progress, registering for
                courses, and participating in events. Faculty members can use
                SAMS to track students' performance, send notifications, and
                manage their courses effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

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

export default Index;
