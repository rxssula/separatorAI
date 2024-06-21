import { Request, Response } from "express";
import S3Service from "./s3-service";
import path from "path";
import fs from "fs";

class S3Controller {
  private s3Service: S3Service;

  constructor(s3Service: S3Service) {
    this.s3Service = s3Service;
  }

  UploadFile = async (req: Request, res: Response): Promise<void> => {
    const file = (req as any).file;
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    try {
      await this.s3Service.uploadFile(
        process.env.AWS_BUCKET_NAME!,
        file.originalname,
        file.buffer
      );
      res.status(200).json({ message: "File uploaded successfully" });
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
