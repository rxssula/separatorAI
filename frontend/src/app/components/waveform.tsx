"use client"

import { useWavesurfer, WavesurferProps } from "@wavesurfer/react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"

const WaveSurfer = dynamic<WavesurferProps>(() => import('@wavesurfer/react'), { ssr: false })

interface WaveformProps {
    audioUrl: string;
    title: string;
}

export const Waveform: React.FC<WaveformProps> = ({ audioUrl, title }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);

    const wavesurferRef = useRef<any>(null);

    const onReady = useCallback((wavesurfer: any) => {
        wavesurferRef.current = wavesurfer;
        console.log("Wavesurfer is ready")
    }, [])

    const handlePlayPause = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
            setIsPlaying(!isPlaying);
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'audio.mp3'; // You can set a custom filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (wavesurferRef.current) {
            wavesurferRef.current.setVolume(newVolume);
        }
    };

    return (
        <div className="grid grid-cols-[120px_1fr_100px] gap-4 items-center">
            <p className="text-left">{title}</p>
            <div className="relative w-full">
                <WaveSurfer
                    height={80}
                    waveColor="rgb(102, 102, 102)"
                    progressColor="rgb(187, 187, 187)"
                    cursorColor="white"
                    url={audioUrl}
                    onReady={onReady}
                    backend="MediaElement"
                />
            </div>
            <div className="flex flex-row gap-4 justify-end">
                <div className="flex flex-col place-content-between">
                    <button onClick={handlePlayPause}>
                        {isPlaying ?
                            (<Image src="/icons/Pause.svg" alt="pause" width={30} height={30} />) :
                            (<Image src="/icons/Play.svg" alt="play" width={30} height={30} />)}
                    </button>
                    <button onClick={handleDownload}>
                        <Image src="/icons/Download.svg" alt="download" width={30} height={30} />
                    </button>
                </div>
                <input
                    type="range"
                    id="volume"
                    name="volume"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-8 h-20 appearance-slider-vertical"
                    style={{
                        writingMode: "vertical-lr",
                        WebkitAppearance: 'slider-vertical',
                        padding: '0 5px',
                        transform: "rotate(180deg)"
                    }}
                />
            </div>
        </div>
    )
}
