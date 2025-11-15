import React from "react";

const StatisticsSection = () => {
  return (
    <section
      className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-white"
      aria-label="Statistics"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-4xl sm:text-5xl font-bold text-indigo-600 tracking-tight">
          10k+
        </p>
        <p className="mt-2 text-base sm:text-lg font-medium text-gray-700 leading-relaxed">
          Great conversations <br className="hidden sm:block" /> per month
        </p>
      </div>

      <div className="hidden sm:block w-px h-20 bg-indigo-500/30"></div>
      <div className="block sm:hidden w-20 h-px bg-indigo-500/30 my-4"></div>

      <div className="flex flex-col items-center text-center">
        <p className="text-4xl sm:text-5xl font-bold text-indigo-600 tracking-tight">
          95+
        </p>
        <p className="mt-2 text-base sm:text-lg font-medium text-gray-700 leading-relaxed">
          Test Questions <br className="hidden sm:block" /> Bank
        </p>
      </div>
    </section>
  );
};

export default StatisticsSection;
