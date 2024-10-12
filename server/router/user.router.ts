import express from "express";
import {
  getUserById,
  signUp,
  signIn,
  signOut,
} from "../controllers/users.controller";
import { isAuth } from "../middlewares/isAuth";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.post("/signOut", isAuth, signOut);
userRouter.get("/:userID", getUserById);

export default userRouter;
