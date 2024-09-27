import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controllers";

const postRouter = express.Router();

postRouter.get("/:userID", getAllPosts);
postRouter.post("/new", createPost);
postRouter.route("/:id").get(getPost).put(updatePost).delete(deletePost); // userID?

export default postRouter;
