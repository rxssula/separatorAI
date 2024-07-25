import { PythonShell, Options } from "python-shell";
import path from "path";
import { exec } from "child_process";

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
  return new Promise<void>((resolve, reject) => {
    exec(
      `docker-compose run --rm python-app python /app/python-scripts/demucs-script.py ${tempPath} ${outputPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      }
    );
  });
};
