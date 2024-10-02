import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { MongoDBDatastore } from "./dataStore/mongoDB/index.js";

import userRouter from "./router/user.router.js";
import postRouter from "./router/post.router.js";
import likeRouter from "./router/post.router.js";
import { globalError } from "./middlewares/globalError.js";

dotenv.config();

const app = express();
export const db = new MongoDBDatastore();

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/likes", likeRouter);
app.use(globalError);

const uri: string | undefined = process.env.URI_CONNECTION;
const port: string | undefined = process.env.PORT;

async function main() {
  if (!uri) {
    console.log("URI CONNECTION NOT FOUND");
    process.exit(1);
  }

  if (!port) {
    console.log("PORT NOT FOUND");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("DB IS RUNNING");

  app.listen(port, () => {
    console.log(`APP IS LISTENING TO PORT: ${port}`);
  });
}

main().catch((error) => console.log(error));
