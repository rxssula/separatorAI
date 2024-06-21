import mongoose, { Schema } from "mongoose";

export interface ISong extends Document {
  originalName: string;
  s3Url: string;
}

const SongSchema: Schema = new Schema({
  originalName: { type: String, required: true },
  s3Url: { type: String, required: true },
});

const Song = mongoose.model<ISong>("Song", SongSchema);

export default Song;
