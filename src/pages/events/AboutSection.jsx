import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-6 py-20 max-md:py-10"
    >
      <div className="flex items-center justify-between  gap-10 flex-wrap md:flex-nowrap">
        <div className="w-1/2 max-md:w-full">
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-wide relative">
              About the{" "}
              <span
                style={{ fontFamily: "dancingScript" }}
                className="text-indigo-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl relative inline-block"
              >
                Events
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4 md:h-5 text-indigo-500"
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
          <p className="mt-6 text-2xl text-gray-700 leading-relaxed max-md:text-lg">
            <span className="text-indigo-500 font-bold">SAMS Event Portal</span>{" "}
            brings together students, faculty, and organizers to celebrate innovation and 
            community engagement within the university. The platform features academic events, 
            cultural fests, workshops, and seminars—all organized and managed through the SAMS 
            system. Whether you're looking to participate, organize, or simply stay informed, 
            SAMS offers a seamless experience to register, receive updates, and interact with 
            campus activities. Join us to explore exciting opportunities!
          </p>
        </div>

        <div className="w-1/2 grid gap-6 max-md:w-full">
          <div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2160c18d131cabe3c9e4e78b133ea1d2689a08d70c1f14a260f03e1741b2ce3?apiKey=88b052d72310497db4f14f0280ea35a7"
              alt="Event experience background"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm font-semibold uppercase">
                Memorable Experience
              </p>
              <h3 className="mt-1 text-2xl font-bold">
                Unforgettable Moments at Eventive 2025
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/afa0c8e5058b207eed8fe05d1606d64096db7faa883f2083afad21034cf55591?apiKey=88b052d72310497db4f14f0280ea35a7"
                alt="Skilled speakers background"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs font-semibold uppercase">
                  Skilled Speakers
                </p>
                <h3 className="mt-1 text-lg font-bold">
                  Storytelling Festival
                </h3>
              </div>
            </div>

            <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4058df6cd633f9185e7b45af072ac476a1faaf97ddf571ecf775a92ad6d8a2a3?apiKey=88b052d72310497db4f14f0280ea35a7"
                alt="Community building background"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs font-semibold uppercase">
                  Community Build
                </p>
                <h3 className="mt-1 text-lg font-bold">Build Networking</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
