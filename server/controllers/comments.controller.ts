import { db } from "..";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { ExpressHandler, Comment } from "../types";
import { ApiResponse, CreateCommentRequest, ParamsID } from "../api";

const createComment = asyncWrapper<
  ExpressHandler<
    CreateCommentRequest,
    ApiResponse<Comment>,
    {
      postID: string;
    }
  >
>(async (req, res, next) => {
  const postID = req.params.postID;
  const content = req.body.content;

  if (!postID) {
    return next({
      status: 400,
      message: "Post ID is required",
      data: null,
    });
  }

  if (!content) {
    return next({
      status: 400,
      message: "Content is required",
      data: null,
    });
  }

  if (req.user) {
    const comment = await db.createComment({
      userID: req.user.userID,
      postID,
      content,
    });

    res.status(201).json({
      status: 201,
      message: "Comment created successfully",
      data: comment,
    });
  }
});

const getPostComments = asyncWrapper<
  ExpressHandler<
    {},
    ApiResponse<Comment[]>,
    {
      postID: string;
    }
  >
>(async (req, res, next) => {
  const postID = req.params.postID;

  if (!postID) {
    return next({
      status: 400,
      message: "Post ID is required",
      data: null,
    });
  }

  const comments = await db.getPostComments(postID);

  res.status(200).json({
    status: 200,
    message: "Comments retrieved successfully",
    data: comments,
  });
});

const updateComment = asyncWrapper<
  ExpressHandler<CreateCommentRequest, ApiResponse, ParamsID>
>(async (req, res, next) => {
  const commentID = req.params.id;
  const { content } = req.body;

  if (!commentID) {
    return next({
      status: 400,
      message: "Comment ID is required",
      data: null,
    });
  }

  if (!content) {
    return next({
      status: 400,
      message: "Content is required",
      data: null,
    });
  }

  const newComment = await db.updateCommentById(commentID, {
    content,
  });

  if (!newComment) {
    return next({
      status: 404,
      message: "Comment not found",
      data: null,
    });
  }

  res.status(200).json({
    status: 200,
    message: "Comment updated successfully",
    data: null,
  });
});

const deleteComment = asyncWrapper<ExpressHandler<{}, ApiResponse, ParamsID>>(
  async (req, res, next) => {
    const commentID = req.params.id;

    if (!commentID) {
      return next({
        status: 400,
        message: "Comment ID is required",
        data: null,
      });
    }

    const deleted = await db.deleteComment(commentID);

    if (!deleted) {
      return next({
        status: 404,
        message: "Comment not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Comment deleted successfully",
      data: null,
    });
  }
);

export { createComment, getPostComments, updateComment, deleteComment };
