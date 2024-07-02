// Stems.tsx
import React from "react";
import { DrumIcon, FileMusicIcon, FishIcon, MicIcon } from "./icons";
import AudioPlayer from "./audio-player";

const audioFiles = {
  vocals:
    "https://separatoraibucket.s3.eu-north-1.amazonaws.com/separated/y2mate.com+-+Playboi+Carti+speaking+Cartinese+for+15+seconds.mp3_vocals.wav",
  drums:
    "https://separatoraibucket.s3.eu-north-1.amazonaws.com/separated/y2mate.com+-+Playboi+Carti+speaking+Cartinese+for+15+seconds.mp3_drums.wav",
  bass: "https://separatoraibucket.s3.eu-north-1.amazonaws.com/separated/y2mate.com+-+Playboi+Carti+speaking+Cartinese+for+15+seconds.mp3_bass.wav",
  other:
    "https://separatoraibucket.s3.eu-north-1.amazonaws.com/separated/y2mate.com+-+Playboi+Carti+speaking+Cartinese+for+15+seconds.mp3_other.wav",
};

export function Stems() {
  return (
    <div className="flex flex-col items-start px-40 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Separated Stems
      </h2>
      <p className="text-muted-foreground text-lg mb-8">
        Listen to or download the individual stems.
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
          icon={<DrumIcon className="w-6 h-6 mr-2 text-primary" />}
        />
        <AudioPlayer
          src={audioFiles.bass}
          title="bass"
          icon={<FishIcon className="w-6 h-6 mr-2 text-primary" />}
        />
        <AudioPlayer
          src={audioFiles.other}
          title="other"
          icon={<FileMusicIcon className="w-6 h-6 mr-2 text-primary" />}
        />
      </div>
    </div>
  );
}
