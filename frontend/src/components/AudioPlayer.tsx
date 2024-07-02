import React from "react";

interface AudioPlayerProps {
  src: string;
  label: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, label }) => {
  return (
    <div className="my-4">
      <h4 className="text-lg font-bold">{label}</h4>
      <audio controls className="w-full">
        <source src={src} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
