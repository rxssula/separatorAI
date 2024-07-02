import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import AudioPlayer from "../components/AudioPlayer";

const AudioSeparation: React.FC = () => {
  const [audioComponents, setAudioComponents] = useState<any>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audio Separation</h1>
      <FileUpload setAudioComponents={setAudioComponents} />
      {audioComponents && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AudioPlayer src={audioComponents.bass} label="Bass" />
          <AudioPlayer src={audioComponents.drums} label="Drums" />
          <AudioPlayer src={audioComponents.vocals} label="Vocals" />
          <AudioPlayer src={audioComponents.other} label="Other" />
        </div>
      )}
    </div>
  );
};

export default AudioSeparation;
