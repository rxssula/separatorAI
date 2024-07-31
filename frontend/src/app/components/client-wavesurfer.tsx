"use client";

import * as React from "react";
const { useMemo, useEffect, useRef } = React;
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { FC, useCallback, useState } from "react";
import { WavesurferProps } from "./waveform";

const ClientWavesurfer: FC<WavesurferProps> = ({
  audioUrl,
  title,
  isPlaying,
  onReady,
  onTimeUpdate,
  currentTime,
}) => {
  const containerRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const getColors = (title: string) => {
    switch (title.toLowerCase()) {
      case "music":
        return {
          background: "#1b4332",
          waveColor: "#40916c",
          progressColor: "#52b788",
        };
      case "vocal":
        return {
          background: "#2b2d42",
          waveColor: "#8d99ae",
          progressColor: "#edf2f4",
        };
      case "bass":
        return {
          background: "#3c2f2f",
          waveColor: "#be9b7b",
          progressColor: "#e3d5ca",
        };
      case "drums":
        return {
          background: "#3d2b3d",
          waveColor: "#b5838d",
          progressColor: "#e5989b",
        };
      default:
        return {
          background: "#1F2937",
          waveColor: "#9CA3AF",
          progressColor: "#6B7280",
        };
    }
  };

  const colors = getColors(title);

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    height: 80,
    waveColor: colors.waveColor,
    progressColor: colors.progressColor,
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
    backend: "MediaElement",
  });

  useEffect(() => {
    if (wavesurfer && !isReady) {
      setIsReady(true);
      onReady(wavesurfer);
      wavesurfer.setVolume(volume);
      wavesurfer.on("audioprocess", () => {
        onTimeUpdate(wavesurfer.getCurrentTime());
      });
      wavesurfer.on("seeking", () => {
        onTimeUpdate(wavesurfer.getCurrentTime());
      });
    }
  }, [wavesurfer, onReady, volume, isReady, onTimeUpdate]);

  useEffect(() => {
    if (wavesurfer && isReady) {
      if (isPlaying) {
        wavesurfer.play();
      } else {
        wavesurfer.pause();
      }
    }
  }, [isPlaying, wavesurfer, isReady]);

  useEffect(() => {
    if (
      wavesurfer &&
      isReady &&
      Math.abs(wavesurfer.getCurrentTime() - currentTime) > 0.5
    ) {
      const duration = wavesurfer.getDuration();
      if (duration > 0) {
        wavesurfer.seekTo(currentTime / duration);
      }
    }
  }, [currentTime, wavesurfer, isReady]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setVolume(volume);
    }
  }, [volume, wavesurfer]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 rounded-lg"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full sm:w-20 text-white font-semibold mb-2 sm:mb-0">
        {title}
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full sm:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, white 0%, white ${
              volume * 100
            }%, ${colors.waveColor} ${volume * 100}%, ${
              colors.waveColor
            } 100%)`,
          }}
        />
      </div>
      <div ref={containerRef} className="w-full flex-grow" />
    </div>
  );
};

export default ClientWavesurfer;
