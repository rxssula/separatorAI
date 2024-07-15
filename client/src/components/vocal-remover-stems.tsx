// Stems.tsx
import React from "react";
import { MicIcon, Music2Icon } from "./icons";
import AudioPlayer from "./audio-player";

const audioFiles = {
  vocals: "/music/vocals.wav",
  drums: "/music/drums.wav",
  bass: "/music/bass.wav",
  other: "/music/other.wav",
};

export function VocalRemoverStems() {
  return (
    <div className="px-10 md:px-20 grid grid-cols-1">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Vocal-Removed Audio
      </h2>
      <p className="text-muted-foreground text-lg mb-8">
        Listen to or download the vocal-removed audio, as well as the remaining
        music.
      </p>
      <div className="w-full bg-muted rounded-lg p-6 border">
        <AudioPlayer
          src={audioFiles.vocals}
          title="vocals"
          icon={<MicIcon className="w-6 h-6 mr-2 text-primary" />}
        />
        <AudioPlayer
          src={audioFiles.drums}
          title="drums"
          icon={<Music2Icon className="w-6 h-6 mr-2 text-primary" />}
        />
      </div>
    </div>
  );
}
