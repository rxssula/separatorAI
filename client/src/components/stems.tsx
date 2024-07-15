// Stems.tsx
import React from "react";
import { DrumIcon, FileMusicIcon, FishIcon, MicIcon } from "./icons";
import AudioPlayer from "./audio-player";

interface StemsProps {
  stems: any[];
}

export const Stems: React.FC<StemsProps> = ({ stems }) => {
  return (
    <div className="px-10 md:px-20 grid grid-cols-1">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Separated Stems
      </h2>
      <p className="text-muted-foreground text-lg mb-8">
        Listen to or download the individual stems.
      </p>
      <div className="w-full bg-muted rounded-lg p-6 border">
        <AudioPlayer
          src={stems[3].Location}
          title="vocals"
          icon={<MicIcon className="w-6 h-6 mr-2 text-primary" />}
        />
        <AudioPlayer
          src={stems[1].Location}
          title="drums"
          icon={<DrumIcon className="w-6 h-6 mr-2 text-primary" />}
        />
        <AudioPlayer
          src={stems[0].Location}
          title="bass"
          icon={<FishIcon className="w-6 h-6 mr-2 text-primary" />}
        />
        <AudioPlayer
          src={stems[2].Location}
          title="other"
          icon={<FileMusicIcon className="w-6 h-6 mr-2 text-primary" />}
        />
      </div>
    </div>
  );
};
