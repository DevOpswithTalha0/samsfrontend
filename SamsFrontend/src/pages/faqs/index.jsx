import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaArrowUp, FaLock } from "react-icons/fa";
import {
  FaGraduationCap,
  FaUserPlus,
  FaComments,
  FaCalendarAlt,
} from "react-icons/fa";
import { FaQuestionCircle, FaUserShield, FaHeadset } from "react-icons/fa";
const policyQuestions = [
  {
    question: "What is SAMS?",
    answer:
      "SAMS (Student Affairs Management System) is a comprehensive platform designed to assist students with academic guidance, event management, grievance resolution, and counseling services.",
    icon: <FaGraduationCap className="text-6xl text-indigo-500" />,
  },
  {
    question: "How do I register on SAMS?",
    answer:
      "You can register by clicking on the SignUp button, filling in the required details, and verifying your email. Once verified, you can log in and access the system.",
    icon: <FaUserPlus className="text-6xl text-blue-500" />,
  },
  {
    question: "Is my personal information secure on SAMS?",
    answer:
      "Yes, we prioritize your data security. All personal information is encrypted and handled as per our Privacy Policy.",
    icon: <FaLock className="text-6xl text-green-500" />,
  },
  {
    question: "How can I submit a grievance or request counseling?",
    answer:
      "You can submit a grievance or request counseling through the respective sections in your dashboard. Our team ensures a prompt response to all submissions.",
    icon: <FaComments className="text-6xl text-orange-500" />,
  },
  {
    question: "Can I track upcoming university events through SAMS?",
    answer:
      "Yes, our Event Management module keeps students updated on all upcoming university events, including registrations and notifications.",
    icon: <FaCalendarAlt className="text-6xl text-purple-500" />,
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

      <div className="bg-white py-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-left">
            <motion.div
              className="md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-wide relative">
                Frequently Ask{" "}
                <span
                  style={{ fontFamily: "dancingScript" }}
                  className="text-indigo-500 text-5xl sm:text-6xl md:text-7xl relative inline-block"
                >
                  Questions
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
                At{" "}
                <span className="font-bold">
                  Student Affairs Management System (SAMS)
                </span>
                , we understand that users may have queries regarding our
                platform and its services. Our{" "}
                <span className="font-bold italic">FAQ section</span> provides{" "}
                <span className="italic">clear answers</span> to{" "}
                <span className="font-bold">common questions</span>, ensuring a{" "}
                <span className="italic">smooth</span> and{" "}
                <span className="italic">informed</span> user experience.
              </p>

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
                      <FaQuestionCircle className="text-lg" />
                    </div>
                    <span className="font-medium">General Inquiries</span>
                  </motion.li>

                  <motion.li
                    className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                      <FaUserShield className="text-lg" />
                    </div>
                    <span className="font-medium">
                      User Accounts & Security
                    </span>
                  </motion.li>

                  <motion.li
                    className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                      <FaHeadset className="text-lg" />
                    </div>
                    <span className="font-medium">Service Support</span>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center relative mt-12 md:mt-0"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="https://img.freepik.com/premium-vector/faq-frequently-asked-questions-website-blogger-helpdesk-clients-assistance-helpful-information-guides-background-vector-illustration_2175-1127.jpg?ga=GA1.1.152417848.1728201702&semt=ais_hybrid"
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
