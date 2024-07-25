import { PythonShell, Options } from "python-shell";
import path from "path";

const demucsScriptPath = path.join(
  process.env.PYTHON_SCRIPTS_DIR!,
  "demucs-script.py"
);
const youtubeScriptPath = path.join(
  process.env.PYTHON_SCRIPTS_DIR!,
  "yt-download.py"
);

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
    PythonShell.run(demucsScriptPath, options)
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};
