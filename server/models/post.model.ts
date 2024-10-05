import mongoose, { Schema, Model } from "mongoose";
import { Post } from "../types";

const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const PostModel: Model<Post> = mongoose.model("Post", postSchema);
