import express from "express";
import {
  getUserPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller";
import { isAuth } from "../middlewares/isAuth";

const postRouter = express.Router();

postRouter.post("/new", isAuth, createPost);
postRouter.get("/:userID", getUserPosts);
postRouter
  .route("/:id")
  .get(getPost)
  .put(isAuth, updatePost)
  .delete(isAuth, deletePost);

export default postRouter;
