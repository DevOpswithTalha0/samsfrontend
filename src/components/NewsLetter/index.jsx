import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-800 flex flex-wrap items-center justify-center gap-2">
          <span>Stay</span>
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Connected
            <svg
              className="absolute -right-4 -top-3 w-6 sm:w-7 md:w-8 h-auto text-indigo-300 opacity-60 animate-bounce"
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
          </span>
          <span>With Us</span>
        </h2>

        <p className="mb-4 text-base sm:text-base lg:text-xl leading-relaxed text-stone-600">
          Manage grievances, events, and counseling in one place. Stay informed,
          stay ahead!
        </p>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          Join 10,000+ students using SAMS for a better university experience.
        </p>
      </motion.div>

      <svg
        className="absolute bottom-0 left-0 w-32 sm:w-40 lg:w-48 text-indigo-200 opacity-40 animate-spin-slow"
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

      <svg
        className="absolute top-0 right-0 w-24 sm:w-28 lg:w-32 text-purple-200 opacity-40 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8h16M4 16h16"
        />
      </svg>
    </div>
  );
};

export default Newsletter;
