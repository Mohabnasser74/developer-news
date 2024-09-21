import mongoose, { Schema, Model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<User> = mongoose.model("User", userSchema);
