"use client";
import { useState, useEffect } from "react";
import FeatureSection from "./featuresection";
import FaqSection from "./faqsection";
import NewsLetter from "./newsletter";
import Statistics from "./statssection";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { FaArrowUp, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  const sliderImages = [
    "/assets/images/home/bg1.jpg",
    "/assets/images/home/bg2.jpg",
    "/assets/images/home/bg3.jpg",
    "/assets/images/home/bg4.jpg",
    "/assets/images/home/bg5.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="overflow-hidden">
      <section className="relative">
        <div className="relative w-full h-screen overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={sliderImages[currentSlide]}
                alt={`University campus slide ${currentSlide + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black opacity-70"></div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-300 px-4 sm:px-6 z-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-7xl w-full"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 tracking-wide">
                Welcome to{" "}
                <span
                  className="text-indigo-500"
                  style={{ fontFamily: "dancingScript" }}
                >
                  SAMS
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-6 tracking-wide">
                Student Affairs Management System
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-8 tracking-wide">
                Discover excellence in education and research at our
                institution. We provide world-class learning opportunities to
                prepare you for a successful future.
              </p>

              <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
                <Link
                  to="/learn-more"
                  className="bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-full text-base sm:text-lg md:text-xl flex items-center gap-2"
                >
                  Learn More <FaArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gray-300 scale-125"
                    : "bg-gray-300 bg-opacity-40 hover:bg-opacity-60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <Statistics />
      <NewsLetter />
      <FaqSection />

      <motion.button
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg z-50"
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
}

export default Home;
