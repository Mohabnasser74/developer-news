import mongoose, { Schema, Model } from "mongoose";
import { Comment } from "../types";

const commentSchema = new Schema<Comment>(
  {
    userID: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    postID: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CommentModel: Model<Comment> = mongoose.model(
  "Comment",
  commentSchema
);
