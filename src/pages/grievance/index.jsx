"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import GrievanceHero from "./grievancehero";
import GrievanceSteps from "./grievancestep";
import GrievanceForm from "./grievanceform";
import FAQ from "./faqs";

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
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center relative overflow-hidden">
        <div className="text-center flex flex-col items-center relative space-y-3">
          <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-4 text-base sm:text-lg">
            <a
              href="/"
              className="text-black flex items-center hover:text-indigo-700 transition font-medium"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>
            <span className="text-gray-500">/</span>
            <div className="text-indigo-600 font-semibold flex items-center">
              <i className="fas fa-handshake mr-1"></i> Grievance
            </div>
          </div>

          {/* <svg
            className="absolute -right-6 sm:-right-10 -top-3 w-6 sm:w-8 h-6 sm:h-8 text-gray-400 opacity-60 animate-bounce"
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

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl">
            Share your concerns with us — we're here to listen and resolve them
            promptly.
          </p>
        </div>
      </nav>

      <GrievanceHero />
      <GrievanceSteps />
      <GrievanceForm />
      <FAQ />

      <motion.button
        className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 p-3 sm:p-4 bg-indigo-600 text-white rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
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
        <FaArrowUp className="text-lg sm:text-xl" />
      </motion.button>
    </>
  );
};

export default Index;
