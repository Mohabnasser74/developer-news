import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import UR from "./router/user.router";
import PR from "./router/post.router";
import { ApiResponse } from "./types";
import { MongoDBDatastore } from "./dataStore/mongoDB";

const app = express();

app.use(express.json());

app.use("/users", UR);
app.use("/posts", PR);

const globalError: ErrorRequestHandler<any, ApiResponse> = (
  error,
  req,
  res,
  next
) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
    data: null,
  });
};

app.use(globalError);

export const db = new MongoDBDatastore();

const uri: string | undefined = process.env.URI_CONNECTION;
const port: string | undefined = process.env.PORT;

async function main() {
  if (uri) {
    await mongoose.connect(uri);
    console.log("DB IS RUNNING");
  } else {
    console.log("URI CONNECTION NOT FOUND");
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`APP IS LISTENING TO PORT: ${port}`);
  });
}

main().catch((error) => console.log(error));
