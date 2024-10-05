import express from "express";
import {
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";
import { isAuth } from "../middlewares/isAuth";

const postRouter = express.Router();

postRouter.post("/new", isAuth, createPost);
postRouter.get("/:userID", getUserPosts);
postRouter.route("/:id").put(isAuth, updatePost).delete(isAuth, deletePost);

export default postRouter;
