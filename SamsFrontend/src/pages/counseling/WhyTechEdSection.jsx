import React from "react";

const WhyTechEdSection = () => {
  return (
    <section className="w-full bg-zinc-100">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-20 lg:py-24">
        <p className="text-xs sm:text-sm font-semibold text-indigo-700 uppercase tracking-widest">
          Why <span className="font-bold">TechEd</span>?
        </p>

        <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 tracking-tight leading-snug sm:leading-tight">
          Boost Your Admission Odds with Proven Success Rate:
        </h2>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed tracking-normal max-w-2xl">
          Our students gain admission to their first-choice university.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-12 mt-10">
          <div className="flex flex-col items-center">
            <p className="text-4xl sm:text-5xl font-bold text-indigo-700 tracking-tight">
              4x
            </p>
            <p className="mt-2 text-base sm:text-lg text-gray-700 tracking-normal text-center">
              Increase Chance
            </p>
          </div>

          <div className="hidden md:block w-px h-20 bg-indigo-500/30"></div>
          <div className="block md:hidden w-20 h-px bg-indigo-500/30 my-6"></div>

          <div className="flex flex-col items-center">
            <p className="text-4xl sm:text-5xl font-bold text-indigo-700 tracking-tight">
              70%
            </p>
            <p className="mt-2 text-base sm:text-lg text-gray-700 tracking-normal text-center">
              Admission to top university
            </p>
          </div>
        </div>

        <div className="mt-12 w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bd91b86b139f12928ec2809a22289b73a468d4bbac8b74a557b75800ae325e4?placeholderIfAbsent=true&apiKey=88b052d72310497db4f14f0280ea35a7"
            alt="Success statistics illustration"
            className="w-full max-w-4xl mx-auto object-contain rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyTechEdSection;
