"use client";

import Wavesurfer from "@/app/components/waveform";
import { FC, useState, useCallback, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface ResultsPageProps {
  audioTracks: {
    [key: string]: string;
  };
}

const ResultsPage: FC<ResultsPageProps> = ({ audioTracks }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfers, setWavesurfers] = useState<WaveSurfer[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    wavesurfers.forEach((ws) => {
      if (Math.abs(ws.getCurrentTime() - time) > 0.5) {
        const duration = ws.getDuration();
        if (duration > 0) {
          ws.seekTo(time / duration);
        }
      }
    });
  };

  const handleReady = useCallback((wavesurfer: WaveSurfer) => {
    setWavesurfers((prev) => [...prev, wavesurfer]);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    wavesurfers.forEach((ws) => {
      if (isPlaying) {
        ws.pause();
      } else {
        ws.play();
      }
    });
  };

  return (
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col gap-2 sm:gap-4">
          {Object.entries(audioTracks).map(([title, url]) => (
              <Wavesurfer
                  key={title}
                  audioUrl={url}
                  title={title}
                  isPlaying={isPlaying}
                  onReady={handleReady}
                  onTimeUpdate={handleTimeUpdate}
                  currentTime={currentTime}
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

export default ResultsPage;