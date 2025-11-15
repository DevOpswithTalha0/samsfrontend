import React from "react";
import {
  FaClipboardCheck,
  FaSearch,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const GrievanceStep = () => {
  const steps = [
    {
      title: "Submit Your Grievance",
      description:
        "Fill out the online grievance form with all the necessary details. Ensure you provide accurate information to help us address your concern effectively.",
      icon: <FaClipboardCheck className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "Review & Acknowledge",
      description:
        "Our team will review your submission and acknowledge receipt within 24 hours. You’ll receive a unique tracking ID to monitor the status of your grievance.",
      icon: <FaSearch className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "Investigation & Follow-Up",
      description:
        "We’ll investigate your concern and may reach out for additional information or clarification. Our goal is to ensure a fair and thorough resolution.",
      icon: <FaHandshake className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "Resolution & Feedback",
      description:
        "Once your grievance is resolved, we’ll notify you of the outcome. We also welcome your feedback to improve our grievance redressal process.",
      icon: <FaCheckCircle className="w-8 h-8 md:w-10 md:h-10" />,
    },
  ];

  return (
    <motion.div className="w-full bg-indigo-200 bg-opacity-20 py-14 px-6 md:px-12 lg:px-20 mt-20 max-md:mt-10">
      <motion.div
        className="flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 tracking-wide">
          Steps to Submit a <span className="text-indigo-500">Grievance</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-4 text-center max-w-3xl tracking-wide leading-relaxed">
          Follow these simple steps to ensure your concerns are addressed
          efficiently.
        </p>

        <div className="flex flex-wrap gap-10 sm:gap-12 justify-center items-start mt-12 text-gray-800">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-[280px] sm:max-w-xs"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 text-green-500 p-3 bg-green-100 rounded-full shadow-md flex items-center justify-center text-3xl transition-transform hover:scale-110">
                {step.icon}
              </div>
              <h3 className="mt-4 text-xl sm:text-2xl font-semibold tracking-wide">
                {step.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600 tracking-wide">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/406d4092643b239d17fc144cf0554e7ff7d557844ac5c0a401bf3432e435fc3f?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
            alt="Grievance process illustration"
            className="object-contain max-w-[120px] sm:max-w-[150px] md:max-w-[180px] w-full h-auto"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GrievanceStep;
