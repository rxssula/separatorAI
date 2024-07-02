"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { PlayIcon, DownloadIcon } from "./icons";
import { PauseIcon } from "lucide-react";
import WavesurferPlayer from "@wavesurfer/react";

interface AudioPlayerProps {
  src: string;
  title: string;
  icon: React.ReactNode;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, icon }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && (wavesurfer as any).playPause();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-medium capitalize">{title}</h3>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPlayPause}>
            {playing ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <DownloadIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <audio ref={audioRef} src={src} className="w-full">
        Your browser does not support the audio element.
      </audio>
      <WavesurferPlayer
        height={80}
        waveColor="gray"
        progressColor="black"
        url={src}
        onReady={onReady}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
