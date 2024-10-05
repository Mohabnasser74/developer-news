import { db } from "../index";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { ExpressHandler, Post } from "../types";
import { ApiResponse, CreatePostRequest, ParamsID } from "../api";

const getPost = asyncWrapper<ExpressHandler<{}, ApiResponse<Post>, ParamsID>>(
  async (req, res, next) => {
    const postID = req.params.id;

    if (!postID) {
      return next(
        res.json({ status: 400, message: "Missing id parameter", data: null })
      );
    }

    const post = await db.getPostById(postID);

    if (!post) {
      return next({
        status: 404,
        message: "Post not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Post retrieved successfully",
      data: post,
    });
  }
);

const getUserPosts = asyncWrapper<
  ExpressHandler<{}, ApiResponse<Post[]>, { username: string; userID: string }>
>(async (req, res, next) => {
  const { userID } = req.params;

  if (!userID) {
    return next({
      status: 400,
      message: "Missing username or userID parameter",
      data: null,
    });
  }

  const posts = await db.getUserPosts(userID);

  if (!posts) {
    return next({
      status: 404,
      message: "Posts not found",
      data: null,
    });
  }

  res.status(200).json({
    status: 200,
    message: "Posts retrieved successfully",
    data: posts,
  });
});

const createPost = asyncWrapper<
  ExpressHandler<CreatePostRequest, ApiResponse<Post>>
>(async (req, res, next) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return next({ status: 400, message: "Missing title or url", data: null });
  }

  if (req.user) {
    const post = await db.createPost({
      title,
      url,
      userID: req.user.userID,
    });

    res.status(200).json({
      status: 200,
      message: "Post created successfully",
      data: post,
    });
  }
});

const updatePost = asyncWrapper<
  ExpressHandler<CreatePostRequest, ApiResponse, ParamsID>
>(async (req, res, next) => {
  const body = req.body;
  const postID = req.params.id;

  if (!postID) {
    return next({
      status: 400,
      message: "Missing post id parameter",
      data: null,
    });
  }

  if (req.user) {
    const post = await db.updatePostById(postID, {
      title: body.title,
      url: body.url,
    });

    res.status(200).json({
      status: 200,
      message: "Post updated successfully",
      data: post,
    });
  }
});

const deletePost = asyncWrapper<ExpressHandler<{}, ApiResponse, ParamsID>>(
  async (req, res, next) => {
    const postID = req.params.id;

    if (!postID) {
      return next({
        status: 400,
        message: "Missing post id parameter",
        data: null,
      });
    }

    await db.deletePost(postID);
    res.status(200).json({
      status: 200,
      message: "Post deleted successfully",
      data: null,
    });
  }
);

export { getPost, createPost, getUserPosts, updatePost, deletePost };
