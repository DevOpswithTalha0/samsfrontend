import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaMinus,
  FaQuestionCircle,
  FaPhoneAlt,
  FaLightbulb,
  FaHandsHelping,
  FaRegSmile,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";

function FaqItem({ question, answer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto transition-all duration-300">
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-lg md:text-xl font-semibold bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 transition-all mb-1.5"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        {question}
        {isExpanded ? (
          <FaMinus className="w-5 h-5 text-indigo-600" />
        ) : (
          <FaPlus className="w-5 h-5 text-indigo-600" />
        )}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-60 opacity-100 p-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700 text-md bg-gray-50 rounded-lg p-4 shadow-inner">
          {answer}
        </p>
      </div>
    </div>
  );
}

function FaqSection() {
  const faqs = [
    {
      id: 1,
      question: "🔍 What is career counseling?",
      answer:
        "Career counseling helps students explore their interests and skills to choose the right academic and professional path.",
    },
    {
      id: 2,
      question: "📩 How do I submit a grievance?",
      answer:
        "Log in to your student portal, navigate to 'Support', and fill out the grievance form. Our team will respond promptly!",
    },
    {
      id: 3,
      question: "🎟️ How do I register for an event?",
      answer:
        "Go to the 'Events' section, select an event, and click 'Register'. You’ll receive a confirmation email upon successful registration.",
    },
    {
      id: 4,
      question: "🛠️ What tech support services are available?",
      answer:
        "We provide 24/7 tech support for all platform-related issues. Contact us via email or chat support.",
    },
    {
      id: 5,
      question: "📚 Can I access study materials online?",
      answer:
        "Yes, study materials are available in the 'Resources' section of your student dashboard.",
    },
  ];

  return (
    <div className="bg-gray-100">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-20"
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="lg:w-1/2 flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center gap-3">
              <FaQuestionCircle className="text-indigo-600" /> Frequently Asked
              Questions
            </h2>
            <p className="text-lg text-gray-600 max-sm:text-base">
              Find answers to common queries about our student services, events,
              and support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700 text-lg max-sm:text-base">
              <p className="flex items-center gap-3">
                <FaLightbulb className="text-yellow-500" /> Quick solutions to
                your concerns.
              </p>
              <p className="flex items-center gap-3">
                <FaHandsHelping className="text-green-500" /> Need help? We're
                here for you!
              </p>
              <p className="flex items-center gap-3">
                <FaRegSmile className="text-pink-500" /> Student success is our
                priority.
              </p>
              <p className="flex items-center gap-3">
                <FaInfoCircle className="text-blue-500" /> Guidance for academic
                excellence.
              </p>
              <p className="flex items-center gap-3">
                <FaShieldAlt className="text-red-500" /> Secure and confidential
                support.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}

            <div className="mt-10 text-center">
              <h3 className="text-3xl font-semibold flex items-center justify-center gap-3 max-sm:text-2xl">
                <FaQuestionCircle className="text-blue-500" /> Still Need Help?
              </h3>
              <button className="mt-6 px-8 py-4 bg-indigo-600 text-white font-medium text-lg md:text-xl rounded-lg shadow-lg hover:bg-indigo-700 flex items-center gap-3 mx-auto transition-all max-sm:text-base max-sm:px-6 max-sm:py-3">
                <FaPhoneAlt /> Contact Support
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default FaqSection;
