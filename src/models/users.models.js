import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      type: String,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    password: {
      type: String,
      required: [true, "passwordis re"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timeseries: true }
);

export const User = mongoose.Schema("User", userSchema);
