import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
import { S3 } from "@aws-sdk/client-s3";
import mime from "mime";
import { readFile } from "fs/promises";
import path from "path";
import fs from "fs"

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

class S3Service {

    async uploadFileToS3WithStream (filepath: string, filename: string, folderName: string) {
      const fileStream = fs.createReadStream(filepath);
      const contentType = mime.lookup(filename);

      const parallelUploads3 = new Upload({
        client: s3,
        params: {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${folderName}/${filename}`,
            Body: fileStream,
            ContentType: contentType,
            ACL: "public-read",
        },
      });

      return parallelUploads3.done();
    };

  async uploadFileToS3(
    filePath: string,
    filename: string,
    folderName: string
  ): Promise<any> {
    const fileBuffer = await readFile(filePath);
    const contentType = mime.lookup(filename);

    const s3Key = path.join(folderName, filename);

    const parallelUploads3 = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: contentType,
        ACL: "public-read",
      },
    });

    return parallelUploads3.done();
  }

  async uploadFile(Bucket: string, name: string, file: Buffer) {
    const contentType = mime.lookup(name);
    try {
      const res = await new Upload({
        client: s3,
        params: {
          Bucket,
          Key: name,
          Body: file,
          ContentType: contentType,
          ACL: "public-read",
        },
      }).done();
    } catch (error) {
      console.log(`Error uploading a file: ${error}`);
    }
  }

  async updateFile(Bucket: string, name: string, file: Buffer) {
    try {
      const res = await s3.putObject({
        Bucket,
        Key: name,
        Body: file,
      });
      console.log(res);
    } catch (error) {
      console.log(`Error updating a file: ${error}`);
    }
  }

  async deleteFile(Bucket: string, name: string) {
    try {
      const res = await s3.deleteObject({ Bucket, Key: name });
      console.log(res);
    } catch (error) {
      console.log(`Error deleting a file: ${error}`);
    }
  }

  async listSongs(Bucket: string) {
    try {
      s3.listObjectsV2({ Bucket }, (err, data) => {
        if (err) throw new Error(err);

        const songs = data?.Contents?.map((item) => {
          return {
            name: item.Key,
            url: `https://${Bucket}.s3.amazonaws.com/${item.Key}`,
          };
        });
      });
    } catch (error) {
      console.log(`Error listing songs: ${error}`);
    }
  }
}

export default S3Service;
