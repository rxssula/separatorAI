import { PythonShell, Options } from "python-shell";
import path from "path";
import { spawn } from "child_process";

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
  return new Promise((resolve, reject) => {
    console.log('Attempting to run Python script...');
    console.log(`Command: python3 -m demucs ${tempPath} -o ${outputPath} -n hdemucs_mmi`);

    const pythonProcess = spawn('/usr/bin/python3', [
      '-m', 'demucs',
      tempPath,
      '-o', outputPath,
      '-n', 'hdemucs_mmi'
    ]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on('error', (error) => {
      console.error(`Failed to start Python process: ${error}`);
      reject(error);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Python script completed successfully');
        resolve();
      } else {
        console.error(`Python process exited with code ${code}`);
        reject(new Error(`Python process exited with code ${code}`));
      }
    });
  });
};
