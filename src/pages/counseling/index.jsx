import KeyFeaturesSection from "./KeyFeaturesSection";
import StatisticsSection from "./StatisticsSection";
import WhyTechEdSection from "./WhyTechEdSection";
import RegistrationForm from "./RegistrationForm";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

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
      <main className="flex overflow-hidden flex-col ">
        <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center space-x-3 relative overflow-hidden">
          <div className="text-center flex flex-col items-center relative">
            <div className="flex items-center space-x-3">
              <a
                href="/"
                className="text-black text-base sm:text-lg md:text-xl flex items-center hover:text-indigo-600 transition font-medium relative"
              >
                <i className="fas fa-home mr-1"></i> Home
              </a>

              <span className="text-gray-500">/</span>

              <div className="text-indigo-600 text-base sm:text-lg md:text-xl font-semibold flex items-center">
                <i className="fas fa-hands-helping mr-1"></i>
                Counselling
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
            <p className="text-gray-600 mt-2  text-sm sm:text-base md:text-lg ">
              Enhance Your Counseling Experience – Share Your Feedback!
            </p>
          </div>
        </nav>
        <RegistrationForm />
        <KeyFeaturesSection />
        <StatisticsSection />
        <WhyTechEdSection />
      </main>
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
    </>
  );
};

export default index;
