import { Request, Response } from "express";
import S3Service from "./s3-service";
import path from "path";
import {
  deleteFiles,
  deleteFolder,
  readOutputFiles,
  saveFile,
} from "../files/files-service";
import fs from "fs"
import { runDemucsScript, runYoutubeScript } from "../../python-scripts/python-script";

class S3Controller {
  private s3Service: S3Service;

  constructor(s3Service: S3Service) {
    this.s3Service = s3Service;
  }

    // Function to extract YouTube ID from the URL
  private extractYouTubeID = (url: string): string => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  UploadLink = async (req: Request, res: Response) => {
    const { link } = req.body;
    const downloadDir = path.join(__dirname, "uploads");

    try {
      // Extract the YouTube ID from the URL
      const youtubeID = this.extractYouTubeID(link);
      if (!youtubeID) {
        throw new Error("Invalid YouTube URL");
      }

      // Step 1: Download the file from YouTube
      await runYoutubeScript(link, downloadDir);
      console.log("Downloaded successfully");

      // Construct the expected filename using the YouTube ID
      const audioPath = path.join(downloadDir, `${youtubeID}.mp3`);
      const filename = path.basename(audioPath);
      const outputPath = path.join(__dirname, "./output");
      const folderName = path.parse(filename).name;

      // Step 2: Run Demucs to separate the audio file
      console.log("Running Python script");
      await runDemucsScript(audioPath, outputPath);
      console.log("Finished running Python script");

      // Step 3: Read the separated files from the output directory
      const separatedFilesDir = path.join(outputPath, "/hdemucs_mmi", folderName);
      const separatedFiles = await readOutputFiles(separatedFilesDir);

      // Step 4: Upload the separated stems to S3
      console.log("Uploading files to s3...")
      const fileLinks = await Promise.all(
        separatedFiles.map((filepath) => {
          const filename = path.basename(filepath);
          return this.s3Service.uploadFileToS3WithStream(filepath, filename, folderName);
        })
      );
      console.log("Uploaded files to s3")

      const fileLinkLocations = fileLinks.map((link) => link.Location);
      const allFileLinks = [...fileLinkLocations];
      console.log(allFileLinks);

      // Step 5: Clean up temporary files
      await deleteFiles([...separatedFiles, audioPath]);
      await deleteFolder(separatedFilesDir);

      // Step 6: Send the response back to the user
      res.status(200).json({
        message: "File was separated successfully",
        files: fileLinks,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  UploadFile = async (req: Request, res: Response) => {
    const file = (req as any).file;
    fs.mkdirSync("uploads")
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const audioBuffer = file.buffer;
    const filename = file.originalname;
    const tempPath = path.join(__dirname, "./uploads", filename);
    const outputPath = path.join(__dirname, "./output");

    try {
      await saveFile(tempPath, audioBuffer);
      console.log("Saved file locally");

      const folderName = path.parse(filename).name;

      // const originalFileLink = await this.s3Service.uploadFileToS3(
      //   tempPath,
      //   filename,
      //   folderName
      // );
      // console.log("Uploaded original file to S3");

      console.log("Running Python script");
      await runDemucsScript(tempPath, outputPath);

      const files = await readOutputFiles(
        path.join(
          outputPath,
          "/hdemucs_mmi",
          filename.substring(0, filename.length - 4)
        )
      );

      const fileLinks = await Promise.all(
        files.map((filepath) => {
          const filename = path.basename(filepath);
          return this.s3Service.uploadFileToS3(filepath, filename, folderName);
        })
      );

      const fileLinkLocations = fileLinks.map((link) => link.Location);
      // const allFileLinks = [originalFileLink.Location, ...fileLinkLocations];
      const allFileLinks = [...fileLinkLocations];
      console.log(allFileLinks);

      await deleteFiles([...files, tempPath]);
      await deleteFolder(path.join(outputPath, "/hdemucs_mmi", folderName));

      res.status(200).json({
        message: "File was separated successfully",
        files: fileLinks,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  UpdateFile = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      this.s3Service.updateFile(req.body.Bucket, req.body.name, req.body.file);
      res.status(200).json({ message: "File updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating file" });
    }
  };

  DeleteFile = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      this.s3Service.deleteFile(req.body.Bucket, req.body.name);
      res.status(200).json({ message: "File deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting file" });
    }
  };

  ListSongs = async (req: Request, res: Response): Promise<void> => {
    try {
      //   const songs = await Song.find();
      res.status(200).json({ message: "listSongs" });
    } catch (error) {
      res.status(500).json({ message: "Error listing songs" });
    }
  };
}

export default S3Controller;
