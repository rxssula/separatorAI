import { writeFile, readdir, stat, unlink, readFile, rm } from "fs/promises";
import { join } from "path";

export const saveFile = async (
  filePath: string,
  buffer: Buffer
): Promise<void> => {
  await writeFile(filePath, buffer);
};

export const readOutputFiles = async (
  outputPath: string
): Promise<string[]> => {
  const files = await readdir(outputPath);
  const filePaths = await Promise.all(
    files.map(async (file) => {
      const filepath = join(outputPath, file);
      const fileStat = await stat(filepath);
      return fileStat.isFile() ? filepath : null;
    })
  );
  return filePaths.filter(Boolean) as string[];
};

export const deleteFiles = async (filePaths: string[]): Promise<void> => {
  await Promise.all(filePaths.map(async (filePath) => unlink(filePath)));
};

export const deleteFolder = async (folderPath: string): Promise<void> => {
  await rm(folderPath, { recursive: true, force: true });
};
