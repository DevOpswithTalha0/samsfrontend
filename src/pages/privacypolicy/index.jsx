import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
  FaEnvelope,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import { FaDatabase, FaLock, FaEye } from "react-icons/fa";
const policyQuestions = [
  {
    question: "Whom can I contact for privacy-related concerns?",
    answer:
      "For privacy-related queries, you can email our Privacy Support Team or visit the Help Center on the website.",
    icon: <FaEnvelope className="text-6xl text-indigo-500" />,
  },
  {
    question:
      "What should I do if I suspect unauthorized access to my account?",
    answer:
      "If you suspect any unauthorized access, immediately reset your password and contact SAMS Support for assistance.",
    icon: <FaExclamationTriangle className="text-6xl text-red-500" />,
  },
  {
    question: "How long does SAMS retain my data?",
    answer:
      "We retain your data as long as necessary to provide services, comply with university regulations, and fulfill legal requirements.",
    icon: <FaDatabase className="text-6xl text-indigo-500" />,
  },
  {
    question: "Is my data secure on SAMS?",
    answer:
      "Yes, SAMS follows strict security measures, including encryption, secure databases, and restricted access controls to protect your information from unauthorized access.",
    icon: <FaLock className="text-6xl text-green-500" />,
  },
  {
    question: "How is my personal data used?",
    answer:
      "Your data is used to provide student services, improve user experience, facilitate event management, address grievances, and ensure smooth university communication. We do not share or sell your data to third parties.",
    icon: <FaUsers className="text-6xl text-blue-500" />,
  },
];

function PolicyAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {policyQuestions.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={index}
          className="bg-gray-100 border border-gray-200 p-8 rounded-xl shadow-lg my-6 "
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-6">{item.icon}</div>
            <div className="flex-1 w-full">
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-600">
                  {item.question}
                </h3>
                <div className="ml-4">
                  {openIndex === index ? (
                    <FaChevronUp className="text-gray-800 text-xl" />
                  ) : (
                    <FaChevronDown className="text-gray-800 text-xl" />
                  )}
                </div>
              </div>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-6 text-gray-700 text-lg leading-relaxed"
                >
                  {item.answer}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PrivacyPolicyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setShowScrollTop(latest > 300);
    });
    return () => unsubscribe();
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
              className="text-black text-xl flex items-center hover:text-indigo-670 transition font-medium relative tracking-wide"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>

            <span className="text-gray-500 tracking-normal">/</span>

            <div className="text-indigo-500 text-xl font-semibold flex items-center tracking-wide">
              <i className="fas fa-info-circle mr-1"></i>
              Privacy Policy
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
          <p className="text-gray-600 mt-2 text-xl tracking-wide">
            Learn more about how SAMS protects your privacy and ensures the
            security of your data at COMSATS.
          </p>
        </div>
      </nav>

      {/* ✅ Hero Section (Top Section) */}
      <div className="bg-white py-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Section: Left Content, Right Image */}
          <div className="flex flex-col md:flex-row items-center justify-between text-left">
            {/* Left Content */}
            <motion.div
              className="md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-wide relative">
                Priavcy{" "}
                <span
                  style={{ fontFamily: "dancingScript" }}
                  className="text-indigo-500 text-5xl sm:text-6xl md:text-7xl relative inline-block"
                >
                  Policy
                  {/* Reverse U-Shaped Curly Underline SVG */}
                  <svg
                    className="absolute -bottom-4 left-0 w-full h-5 text-indigo-500"
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
              <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 tracking-wide">
                <span className="font-bold">SAMS</span> prioritizes{" "}
                <span className="italic">user privacy</span> and ensures that
                all collected data is handled{" "}
                <span className="font-bold">securely</span> and{" "}
                <span className="italic">transparently</span>. This policy
                outlines how we <span className="font-bold">collect</span>,{" "}
                <span className="font-bold">store</span>, and{" "}
                <span className="font-bold">use</span> personal information to{" "}
                <span className="italic">enhance the student experience</span>,
                while maintaining
                <span className="font-bold">strict security measures</span> to
                protect your data.
              </p>

              {/* Feature Points with Enhanced Styling */}
              <div className="mt-8">
                <motion.ul
                  className="space-y-4 text-gray-800 text-lg sm:text-xl"
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
                      <FaDatabase className="text-lg" />
                    </div>
                    <span className="font-medium">Data Collection & Usage</span>
                  </motion.li>

                  <motion.li
                    className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                      <FaLock className="text-lg" />
                    </div>
                    <span className="font-medium">
                      Secure & Confidential Handling
                    </span>
                  </motion.li>

                  <motion.li
                    className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                      <FaEye className="text-lg" />
                    </div>
                    <span className="font-medium">
                      User Control & Transparency
                    </span>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>

            {/* Right Image with Enhanced Styling */}
            <motion.div
              className="md:w-1/2 flex justify-center relative mt-12 md:mt-0"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/assets/images/privacy/hero.png"
                alt="University Life Illustration"
                className="object-contain max-w-full w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <section id="policyFAQ">
        <PolicyAccordion />
      </section>

      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg z-50"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-xl" />
      </motion.button>
    </>
  );
}

export default PrivacyPolicyPage;
