import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);

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

main().catch((err) => console.log(err));
