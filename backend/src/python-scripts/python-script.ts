import { PythonShell, Options } from "python-shell";
import path, { resolve } from "path";

export const runYoutubeScript = async (
  youtubeUrl: string,
  outputPath: string
): Promise<void> => {
  const options: Options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: [youtubeUrl, outputPath],
  };
  return new Promise<void>((resolve, reject) => {
    PythonShell.run(path.join(__dirname, "yt-download.py"), options)
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};

export const runDemucsScript = async (
  tempPath: string,
  outputPath: string
): Promise<void> => {
  const options: Options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: [tempPath, outputPath],
  };

  return new Promise<void>((resolve, reject) => {
    PythonShell.run(path.join(__dirname, "demucs-script.py"), options)
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};
