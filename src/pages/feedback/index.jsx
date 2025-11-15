import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useAddFeedbackMutation } from "../../redux/api/Feedback";
import { toast } from "react-hot-toast";

const inputFields = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    name: "name",
  },
  {
    label: "Registration Number",
    type: "text",
    placeholder: "Enter your registration no",
    required: true,
    name: "registrationNumber",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Enter your university email",
    required: true,
    name: "email",
  },
  {
    label: "Phone Number",
    type: "tel",
    placeholder: "Optional",
    name: "phone_number",
  },
  {
    label: "Feedback Type",
    type: "select",
    placeholder: "Grievance/Event/Counseling",
    required: true,
    name: "feedback_type",
  },
  {
    label: "Feedback Description",
    type: "textarea",
    placeholder: "Enter your feedback",
    required: true,
    name: "description",
  },
];

function InputField({
  label,
  type,
  placeholder,
  required,
  name,
  value,
  onChange,
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col mt-6 w-full max-md:max-w-full">
      {/* Label */}
      <label htmlFor={id} className="font-medium leading-none tracking-wide">
        <span className="text-slate-950">{label}</span>
        {required && <span className="text-red-600"> *</span>}
      </label>

      {/* Textarea */}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="flex items-center py-4 px-4 mt-2 w-full rounded-lg  border border-gray-100 shadow-md tracking-wide text-slate-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none max-md:max-w-full"
        />
      ) : (
        <div className="flex items-center py-3 px-4 mt-2 w-full rounded-lg border border-gray-100 shadow-md tracking-wide text-slate-900 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:outline-none max-md:max-w-full">
          {/* Select Field */}
          {type === "select" ? (
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              className="w-full bg-transparent focus:outline-none tracking-wide"
              aria-label={label}
            >
              <option value="">Select Feedback type</option>
              <option value="Grievance">Grievance</option>
              <option value="Event">Event</option>
              <option value="Counseling">Counseling</option>
            </select>
          ) : (
            // Input Field
            <input
              type={type}
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              className="w-full bg-transparent tracking-wide placeholder-gray-500 focus:outline-none"
              aria-label={label}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Button({ label, isLoading, disabled }) {
  return (
    <div className="flex flex-col items-center self-center mt-8 w-full text-base font-medium tracking-normal leading-none text-black max-w-[520px] max-md:max-w-full">
      <button
        type="submit"
        disabled={disabled}
        className="gap-2.5 self-stretch px-2.5 py-4 w-full bg-indigo-500 rounded-3xl min-h-[48px] text-white hover:bg-indigo-600 hover:cursor-pointer transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Submitting..." : label}
      </button>
    </div>
  );
}

function CheckboxField({ label }) {
  return (
    <div className="flex flex-wrap gap-2.5 items-start mt-8 w-full text-sm font-light tracking-normal max-md:max-w-full">
      <input
        type="checkbox"
        id="accurateInfo"
        className="shrink-0 w-5 h-5 rounded-full border border-solid border-zinc-950"
        required
      />
      <label
        htmlFor="accurateInfo"
        className="grow shrink w-[477px] max-md:max-w-full"
      >
        {label}
      </label>
    </div>
  );
}

function index() {
  const [addFeedback, { isLoading }] = useAddFeedbackMutation();
  const { user } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    phone_number: "",
    feedback_type: "",
    description: "",
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  // Auto-fill form with user data from Redux
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        // Only auto-fill if field is empty
        name: prev.name || user.fullName || "",
        registrationNumber:
          prev.registrationNumber || user.registrationNumber || "",
        email: prev.email || user.email || "",
        phone_number: prev.phone_number || user.phoneNo || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addFeedback(formData).unwrap();

      if (response.statusCode === 200) {
        toast.success("Feedback submitted successfully!");
        // Reset form but keep auto-filled values if user data exists
        if (user) {
          setFormData({
            name: user.fullName || "",
            registrationNumber: user.registrationNumber || "",
            email: user.email || "",
            phone_number: user.phoneNo || "",
            feedback_type: "",
            description: "",
          });
        } else {
          setFormData({
            name: "",
            registrationNumber: "",
            email: "",
            phone_number: "",
            feedback_type: "",
            description: "",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <>
      {/* ✅ Breadcrumb Navigation */}
      <nav className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-8 mt-20 px-4 flex justify-center items-center space-x-3 relative overflow-hidden">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-black  text-base sm:text-lg md:text-xl  flex items-center hover:text-indigo-600 transition font-medium relative tracking-wide"
            >
              <i className="fas fa-home mr-1"></i> Home
            </a>

            <span className="text-gray-500 tracking-normal">/</span>

            <div className="text-indigo-600  text-base sm:text-lg md:text-xl  font-semibold flex items-center tracking-wide">
              <i className="fas fa-comment-alt mr-1"></i>
              Feedback
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg tracking-wide">
            Help us enhance your experience by sharing your thoughts and
            suggestions.
          </p>
        </div>
      </nav>

      <div className="container flex overflow-hidden flex-col items-center justify-center px-4 md:px-16 pt-8 md:pt-16 pb-16 bg-white min-h-screen w-full max-w-[1400px] mx-auto">
        <div className="flex flex-wrap gap-2 items-start w-full max-w-[1338px] max-md:max-w-full">
          <div className="flex overflow-hidden flex-col grow shrink min-w-[240px] w-full md:w-[394px] max-md:max-w-full rounded-xl">
            <div className="flex flex-col items-start pt-10 pb-28 bg-gradient-to-br from-indigo-50 to-indigo-100 max-md:pb-24 max-md:max-w-full">
              <div className="flex z-10 flex-col items-center self-stretch text-black max-md:max-w-full">
                <div className="flex flex-col max-w-full w-[444px]">
                  <div className="flex gap-1.5 justify-center items-center max-w-full text-3xl font-medium whitespace-nowrap bg-white leading-[58px] rounded-[30px] w-[210px] tracking-wide">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6c7bb7ab9a2e51eccdd067226213e4de146641b8b053daeb38cf2acfa2d726c?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
                      className="object-contain shrink-0 self-stretch my-auto aspect-square w-[30px]"
                      alt=""
                    />
                    <div className="self-stretch my-auto tracking-wide">
                      Feedback
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mt-24 p-3 w-full max-md:mt-10">
                    <h1 className="text-4xl font-semibold leading-[58px] tracking-wider max-md:max-w-full">
                      Welcome to Student Affairs Management System – Your
                      Gateway to Convenient Student Services!
                    </h1>
                    <p className="mt-6 text-base leading-6 tracking-wide max-md:max-w-full">
                      At SAMS, we're here to make student life easier. Our
                      platform helps you report grievances, register for events,
                      and access counseling. Designed to keep things simple and
                      efficient, SAMS ensures you stay connected, supported, and
                      engaged throughout your academic journey.
                      <br />
                      <br />
                      Experience the next level of student convenience and
                      empowerment with SAMS. Your voice matters, and we are here
                      to listen, support, and enhance your student journey! 🎓✨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col grow shrink justify-center min-h-[1024px] min-w-[240px] w-full md:w-[538px] max-md:max-w-full">
            <div className="flex flex-col justify-center w-full text-center text-black max-md:max-w-full">
              <h2 className="text-3xl font-semibold tracking-wider max-md:max-w-full">
                Submit Your Feedback
              </h2>
              <p className="mt-3.5 text-base tracking-wide max-md:max-w-full">
                Help us improve our services!
              </p>
            </div>
            <div className="flex flex-col self-center max-w-full w-[520px] max-md:mt-10">
              <p className="mt-5 text-base text-center text-black max-md:max-w-full">
                <span className="text-zinc-800">Don't have an account?</span>
                <Link to="/login" className="text-indigo-500">
                  {" "}
                  Login
                </Link>
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center mt-5 w-full"
              >
                <div className="flex flex-col w-full text-black max-md:max-w-full">
                  <div className="flex flex-col w-full text-base h-[644px] tracking-wide max-md:max-w-full">
                    {inputFields.map((field, index) => (
                      <InputField
                        key={index}
                        {...field}
                        value={formData[field.name]}
                        onChange={handleFormChange}
                      />
                    ))}
                  </div>
                  <CheckboxField label="Please make sure your feedback is based on accurate information." />
                </div>
                <Button
                  label="Submit the Feedback"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
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
}

export default index;
