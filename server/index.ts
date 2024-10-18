import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import { MongoDBDatastore } from "./dataStore/mongoDB/index";

import userRouter from "./router/user.router";
import postRouter from "./router/post.router";
import likeRouter from "./router/like.router";
import { globalError } from "./middlewares/globalError";
import { notFoundRoute } from "./middlewares/notFoundRoute";
import commentRouter from "./router/comment.router";
import rootRouter from "./router/root.router";

dotenv.config();

const app = express();
export const db = new MongoDBDatastore();

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);

app.use("*", notFoundRoute);
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
