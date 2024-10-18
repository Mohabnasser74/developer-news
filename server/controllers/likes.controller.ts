import { db } from "..";
import { ApiResponse } from "../api";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { ExpressHandler } from "../types";

const createLike = asyncWrapper<
  ExpressHandler<{}, ApiResponse, { postID: string }>
>(async (req, res, next) => {
  const postID = req.params.postID;

  if (req.user) {
    const userID = req.user.userID;

    if (!postID) {
      return next({
        status: 400,
        message: "Post ID required.",
        data: null,
      });
    }

    await db.createLike({
      postID,
      userID,
    });

    res.status(201).json({
      status: 201,
      message: "Like created successfully.",
      data: null,
    });
  }
});

export { createLike };
