import { db } from "..";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { ApiResponse, ExpressHandler, Like } from "../types";

const createLike = asyncWrapper<
  ExpressHandler<{}, ApiResponse, { postID: string }>
>(async (req, res, next) => {
  const postID = req.params.postID;
  const userID = req.user?.userID;

  if (!postID || !userID) {
    return next({
      status: 400,
      message: "Post ID and User ID are required.",
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
});

export { createLike };
