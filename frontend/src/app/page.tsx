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
        <div style={{minHeight: "100vh"}} className="flex flex-col min-h-full pt-32 mb-5">
          <div className="container mx-auto text-[170px] font-black leading-[101.5%]">
              <p className="z-10 relative">THE ULTIMATE</p>
              <p>MUSIC</p>
              <p className="relative"><span className="relative z-10">SEPARATOR</span>
                  <span className="absolute left-[605px] bottom-[137px] w-[394px] h-[242px]">
                        <Image style={{ borderRadius: "10px" }} layout="fill" className="h-auto w-auto z-0" src="/images/speaker.jpg" alt="Speaker" />
                  </span>
              </p>
          </div>
          <div className="flex flex-row justify-center font-semibold h-full mt-16 container mx-auto">
              <Link href="#examples"><button className="text-white h-16 w-40 border-2 px-4 rounded-[100px] border-[#AAA9A9] hover:transition-shadow hover:shadow-md hover:shadow-[#AAA9A9] bg-transparent">SEE EXAMPLE</button></Link>
              {/* <button className="text-white ml-5 h-16 w-40 px-4 rounded-[100px] bg-gradient-to-br from-[#ad5389] to-[#3c1053] border-[#AAA9A9] hover:transition-shadow hover:shadow-md hover:shadow-[#AAA9A9]">GET STARTED</button> */}
              <Link href="/upload"><button className="text-white ml-5 h-16 w-40 px-4 rounded-[100px] bg-gradient-to-br from-[#ad5389] to-[#3c1053] border-[#AAA9A9] hover:bg-gradient-to-r focus:ring-4 focus:ring-[#ad5389]">GET STARTED</button></Link>
          </div>
        </div>
    );
}

const ExamplePage = () => {
    return (
        <div id="examples" style={{ minHeight: "90vh" }} className={`container mx-auto flex flex-col gap-4`}>
            <p className="text-4xl font-semibold">Examples</p>
            <p className="text-md w-3/4 mb-12">If you’re interested in music, want to know more about how music is made, and how its parts interact with each other my innovative product is just for you.</p>
            <Waveform title="Original song" audioUrl="/music/Кайрат Нуртас – Эх Қарындас-[AudioTrimmer.com].mp3" />
            <div className="mt-16 flex flex-col gap-8">
                <Waveform title="Bass" audioUrl="/music/bass.wav" />
                <Waveform title="Drums" audioUrl="/music/drums.wav" />
                <Waveform title="Vocals" audioUrl="/music/vocals.wav" />
                <Waveform title="Other" audioUrl="/music/other.wav" />
            </div>
        </div>
    )
}
