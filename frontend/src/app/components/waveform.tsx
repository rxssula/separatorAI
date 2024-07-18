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
        <div className="flex flex-row gap-5">
            <p className="content-center">{ title }</p>
            <WaveSurfer
            height={80}
            width={1060}
            waveColor="rgb(102, 102, 102)"
            progressColor="rgb(187, 187, 187)"
            url={audioUrl}
            onReady={onReady}
            backend="MediaElement"
            />
            <div className="flex flex-col gap-4 content-center">
                <button onClick={handlePlayPause}>{ isPlaying ?
                    (<Image src="/icons/pause.svg" alt="pause" width={30} height={30} />) :
                    (<Image src="/icons/play.svg" alt="play" width={30} height={30} />) }</button>
                <button onClick={handleDownload}><Image src="/icons/download.svg" alt="download" width={30} height={30} /></button>
            </div>
            <div>
            <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{
                    writingMode: "vertical-rl",
                    WebkitAppearance: 'slider-vertical',
                    width: '8px',
                    height: '80px',
                    padding: '0 5px',
                    transform: "rotate(180deg)"
                }}
            />
            </div>
        </div>
    )
}
