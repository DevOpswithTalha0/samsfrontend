import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/08e370183cf6630e666b8c0b74959ce1dacdb829d164cfa6ae217a91b2738637",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/0d57ca2455394a08723c2c5072498f23ae91fa3185e189692aa654ffcb418489",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/faa2a8d6a38f0468be93d0dfd441bc9d41b9825b6df636e9042a32b781ecc769",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/0fcdd0a17db9263f4cc8ee05b9fcea04c3dc8bb5d954ea76b7e52960912beb5a",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/d221bf8f9c15c996373b79457e711e563ac268652d9f754c53ce6ad4d395babd",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/91551566e9403833c219f9d4552d2f8c99bc59f94011a24bb2c35784b7edbbef",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/de56a855016e40e0e6caebdee24b4572795ccec1faa380930126c14c4499e894",
  "https://cdn.builder.io/api/v1/image/assets/TEMP/737fdff66ee82b27943d12f4bd06de661855036d1f5b5d4919773eb9540f01db",
];

const GallerySection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-6 py-20 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Check Our Latest Gallery
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto">
          Explore our collection of moments captured during various events.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full aspect-square overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default GallerySection;
