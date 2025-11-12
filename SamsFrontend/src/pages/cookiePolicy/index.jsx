import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaArrowUp,
} from "react-icons/fa";
import {
  RiShieldKeyholeLine,
  RiLockPasswordLine,
  RiUserSharedLine,
  RiDatabase2Line,
  RiEyeCloseLine,
} from "react-icons/ri";

const policyQuestions = [
  {
    question: "What information do we collect?",
    answer: (
      <ul className="list-disc pl-5">
        <li>Personal details such as name, email, and contact information.</li>
        <li>University ID and academic records for verification.</li>
        <li>Usage data, including IP address and browser information.</li>
        <li>Cookies and analytics data to improve user experience.</li>
      </ul>
    ),
    icon: <RiShieldKeyholeLine className="text-6xl text-indigo-500" />,
  },
  {
    question: "How is my data protected?",
    answer: (
      <ul className="list-disc pl-5">
        <li>We use encryption to secure your data during transmission.</li>
        <li>Access to your data is restricted to authorized personnel only.</li>
        <li>
          Regular security audits ensure compliance with data protection laws.
        </li>
        <li>
          We employ firewalls and intrusion detection systems for added
          security.
        </li>
      </ul>
    ),
    icon: <RiLockPasswordLine className="text-6xl text-indigo-500" />,
  },
  {
    question: "Who has access to my personal information?",
    answer: (
      <ul className="list-disc pl-5">
        <li>Only authorized university staff and administrators.</li>
        <li>
          Third-party service providers under strict confidentiality agreements.
        </li>
        <li>No unauthorized individuals or external entities.</li>
        <li>Access is logged and monitored for accountability.</li>
      </ul>
    ),
    icon: <RiUserSharedLine className="text-6xl text-indigo-500" />,
  },
  {
    question: "How long is my data stored?",
    answer: (
      <ul className="list-disc pl-5">
        <li>Data is retained only for as long as necessary.</li>
        <li>Academic records may be stored for archival purposes.</li>
        <li>
          Personal data is deleted upon request or after a specified period.
        </li>
        <li>We follow legal requirements for data retention.</li>
      </ul>
    ),
    icon: <RiDatabase2Line className="text-6xl text-indigo-500" />,
  },
  {
    question: "Can I control how my data is used?",
    answer: (
      <ul className="list-disc pl-5">
        <li>Yes, you can request access to your data at any time.</li>
        <li>You have the right to update or correct your information.</li>
        <li>You can opt out of non-essential data collection.</li>
        <li>
          You may request deletion of your data, subject to legal obligations.
        </li>
      </ul>
    ),
    icon: <RiEyeCloseLine className="text-6xl text-indigo-500" />,
  },
];

// Accordion Component
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
          className="bg-gray-100 border border-gray-200 p-8 rounded-xl shadow-lg my-6 transition-all duration-100 transform  hover:shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-start">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
              {item.icon}
            </div>
            <div className="flex-1 w-full">
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600">
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
                  className="mt-6 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed"
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

// Main Page Component
function PrivacyPolicyPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  // Show/hide scroll-to-top button
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setShowScrollTop(latest > 300);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.main className="pb-12 md:pb-16 relative">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center space-x-3 relative overflow-hidden">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-black text-xl flex items-center hover:text-indigo-600 transition font-medium relative"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>
            <span className="text-gray-500">/</span>
            <div className="text-indigo-600 text-xl font-semibold flex items-center">
              <i className="fas fa-shield-alt mr-1"></i>
              Privacy Policy
            </div>
          </div>
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
            Learn how we protect your data and respect your privacy.
          </p>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 my-12 md:my-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-left">
            {/* Left Content */}
            <motion.div
              className="md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-wide relative">
                Your Privacy {""}
                <span
                  style={{ fontFamily: "dancingScript" }}
                  className="text-indigo-500 text-5xl sm:text-6xl md:text-7xl relative inline-block"
                >
                  Matters
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
              <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 tracking-wide">
                At [COMSATS University Islamabad, Sahiwal Campus], we are
                committed to protecting your privacy. Our Privacy Policy ensures
                that your personal information is handled securely and
                transparently. Learn more about how we safeguard your data and
                respect your rights.
              </p>
              <ul className="mt-6 space-y-3 text-gray-800 text-lg sm:text-xl md:text-2xl">
                <li className="flex items-center gap-3">
                  <FaLock className="w-6 h-6 text-indigo-500" />
                  Secure Data Handling
                </li>
                <li className="flex items-center gap-3">
                  <FaShieldAlt className="w-6 h-6 text-indigo-500" />
                  Transparent Policies
                </li>
                <li className="flex items-center gap-3">
                  <FaUserShield className="w-6 h-6 text-indigo-500" />
                  Your Rights Protected
                </li>
              </ul>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="md:w-1/2 flex justify-center relative mt-8 md:mt-0"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/38e2a73f8c562ade8daffb23b276d49ed2737b58d80150529bddef683883b4f6?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
                alt="Decorative star"
                className="w-10 lg:w-12 absolute -top-6 right-0"
              />
              <img
                src="https://img.freepik.com/free-vector/credit-score-flat-composition-with-doodle-man-chat-bubbles-envelope-with-credit-report-paper-document-vector-illustration_1284-83825.jpg"
                alt="Privacy Illustration"
                className="object-contain max-w-full w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="policyFAQ">
        <PolicyAccordion />
      </section>

      {/* Back to Home Button */}
      <div className="text-center my-10 container mx-auto px-4">
        <a
          href="/"
          className="text-center px-5 py-3 text-lg font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Back to Home <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>

      {/* Scroll to Top Button */}
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
    </motion.main>
  );
}

export default PrivacyPolicyPage;
