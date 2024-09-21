import express from "express";
import {
  getAllUsers,
  getUser,
  signup,
  signin,
} from "../controllers/user.controllers";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:username", getUser);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
