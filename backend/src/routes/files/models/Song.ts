import mongoose, { Schema } from "mongoose";

export interface ISong extends Document {
  originalName: string;
  s3Url: string;
  bass: string | null;
  drums: string | null;
  other: string | null;
  vocals: string | null;
}

const SongSchema: Schema = new Schema({
  originalName: { type: String, required: true },
  s3Url: { type: String, required: true },
  bass: { type: String },
  drums: { type: String },
  guitar: { type: String },
  other: { type: String },
  piano: { type: String },
  vocals: { type: String },
});

const Song = mongoose.model<ISong>("Song", SongSchema);

export default Song;
