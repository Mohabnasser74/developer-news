import express, { Router } from "express";
import {
  getAllUsers,
  getUser,
  signup,
  signin,
} from "../controllers/user.controllers";

const userRouter: Router = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:username", getUser);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter;
