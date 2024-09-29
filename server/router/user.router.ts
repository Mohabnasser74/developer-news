import express from "express";
import {
  getAllUsers,
  getUser,
  signUp,
  signIn,
  signOut,
} from "../controllers/users.controller";
import { isAuth } from "../middlewares/isAuth";

const userRouter = express.Router();

userRouter.get("/", isAuth, getAllUsers);
userRouter.get("/:username", getUser);
userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.post("/signOut", isAuth, signOut);

export default userRouter;
