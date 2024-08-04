"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "./components/button";
import { Card } from "./components/music-card";

const photos = [
  {
    photo: "/images/kairosh.jpg",
    title: "Eh, qаrındаs",
    author: "Qairat Nurtas"
  },
  {
    photo: "/images/joy.jpeg",
    title: "When you were mine",
    author: "Joy Crookes"
  },
  {
    photo: "/images/death.jpeg",
    title: "Kodoku",
    author: "Hideki Taniuchi"
  },
  {
    photo: "/images/kanye.png",
    title: "Bomb",
    author: "Kanye West"
  },
  {
    photo: "/images/things.jpg",
    title: "the way things go",
    author: "beabadoobee"
  },
  {
    photo: "/images/91.jpg",
    title: "All I Need",
    author: "NinetyOne"
  },
]

const MusicSeparation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center pt-16 sm:pt-24 md:pt-28 lg:pt-28">
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
          <div className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6 md:gap-8 lg:grid lg:grid-cols-4 xl:grid-cols-6">
            {photos.map((o, index) => (
              <div
                  key={index}
                className="w-[80%] sm:w-[45%] md:w-[30%] lg:w-full flex-shrink-0"
              >
                <Link href={`/examples/${index}`}>
                      <Card key={index} author={o.author} photo={o.photo} title={o.title} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSeparation;
