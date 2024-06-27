import { Upload } from "@aws-sdk/lib-storage";
import dotenv from "dotenv";
import { S3 } from "@aws-sdk/client-s3";
import mime from "mime";
import Song from "../files/models/Song";
import { demucs } from "../demucs/demucs-service";

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

class S3Service {
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

      const results = await demucs(res.Location);

      const newSong = new Song({
        originalName: name,
        s3Url: res.Location,
        bass: results.bass,
        drums: results.drums,
        other: results.other,
        vocals: results.vocals,
      });

      await newSong.save();
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
