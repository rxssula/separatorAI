"use client";

import * as React from "react";
const { useMemo, useEffect, useRef } = React;
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { FC } from "react";

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

interface WavesurferProps {
  audioUrl: string;
  title: string;
  isPlaying: boolean;
  onReady: (wavesurfer: any) => void;
}

const Wavesurfer: FC<WavesurferProps> = ({
  audioUrl,
  title,
  isPlaying,
  onReady,
}) => {
  const containerRef = useRef(null);

  const { wavesurfer, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  useEffect(() => {
    if (wavesurfer) {
      onReady(wavesurfer);
    }
  }, [wavesurfer, onReady]);

  useEffect(() => {
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.play();
      } else {
        wavesurfer.pause();
      }
    }
  }, [isPlaying, wavesurfer]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (wavesurfer) {
      wavesurfer.setVolume(Number(e.target.value));
    }
  };

  return (
    <div>
      <div ref={containerRef} />
      <p>Current audio: {title}</p>
      <p>Current time: {formatTime(currentTime)}</p>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default Wavesurfer;
