import Replicate from "replicate";

export interface Demucs {
  bass: string | null;
  drums: string | null;
  other: string | null;
  vocals: string | null;
}

export const demucs = async (audio: String | undefined) => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const input = {
    audio: audio,
  };

  const output = await replicate.run(
    "cjwbw/demucs:25a173108cff36ef9f80f854c162d01df9e6528be175794b81158fa03836d953",
    { input }
  );

  return output as Demucs;
};
