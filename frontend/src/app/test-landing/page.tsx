"use client";

import React, { useRef } from "react";
import { Button } from "../components/button";
import { Card } from "../components/music-card";

const MusicSeparation: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 290; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40">
        <p className="font-light italic text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4">
          Extract parts of the music
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 md:mb-6">
          Unleash the Layers: Music Separation at Your Fingertips
        </h1>
        <p className="text-sm sm:text-md md:text-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-6 sm:mb-8">
          Instantly split any song into separate tracks - vocals, drums, bass,
          and more.
        </p>
        <Button />
      </div>
      <div className="mt-16 text-white">
        <p className="text-white text-lg font-medium mb-4">See Examples</p>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 lg:hidden"
            aria-label="Scroll left"
          >
            ←
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6 md:gap-8 lg:grid lg:grid-cols-4 xl:grid-cols-6"
          >
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-[80%] sm:w-[45%] md:w-[30%] lg:w-full flex-shrink-0"
              >
                <Card />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 lg:hidden"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicSeparation;
