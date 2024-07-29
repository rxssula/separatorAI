"use client";

import Wavesurfer from "@/app/components/waveform";
import { FC, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface ExampleProps {
  params: { id: number };
}

const audios = [
  {
    Vocals: "/music/vocals.wav",
    Bass: "/music/bass.wav",
    Drums: "/music/drums.wav",
    Other: "/music/other.wav",
  },
];

const Example: FC<ExampleProps> = ({ params }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfers, setWavesurfers] = useState<any[]>([]);

  const handleReady = useCallback((wavesurfer: any) => {
    setWavesurfers((prev) => [...prev, wavesurfer]);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    wavesurfers.forEach((ws) => (isPlaying ? ws.pause() : ws.play()));
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col gap-2 sm:gap-4">
        {Object.entries(audios[params.id]).map(([title, url], index) => (
          <Wavesurfer
            key={title}
            audioUrl={url}
            title={title}
            isPlaying={isPlaying}
            onReady={handleReady}
          />
        ))}
      </div>
      <button
        onClick={handlePlayPause}
        className="mt-4 w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
      >
        {isPlaying ? "Pause All" : "Play All"}
      </button>
    </div>
  );
};

export default Example;
