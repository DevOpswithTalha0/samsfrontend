import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaPhoneAlt, FaHeadset } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { useScroll } from "framer-motion";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();
  const { user } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    registrationNumber: "",
    contactNumber: "",
    message: "",
  });

  // Auto-fill form with user data from Redux
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        // Only auto-fill if field is empty
        email: prev.email || user.email || "",
        registrationNumber:
          prev.registrationNumber || user.registrationNumber || "",
        contactNumber: prev.contactNumber || user.phoneNo || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call here if needed
  };
  const contactDetails = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/07dc6e2e47fe957a88e3bfd500579a8bebccd4726b14bfa0866d643c3360a59e?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7",
      title: "Address",
      content: [
        "Comsats University Rd, off GT Road, Sahiwal,",
        "Sahiwal District, Punjab 57000",
      ],
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/17956128ca78e1ff732fd07987a6c110b3ba8631333d5a6217d2ebdf31bc2fec?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7",
      title: "Phone",
      content: [
        <a href="tel:+92404305001">Tel: +92-040-4305001</a>,
        <a href="tel:+92404305002">Tel: +92-040-4305002</a>,
        <a href="tel:+92404305006">Fax: +92-040-4305006</a>,
      ],
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/17956128ca78e1ff732fd07987a6c110b3ba8631333d5a6217d2ebdf31bc2fec?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7",
      title: "Email",
      content: [
        <a href="mailto:sams@cuisahiwal.edu.pk">sams@cuisahiwal.edu.pk</a>,
        <a href="mailto:info@cuisahiwal.edu.pk">info@cuisahiwal.edu.pk</a>,
      ],
    },
  ];

  const formFields = [
    {
      label: "Email",
      placeholder: "Enter your university email",
      type: "email",
      name: "email",
    },
    {
      label: "Registration No.",
      placeholder: "Enter your registration number",
      type: "text",
      name: "registrationNumber",
    },
    {
      label: "Contact Number",
      placeholder: "Enter your phone number",
      type: "tel",
      name: "contactNumber",
    },
    {
      label: "Message",
      placeholder: "Describe your issue or query",
      type: "textarea",
      name: "message",
    },
  ];

  return (
    <>
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center space-x-3 relative overflow-hidden">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-black  text-base sm:text-lg md:text-xl  flex items-center hover:text-indigo-500 transition font-medium relative"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>

            <span className="text-gray-500">/</span>

            <div className="text-indigo-500  text-base sm:text-lg md:text-xl  font-semibold flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>
              Conatct us
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
          <p className="text-gray-600 mt-2  text-sm sm:text-base md:text-lg ">
            Reach out to us for support and inquiries.
          </p>
        </div>
      </nav>

      <div className="bg-white py-16 sm:py-20 md:py-24 lg:py-28 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text Section */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-wide">
                Get in{" "}
                <span
                  className="text-indigo-500 inline-block relative"
                  style={{ fontFamily: "dancingScript" }}
                >
                  Contact
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-4 text-indigo-500"
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

              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 tracking-wide">
                At{" "}
                <span className="font-semibold">
                  Student Affairs Management System (SAMS)
                </span>
                , we prioritize
                <span className="italic"> effective communication</span> to
                ensure students and faculty receive the best support. Whether
                you have inquiries about{" "}
                <span className="font-semibold">services</span>, need{" "}
                <span className="font-semibold">assistance</span>, or want to
                provide <span className="italic">feedback</span>, our team is
                here to help.
              </p>

              <motion.ul
                className="mt-8 space-y-4 text-gray-800 text-base sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
              >
                {[
                  { icon: <FaBolt />, text: "Quick Assistance" },
                  { icon: <FaPhoneAlt />, text: "Multiple Contact Channels" },
                  { icon: <FaHeadset />, text: "Dedicated Support Team" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-sm"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="bg-blue-500 p-2 rounded-full text-white mr-4 shadow-md">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/assets/images/contact/hero.png"
                alt="University Life Illustration"
                className="w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px] xl:w-[580px] object-contain h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex overflow-hidden flex-col items-center px-20  bg-white py-10 max-md:px-5 max-md:py-10"
      >
        <div className="relative max-w-xl mx-auto text-center">
          <div className="relative inline-block">
            <h2 className="text-5xl font-semibold text-stone-950 leading-tight relative max-md:text-4xl inline-block">
              Contact Us Form
            </h2>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79a19f34ea9b113f32177631b62dc593be1365b2030c0a47c69b740be25e4747?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
              alt="Decorative element"
              className="absolute top-[-10px] right-[-70px] h-[65px] w-[62px] object-contain"
            />
          </div>

          <div className="w-1/2 h-1 bg-yellow-500 mx-auto mt-1" />

          <p className="text-lg text-gray-900 text-center w-full mt-4">
            Have questions or need help? Our team is ready to assist you. Reach
            out today and let’s start the conversation.
          </p>
        </div>

        <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-10">
          <div className="w-full max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Contact Info Cards */}
              <div className="w-full lg:w-1/3">
                <div className="flex flex-col gap-5">
                  {contactDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center px-6 py-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-center shadow-sm"
                    >
                      {detail.icon && (
                        <img
                          src={detail.icon}
                          alt={`${detail.title} icon`}
                          className="w-10 h-10 object-contain"
                        />
                      )}
                      <div className="mt-3">
                        <p className="font-semibold text-zinc-800 text-base sm:text-lg">
                          {detail.title}
                        </p>
                        <div className="mt-2 text-sm sm:text-base text-gray-700">
                          {detail.content.map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                              <span>{line}</span>
                              {lineIndex < detail.content.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-2/3"
              >
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col px-6 py-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl shadow-md"
                >
                  <div className="mb-6 text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Send Us Message
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Need help? Fill out the form, and we'll get back to you
                      soon.
                    </p>
                  </div>

                  {formFields.map((field, index) => (
                    <div key={index} className="mb-4">
                      <label
                        htmlFor={`field-${index}`}
                        className="block mb-2 text-sm sm:text-base font-medium text-gray-800"
                      >
                        {field.label}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={`field-${index}`}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleFormChange}
                          placeholder={field.placeholder}
                          rows="4"
                          className="w-full px-5 py-4 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        ></textarea>
                      ) : (
                        <input
                          type={field.type}
                          id={`field-${index}`}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleFormChange}
                          placeholder={field.placeholder}
                          className="w-full px-5 py-4 text-sm sm:text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="mt-6 w-full sm:w-auto self-start px-10 py-3.5 text-sm sm:text-lg text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 transition duration-300"
                  >
                    Submit the message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          <div className="relative h-110 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.7280462261397!2d73.14653207625591!3d30.641621074628457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b6e4dde0c501%3A0xc37ea3d85326203!2sCOMSATS%20University%20Islamabad%20-%20Sahiwal%20Campus!5e0!3m2!1sen!2s!4v1740068496971!5m2!1sen!2s"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>

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

export default Index;
