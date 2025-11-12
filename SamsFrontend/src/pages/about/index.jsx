"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaUsers, FaHandsHelping } from "react-icons/fa";
import { FaClipboardList, FaBell, FaCheckCircle } from "react-icons/fa";
import { FaCalendarAlt, FaChartLine, FaStar } from "react-icons/fa";
import { FaCalendarCheck, FaClock, FaBullhorn } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const featureImages = [
  "https://www.gstatic.com/webp/gallery/2.jpg",
  "https://www.gstatic.com/webp/gallery3/2.png",
  "https://www.gstatic.com/webp/gallery/4.jpg",
];

const keyFeatures = [
  {
    title: "Grievance Management",
    description: [
      {
        icon: <FaClipboardList />,
        text: "Submit grievances and track progress.",
      },
      { icon: <FaBell />, text: "Receive real-time notifications." },
      { icon: <FaCheckCircle />, text: "Ensure transparency in resolutions." },
    ],
    imageUrl: featureImages[0],
  },
  {
    title: "Career Counseling",
    description: [
      {
        icon: <FaCalendarAlt />,
        text: "Book counseling sessions for guidance.",
      },
      { icon: <FaChartLine />, text: "Track session history & expert advice." },
      { icon: <FaStar />, text: "Provide feedback to improve services." },
    ],
    imageUrl: featureImages[1],
  },
  {
    title: "Event Management",
    description: [
      {
        icon: <FaCalendarCheck />,
        text: "Discover & register for university events.",
      },
      { icon: <FaClock />, text: "Get automated reminders for events." },
      { icon: <FaBullhorn />, text: "Stay updated with announcements." },
    ],
    imageUrl: featureImages[2],
  },
];

const teamMembers = [
  {
    name: "John Doe",
    designation: "Project Manager",
    email: "john.doe@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    designation: "Lead Developer",
    email: "jane.smith@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Alex Johnson",
    designation: "UI/UX Designer",
    email: "alex.johnson@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "John Doe",
    designation: "Project Manager",
    email: "john.doe@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    designation: "Lead Developer",
    email: "jane.smith@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Alex Johnson",
    designation: "UI/UX Designer",
    email: "alex.johnson@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const index = () => {
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
              <i className="fas fa-info-circle mr-1"></i>
              About
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
            Learn more about SAMS and how we enhance the student experience at
            COMSATS.
          </p>
        </div>
      </nav>

      <div className="bg-white py-16 sm:py-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <motion.div
              className="w-full md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-wide text-center md:text-left">
                About the{" "}
                <span
                  style={{ fontFamily: "dancingScript" }}
                  className="text-indigo-500 text-4xl sm:text-5xl md:text-6xl relative inline-block"
                >
                  SAMS
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

              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 tracking-wide text-center md:text-left">
                Welcome to the Student Affairs Management System—a unified
                platform dedicated to enhancing student life through efficient
                grievance resolution, smooth event management, and accessible
                counseling services.
              </p>

              <div className="mt-8">
                <motion.ul
                  className="space-y-4 text-gray-800 text-base sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
                >
                  {[
                    {
                      icon: <FaUniversity className="text-lg" />,
                      label: "Effortless Grievance Handling",
                      delay: 0,
                    },
                    {
                      icon: <FaUsers className="text-lg" />,
                      label: "Smart Event Management",
                      delay: 0.2,
                    },
                    {
                      icon: <FaHandsHelping className="text-lg" />,
                      label: "Counseling & Student Support",
                      delay: 0.4,
                    },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                    >
                      <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="https://img.freepik.com/premium-vector/website-creator-concept-illustration_86047-363.jpg"
                alt="University Life Illustration"
                className="object-contain w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-12 tracking-wide">
            ✨ Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-600 mb-4 tracking-wide">
                  {feature.title}
                </h3>
                <ul className="space-y-3 text-sm sm:text-base md:text-lg text-gray-700 tracking-normal text-left w-full">
                  {feature.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3 text-xl sm:text-2xl text-indigo-500">
                        {desc.icon}
                      </span>
                      <span>{desc.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-wide">
            🎯 Our Mission
          </h2>
          <p className="text-base sm:text-lg md:text-2xl leading-relaxed tracking-normal sm:tracking-wide">
            "To simplify student support by providing a seamless platform for
            grievances, event management, and career counseling, ensuring an
            engaging and supportive university environment."
          </p>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-800 tracking-wide">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-indigo-500 mb-6 object-cover"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-lg sm:text-xl text-gray-500 tracking-wide">
                  {member.designation}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-2 text-indigo-600 text-base sm:text-lg md:text-xl tracking-wide break-words"
                >
                  {member.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

export default index;
