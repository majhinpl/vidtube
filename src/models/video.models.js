import mongoose, { Schema } from "mongoose";
const videoSchema = new Schema({}, { timeseries: true });

export const Video = mongoose.Schema("Video", videoSchema);
