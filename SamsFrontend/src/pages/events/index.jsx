"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

import AboutSection from "./AboutSection.jsx";

import RegistrationForm from "./RegistrationForm.jsx";
import GallerySection from "./GallerySection.jsx";

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
    <main className="flex overflow-hidden flex-col bg-white">
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center relative overflow-hidden">
        <div className="text-center flex flex-col items-center w-full max-w-5xl mx-auto px-2 sm:px-4">
          <div className="flex flex-row items-center space-x-2 sm:space-x-3">
            <a
              href="/"
              className="text-black text-base sm:text-lg md:text-xl flex items-center hover:text-indigo-600 transition font-medium tracking-wide"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>

            <span className="text-gray-500 tracking-normal">/</span>

            <div className="text-indigo-500 text-base sm:text-lg md:text-xl font-semibold flex items-center tracking-wide">
              <i className="fas fa-calendar-alt mr-1"></i>
              Events
            </div>
          </div>

          {/* <svg
            className="absolute -right-5 top-2 w-6 h-6 text-gray-400 opacity-60 animate-bounce sm:w-7 sm:h-7 md:w-8 md:h-8 md:-right-10 md:-top-4"
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

          <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg tracking-wide px-2 text-center">
            Discover and register for upcoming student events and activities
            hosted by SAMS.
          </p>
        </div>
      </nav>

      <AboutSection />
      <RegistrationForm />
      <GallerySection />

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
    </main>
  );
};

export default Index;
