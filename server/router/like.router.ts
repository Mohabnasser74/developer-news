import express from "express";
import { createLike } from "../controllers/likes.controller";
import { isAuth } from "../middlewares/isAuth";

const likeRouter = express.Router();

likeRouter.post("/:postID", isAuth, createLike);

export default likeRouter;
