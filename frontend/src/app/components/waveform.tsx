import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientWavesurfer = dynamic(() => import("./client-wavesurfer"), {
  ssr: false,
});

interface WavesurferProps {
  audioUrl: string;
  title: string;
  isPlaying: boolean;
  onReady: (wavesurfer: any) => void;
}

const Wavesurfer: React.FC<WavesurferProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientWavesurfer {...props} />
    </Suspense>
  );
};

export default Wavesurfer;
