import React from "react";
import { motion } from "framer-motion";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";

function BlogCard({ title, description, imageUrl, date, location }) {
  return (
    <article className="flex flex-col bg-gray-100 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03] w-full max-w-md mx-auto max-sm:max-w-full">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-56 max-sm:h-48"
      />
      <div className="p-6 max-sm:p-4">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-900 max-sm:text-xl">
          <FaBookOpen className="text-indigo-600" /> {title}
        </h3>
        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex justify-between items-center text-gray-500 text-sm mt-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <span className="flex items-center gap-1">
            <FaRegCalendarAlt className="text-indigo-500" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-red-500" /> {location}
          </span>
        </div>
        <div className="mt-6 flex justify-center">
          <a
            href="#"
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
}

function NewsBlogs() {
  const blogPosts = [
    {
      title: "AI's Impact on Modern Tech",
      description:
        "How artificial intelligence is shaping industries worldwide.",
      imageUrl:
        "https://img.freepik.com/free-photo/artificial-intelligence-concept_23-2149075881.jpg",
      date: "March 5, 2025",
      location: "San Francisco, CA",
    },
    {
      title: "Cybersecurity Trends 2025",
      description:
        "Top strategies to protect digital assets in an evolving landscape.",
      imageUrl:
        "https://img.freepik.com/free-photo/hacker-cracking-binary-code-computer-screen_53876-102610.jpg",
      date: "March 8, 2025",
      location: "New York, NY",
    },
    {
      title: "Web 3.0 & The Future",
      description: "Decentralized web is transforming how we interact online.",
      imageUrl:
        "https://img.freepik.com/free-photo/blockchain-concept_23-2149239694.jpg",
      date: "March 12, 2025",
      location: "London, UK",
    },
    {
      title: "Sustainable Tech Innovations",
      description: "Exploring eco-friendly solutions in the tech world.",
      imageUrl:
        "https://img.freepik.com/free-photo/renewable-energy-concept_23-2149053842.jpg",
      date: "March 15, 2025",
      location: "Berlin, Germany",
    },
    {
      title: "Quantum Computing Breakthroughs",
      description: "The latest advances in quantum technology.",
      imageUrl:
        "https://img.freepik.com/free-photo/quantum-processor-microchip-close-up_23-2149096975.jpg",
      date: "March 20, 2025",
      location: "Tokyo, Japan",
    },
    {
      title: "The Rise of Remote Work Culture",
      description:
        "How companies are adapting to remote-first work environments.",
      imageUrl:
        "https://img.freepik.com/free-photo/remote-work-concept_23-2149164861.jpg",
      date: "March 25, 2025",
      location: "Sydney, Australia",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-6 py-20"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold text-gray-800 max-md:text-3xl">
          Latest <span className="text-indigo-600">News & Blogs</span>
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-md:text-base max-sm:text-sm">
          Stay updated with the latest industry trends, insights, and
          innovations.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-sm:mt-10">
        {blogPosts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </motion.section>
  );
}

export default NewsBlogs;
