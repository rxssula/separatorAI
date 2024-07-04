import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
import { S3 } from "@aws-sdk/client-s3";
import mime from "mime";
import Song from "../files/models/Song";
import { Demucs, demucs } from "../demucs/demucs-service";
import axios from "axios";

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

class S3Service {
  private async uploadFileFromUrl(Bucket: string, name: string, url: string) {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const contentType = mime.lookup(name);

    try {
      return new Upload({
        client: s3,
        params: {
          Bucket,
          Key: name,
          Body: response.data,
          ContentType: contentType,
          ACL: "public-read",
        },
      }).done();
    } catch (error) {
      console.log(`Error uploading a file: ${error}`);
    }
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
