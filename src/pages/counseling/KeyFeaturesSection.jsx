import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const KeyFeaturesSection = () => {
  return (
    <section className="w-full bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-rose-500 text-sm font-semibold tracking-widest uppercase">
            Key Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 tracking-tight">
            Why Choose Us?
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left - Team Image & Decorative Image */}
          <div className="flex flex-col items-center lg:items-start space-y-6 w-full">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md text-center mx-auto lg:mx-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Team Member
              </h3>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/53ac1fe258e2dc2dc6f0874a5df735956ca93b32daa0f00b3238d14d591e0645?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
                alt="Team member avatars"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <img
              src="https://img.freepik.com/free-photo/hacker-cracking-binary-code-computer-screen_53876-102610.jpg"
              alt="Decorative"
              className="w-full max-w-md rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Right - Features List */}
          <div className="w-full space-y-8 text-gray-900">
            {features.map(({ title, description }, i) => (
              <article key={i}>
                <h3 className="text-2xl font-semibold flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                  {title}
                </h3>
                <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Personalized Feedback",
    description:
      "Benefit from data-driven, custom feedback provided by our advanced AI algorithms.",
  },
  {
    title: "Insider Strategies",
    description:
      "Discover insider strategies and practical advice for navigating every phase of the admissions journey.",
  },
  {
    title: "Community Q&A Forum",
    description:
      "Engage with other members in our interactive forum to collaboratively address your questions.",
  },
  {
    title: "UK Admissions Test Question Bank",
    description:
      "Access an extensive collection of admissions test questions for thorough preparation.",
  },
];

export default KeyFeaturesSection;
