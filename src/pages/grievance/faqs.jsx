import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col mb-5 sm:mb-6"
    >
      <button
        className={`flex justify-between items-center px-6 py-4 sm:px-8 sm:py-5 bg-white rounded-2xl border border-indigo-500 transition-all duration-200 hover:bg-indigo-50 w-full md:px-12 md:py-6 lg:px-16 lg:py-8 ${
          isOpen ? "bg-indigo-50" : ""
        }`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-left">
          {question}
        </span>
        <span className="text-xl sm:text-2xl transition-transform duration-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600">
          {isOpen ? <FiMinus className="text-indigo-500" /> : <FiPlus />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 py-3 mt-2 sm:px-8 sm:py-4 md:px-12 md:py-5 lg:px-16 lg:py-6 bg-white rounded-2xl">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-700">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "How do I submit a grievance?",
      answer:
        "Submitting a grievance is simple! Visit our grievance portal, fill out the online form with details of your concern, and submit it. You’ll receive a confirmation email with a unique tracking ID to monitor the status of your grievance.",
    },
    {
      question: "How long does it take to resolve a grievance?",
      answer:
        "We aim to resolve grievances as quickly as possible. Most issues are addressed within 5-7 business days. However, complex cases may take longer, and we’ll keep you updated throughout the process.",
    },
    {
      question: "Is my grievance submission confidential?",
      answer:
        "Absolutely. Your privacy is our priority. All grievance submissions are handled with strict confidentiality, and only authorized personnel have access to your information.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col pt-8 mt-10 w-full text-gray-700 bg-indigo-200 bg-opacity-20 max-md:mt-8 max-md:max-w-full"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          className="absolute top-0 left-0 w-full h-auto text-indigo-300"
        >
          <path
            fill="currentColor"
            fillOpacity="0.15"
            d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,0L0,0Z"
          />
        </svg>
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full h-auto text-indigo-300"
        >
          <path
            fill="currentColor"
            fillOpacity="0.2"
            d="M0,256L80,234.7C160,213,320,171,480,181.3C640,192,800,256,960,282.7C1120,309,1280,299,1360,293.3L1440,288L1440,320L0,320Z"
          />
        </svg>
      </div>

      <h2 className="relative z-10 self-center py-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center">
        <span className="text-gray-800">Frequently Asked</span>{" "}
        <span className="text-indigo-600">Questions</span>
      </h2>

      <div className="relative z-10 flex flex-col px-4 pb-10 mt-10 w-full max-w-5xl mx-auto sm:px-6 md:px-10 md:mt-12">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={index === openIndex}
            toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FAQs;
