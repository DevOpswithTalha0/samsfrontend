import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Newsletter from "../NewsLetter/index";

const Footer = () => {
  const links = [
    {
      title: "Useful Links",
      items: [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Grievance", url: "/grievance" },
        { name: "Events", url: "/events" },
      ],
    },
    {
      title: "Terms and Policy",
      items: [
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Cookie Policy", url: "/cookie-policy" },
        { name: "Terms and Conditions", url: "/terms" },
        { name: "FAQs", url: "/faqs" },
      ],
    },
  ];

  const socialIcons = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://facebook.com/sams",
      color: "hover:text-[#1877F2]",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://instagram.com/sams",
      color: "hover:text-[#E4405F]",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/sams",
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://linkedin.com/company/sams",
      color: "hover:text-[#0A66C2]",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white font-poppins">
      <Newsletter />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {/* Company Info Section */}
        <div>
          <Link to="/">
            <h1
              className="text-indigo-500 text-4xl"
              style={{ fontFamily: "dancingScript" }}
            >
              SAMS
            </h1>
          </Link>
          <p className="text-gray-400 mt-3 leading-relaxed text-base">
            Enhancing student experience through efficient management of
            grievances, events, and counseling services.
          </p>
          <div className="flex flex-col gap-2 mt-4 text-gray-400">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-500" />
              <span className="text-sm">COMSATS University, Sahiwal</span>
            </p>

            <a
              href="tel:+921234567890"
              className="flex items-center gap-2 hover:text-indigo-600 hover:cursor-pointer transition duration-300 text-sm"
            >
              <FaPhone className="text-indigo-500" />
              +92 123 456 7890
            </a>

            <a
              href="mailto:contact@comsats.edu.pk"
              className="flex items-center gap-2 hover:text-indigo-600 hover:cursor-pointer transition duration-300 text-sm"
            >
              <FaEnvelope className="text-indigo-500" />
              contact@comsats.edu.pk
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8">
          {links.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-3">
                {section.title}
              </h3>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.url}
                  className="block text-gray-400 hover:text-indigo-600 hover:cursor-pointer transition duration-300 mb-2 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 text-2xl p-3 rounded-full transition-all duration-200 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
        <p>
          Copyright © {new Date().getFullYear()}, All Rights Reserved by{" "}
          <span style={{ fontFamily: "dancingScript" }}>SAMS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
