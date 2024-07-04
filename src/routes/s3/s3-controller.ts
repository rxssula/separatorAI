import { Request, Response } from "express";
import { S3 } from "@aws-sdk/client-s3";
import S3Service from "./s3-service";
import path, { join } from "path";
import { writeFile, unlink } from "fs";
import { readdir, readFile, stat } from "fs/promises";
import { Options, PythonShell } from "python-shell";
import mime from "mime";
import { Upload } from "@aws-sdk/lib-storage";

const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

class S3Controller {
  private s3Service: S3Service;

  constructor(s3Service: S3Service) {
    this.s3Service = s3Service;
  }

  NewUploadFile = async (req: Request, res: Response) => {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const audioBuffer = file.buffer;
    const filename = file.originalname;
    const tempPath = path.join(__dirname, "uploads", filename);
    const outputPath = path.join(__dirname, "./output");

    try {
      // Write the audio buffer to a temporary file
      await new Promise<void>((resolve, reject) => {
        writeFile(tempPath, audioBuffer, (err) => {
          if (err) {
            reject(new Error("Failed to save audio file."));
          } else {
            resolve();
          }
        });
      });
      console.log("Saved file locally");

      // Run the Python script to separate the audio
      const options: Options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [tempPath, outputPath],
      };

      console.log("running Python script");
      await PythonShell.run(path.join(__dirname, "demucs-script.py"), options);

      // Read the output directory to get the separated files
      const files = await readdir(outputPath);

      const filePromises = files.map(async (file) => {
        const filepath = join(outputPath, file);
        const fileStat = await stat(filepath);
        return fileStat.isFile() ? filepath : null;
      });

      const filteredFiles = (await Promise.all(filePromises)).filter(Boolean);

      const uploadPromises = filteredFiles.map(async (filepath) => {
        const fileBuffer = await readFile(filepath!);

        const contentType = mime.lookup(filepath!);

        const parallelUploads3 = new Upload({
          client: s3,
          params: {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filepath!,
            Body: fileBuffer,
            ContentType: contentType,
            ACL: "public-read",
          },
        });

        return parallelUploads3.done();
      });

      const uploadResults = await Promise.all(uploadPromises);
      console.log("Is there any error");
      const fileLinks = uploadResults.map((result: any) => result.Location);

      const deletePromises = filteredFiles.map((filePath) => {
        return new Promise<void>((resolve, reject) => {
          unlink(filePath!, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
      await Promise.all(deletePromises);
      unlink(tempPath, (err) => {
        if (err) {
          console.error("Error deleting temporary file:", err);
        }
      });

      res.status(200).json({
        message: "File was separated successfully",
        // files: separatedFiles,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  UploadFile = async (req: Request, res: Response): Promise<void> => {
    const file = (req as any).file;
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    try {
      const files = await this.s3Service.uploadFile(
        process.env.AWS_BUCKET_NAME!,
        file.originalname,
        file.buffer
      );
      res.status(200).json({ files });
    } catch (error) {
      res.status(500).json({ message: "Error uploading file" });
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
