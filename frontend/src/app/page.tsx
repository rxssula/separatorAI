import Image from "next/image";
import { Waveform } from "./components/waveform";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <LandingPage />
      <ExamplePage />
    </main>
  );
}

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-32 mb-5">
      <div className="container mx-auto text-4xl sm:text-6xl md:text-8xl lg:text-[170px] font-black leading-tight">
        <p className="z-10 relative">THE ULTIMATE</p>
        <p>MUSIC</p>
        <p className="relative">
          <span className="relative z-10">SEPARATOR</span>
          <span className="absolute right-0 bottom-0 md:left-[40%] lg:left-[605px] lg:bottom-[137px] w-32 h-32 md:w-64 md:h-64 lg:w-[394px] lg:h-[242px]">
            <Image
              style={{ borderRadius: "10px" }}
              layout="fill"
              objectFit="cover"
              className="h-auto w-auto z-0"
              src="/images/speaker.jpg"
              alt="Speaker"
            />
          </span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center font-semibold h-full mt-8 md:mt-16 container mx-auto">
        <Link href="#examples">
          <button className="text-white h-16 w-full sm:w-40 border-2 px-4 rounded-[100px] border-[#AAA9A9] hover:transition-shadow hover:shadow-md hover:shadow-[#AAA9A9] bg-transparent mb-4 sm:mb-0">
            SEE EXAMPLE
          </button>
        </Link>
        <Link href="/upload">
          <button className="text-white sm:ml-5 h-16 w-full sm:w-40 px-4 rounded-[100px] bg-gradient-to-br from-[#ad5389] to-[#3c1053] border-[#AAA9A9] hover:bg-gradient-to-r focus:ring-4 focus:ring-[#ad5389]">
            GET STARTED
          </button>
        </Link>
      </div>
    </div>
  );
};

const ExamplePage = () => {
  return (
    <div id="examples" className="container mx-auto flex flex-col gap-4 py-16">
      <p className="text-2xl md:text-4xl font-semibold">Examples</p>
      <p className="text-md md:w-3/4 mb-8 md:mb-12">
        If you&apos;re interested in music, want to know more about how music is
        made, and how its parts interact with each other my innovative product
        is just for you.
      </p>
      <Waveform title="Original song" audioUrl="/music/original.mp3" />
      <div className="mt-8 md:mt-16 flex flex-col gap-4 md:gap-8">
        <Waveform title="Bass" audioUrl="/music/bass.wav" />
        <Waveform title="Drums" audioUrl="/music/drums.wav" />
        <Waveform title="Vocals" audioUrl="/music/vocals.wav" />
        <Waveform title="Other" audioUrl="/music/other.wav" />
      </div>
    </div>
  );
};
