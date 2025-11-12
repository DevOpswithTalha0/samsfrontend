import { motion } from "framer-motion";
import {
  HiOutlineSpeakerphone,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

function FeatureSection() {
  const features = [
    {
      id: 1,
      title: "Grievance Submission",
      description: [
        "Submit grievances quickly and efficiently.",
        "Track real-time updates on complaint status.",
        "Ensures transparency and faster resolution.",
        "Easy-to-use interface for students.",
      ],
      icon: (
        <HiOutlineSpeakerphone className="text-indigo-500 text-6xl max-sm:text-3xl" />
      ),
    },
    {
      id: 2,
      title: "Event Management",
      description: [
        "Stay updated with upcoming university events.",
        "Hassle-free event registrations.",
        "Get instant notifications about new events.",
        "Never miss out on important activities.",
      ],
      icon: (
        <HiOutlineCalendar className="text-indigo-500 text-6xl max-sm:text-3xl" />
      ),
    },
    {
      id: 3,
      title: "Student Counseling",
      description: [
        "Access expert guidance for academic success.",
        "Book 1-on-1 sessions with professional counselors.",
        "Get career and personal growth advice.",
        "Support for mental well-being and stress management.",
      ],
      icon: (
        <HiOutlineAcademicCap className="text-indigo-500 text-6xl max-sm:text-3xl" />
      ),
    },
    {
      id: 4,
      title: "Feedback System",
      description: [
        "Share your opinions to improve university services.",
        "Anonymous feedback options available.",
        "Helps shape a better student experience.",
        "Constructive feedback leads to better policies.",
      ],
      icon: (
        <HiOutlineChatAlt2 className="text-indigo-500 text-6xl max-sm:text-3xl" />
      ),
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20 w-full">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-5xl font-extrabold text-gray-800 tracking-wider max-md:text-3xl">
          Key Features of{" "}
          <span
            className="text-indigo-500"
            style={{ fontFamily: "dancingScript" }}
          >
            SAMS
          </span>
        </h2>
        <p className="text-lg text-gray-600 mt-4 tracking-wide leading-relaxed max-md:text-base max-sm:text-sm">
          Explore innovative tools designed to enhance student engagement and
          streamline university services. SAMS is your all-in-one student
          management system.
        </p>
      </div>

      <div className="relative flex flex-col items-center w-full max-w-8xl mx-auto">
        <div className="absolute w-[2px] h-full bg-transparent left-1/2 transform -translate-x-1/2 border-dashed border-2 border-gray-400 max-md:left-4"></div>

        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`relative w-full flex items-center mb-16 ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            } max-md:justify-center`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white border-4 border-red-500 w-8 h-8 rounded-full z-10 max-md:left-4 flex items-center justify-center">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
            </div>

            <div
              className={`w-[48%] max-lg:w-[80%] max-md:w-[95%] max-sm:w-[90%] ${
                index % 2 === 0
                  ? "pr-12 flex justify-end max-md:pr-0"
                  : "pl-12 flex justify-start max-md:pl-0"
              }`}
            >
              <FeatureCard {...feature} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-[50px] border border-gray-200 text-center w-full max-w-2xl max-md:p-5 max-md:max-w-md max-sm:w-[90%] max-sm:p-4"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-400/20 rounded-tr-[50px] rounded-bl-[50px]"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-300/20 rounded-tr-[50px] rounded-bl-[50px]"></div>

      <div className="flex justify-center items-center mb-5">
        <span className="p-4 bg-indigo-200 border border-indigo-300 rounded-full shadow-sm">
          {icon}
        </span>
      </div>

      <h3 className="text-3xl font-semibold text-gray-900 tracking-wide max-md:text-2xl max-sm:text-xl">
        {title}
      </h3>

      <ul className="mt-4 text-gray-700 text-lg leading-relaxed tracking-wide text-left pl-20 list-disc max-md:text-base max-md:pl-4 max-sm:text-sm max-sm:pl-3">
        {description.map((point, index) => (
          <li key={index} className="mb-2 hover:text-indigo-700 transition-all">
            {point}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default FeatureSection;
