import mongoose, { Schema, Model } from "mongoose";
import { Like } from "../types";

const likeSchema = new Schema<Like>(
  {
    userID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    postID: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

export const LikeModel: Model<Like> = mongoose.model("Like", likeSchema);
