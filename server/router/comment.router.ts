import express from "express";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/comments.controller";
import { isAuth } from "../middlewares/isAuth";

const commentRouter = express.Router();

commentRouter.post("/new/:postID", isAuth, createComment);
commentRouter.get("/list/:postID", getPostComments);
commentRouter
  .route("/:id")
  .put(isAuth, updateComment)
  .delete(isAuth, deleteComment);

export default commentRouter;
