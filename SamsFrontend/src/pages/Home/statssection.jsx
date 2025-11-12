import { motion } from "framer-motion";
import { FaUsers, FaChartPie, FaClipboardList, FaStar } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const stats = [
  {
    title: "Active Users",
    value: 85,
    suffix: "K+",
    icon: <FaUsers />,
    color: "#4f46e5",
  },
  {
    title: "Events Managed",
    value: 120,
    suffix: "+",
    icon: <FaChartPie />,
    color: "#22c55e",
  },
  {
    title: "Grievances Resolved",
    value: 95,
    suffix: "%",
    icon: <FaClipboardList />,
    color: "#ef4444",
  },
  {
    title: "Satisfaction Rate",
    value: 98,
    suffix: "%",
    icon: <FaStar />,
    color: "#f59e0b",
  },
];

const StatsSection = () => {
  return (
    <div className="bg-gray-100">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row-reverse items-center gap-12"
      >
        {/* Right: Stats Section */}
        <div className="md:w-1/2 grid grid-cols-2 gap-8 max-sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-white to-gray-100 shadow-xl border border-gray-200 rounded-2xl text-center transition-transform transform hover:scale-105"
            >
              {/* Icon */}
              <div className="text-5xl mb-4" style={{ color: stat.color }}>
                {stat.icon}
              </div>

              {/* Circular Progress Bar */}
              <motion.div
                initial={{ strokeDasharray: "0, 100" }}
                whileInView={{ strokeDasharray: `${stat.value}, 100` }}
                transition={{ duration: 1.5 }}
                className="w-24 h-24 max-sm:w-20 max-sm:h-20"
              >
                <CircularProgressbar
                  value={stat.value}
                  text={`${stat.value}${stat.suffix}`}
                  styles={buildStyles({
                    textColor: stat.color,
                    pathColor: stat.color,
                    trailColor: "#e5e7eb",
                    textSize: "22px",
                  })}
                />
              </motion.div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-gray-800 tracking-wide">
                {stat.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Left: Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="relative text-5xl font-extrabold text-gray-900 tracking-wider max-lg:text-4xl max-md:text-3xl max-sm:text-2xl flex flex-wrap items-center justify-center text-center">
            <span className="underline decoration-yellow-500"> Our Impact</span>{" "}
            <span>&</span>{" "}
            <span className="text-indigo-500 relative inline-flex items-center">
              Growth
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/79a19f34ea9b113f32177631b62dc593be1365b2030c0a47c69b740be25e4747?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
                alt="Decorative element"
                className="ml-2 h-[65px] w-[62px] max-lg:h-[50px] max-lg:w-[48px] max-md:h-[40px] max-md:w-[38px] max-sm:h-[30px] max-sm:w-[28px] object-contain relative"
              />
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-700 max-w-xl leading-relaxed max-md:text-base max-sm:text-sm">
            Empowering students and faculty with seamless experiences, event
            management, and high satisfaction rates. Our platform enhances
            engagement, streamlines processes, and positively impacts academic
            communities.
          </p>

          {/* Student Satisfaction Images */}
          <div className="flex items-center mt-6 space-x-3">
            {/* Images of satisfied students */}
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                  alt="Satisfied Client"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md hover:scale-105 transition-transform"
                />
              ))}
            </div>

            {/* Caption */}
            <span className="text-gray-600 text-sm font-medium">
              Trusted by thousands of students globally
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default StatsSection;
