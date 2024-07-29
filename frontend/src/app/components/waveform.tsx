import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientWavesurfer = dynamic(() => import("./client-wavesurfer"), {
  ssr: false,
});

export interface WavesurferProps {
  audioUrl: string;
  title: string;
  isPlaying: boolean;
  onReady: (wavesurfer: any) => void;
  onTimeUpdate: (time: number) => void;
  currentTime: number;
}

const Wavesurfer: React.FC<WavesurferProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientWavesurfer {...props} />
    </Suspense>
  );
};

export default Wavesurfer;
