"use client";

import Wavesurfer from "@/app/components/waveform";
import { FC, useState, useCallback } from "react";

interface ExampleProps {
  params: { id: number };
}

const audios = [
  {
    vocals:
      "https://separatoraibucket.s3.eu-north-1.amazonaws.com/c12d6a8a-a181-4448-a171-fcf054c56831/vocals.wav",
    bass: "https://separatoraibucket.s3.eu-north-1.amazonaws.com/9602844b-8cd4-4823-80e8-d9b6245503ca/bass.wav",
    drums:
      "https://separatoraibucket.s3.eu-north-1.amazonaws.com/4a97db55-4732-4bf1-9b62-6f17a6cd54e1/drums.wav",
    other:
      "https://separatoraibucket.s3.eu-north-1.amazonaws.com/66f5465b-ba2c-4c44-87bb-be5863565881/other.wav",
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
  };

  return (
    <div>
      <button onClick={handlePlayPause}>
        {isPlaying ? "Pause All" : "Play All"}
      </button>
      {Object.entries(audios[params.id]).map(([title, url]) => (
        <Wavesurfer
          key={title}
          audioUrl={url}
          title={title}
          isPlaying={isPlaying}
          onReady={handleReady}
        />
      ))}
    </div>
  );
};

export default Example;
