"use client";

import { useEffect, useState } from "react";
import { Stems } from "./stems";
import Upload from "./upload";

export function FileUpload() {
  const [stems, setStems] = useState<string[]>([
    "/music/bass.wav",
    "/music/drums.wav",
    "/music/other.wav",
    "/music/vocals.wav",
  ]);

  const handleStemsUpdate = (newStems: string[]) => {
    setStems(newStems);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center bg-background">
        <div className="w-full py-12 md:py-16">
          <Upload
            title="Audio Stem Separation"
            description="Upload your audio file and let our AI separate it into individual stems."
            onStemsUpdate={handleStemsUpdate}
          />
          <Stems stems={stems} />
        </div>
      </div>
    </div>
  );
}
