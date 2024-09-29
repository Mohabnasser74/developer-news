import { db } from "../index";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { ApiResponse, ExpressHandler, Post } from "../types";
import { verifyJwt } from "../auth";

const getPost = asyncWrapper<
  ExpressHandler<{}, ApiResponse<Post>, { id: string }>
>(async (req, res, next) => {
  const params = req.params;

  if (!params.id) {
    return next(
      res.json({ status: 400, message: "Missing id parameter", data: null })
    );
  }

  const post = await db.getPostById(params.id);

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
});

const getUserPosts = asyncWrapper<
  ExpressHandler<{}, ApiResponse<Post[]>, { userID: string }>
>(async (req, res, next) => {
  const { userID } = req.params;

  if (!userID) {
    return next({
      status: 400,
      message: "Missing user ID parameter",
      data: null,
    });
  }

  const posts = await db.getUserPosts(userID);

  res.status(200).json({
    status: 200,
    message: "Posts retrieved successfully",
    data: posts,
  });
});

type PostRedBody = Omit<Post, "userID">;

const createPost = asyncWrapper<ExpressHandler<PostRedBody, ApiResponse<Post>>>(
  async (req, res, next) => {
    const { title, url } = req.body;

    if (!title || !url) {
      return next({ status: 400, message: "Missing title or url", data: null });
    }

    if (req.user) {
      const post = await db.createPost({ title, url, userID: req.user.useID });

      res.status(200).json({
        status: 200,
        message: "Post created successfully",
        data: post,
      });
    }
  }
);

const updatePost = asyncWrapper<
  ExpressHandler<PostRedBody, ApiResponse, { id: string }>
>(async (req, res, next) => {
  const postID = req.params.id;

  if (!postID) {
    return next({
      status: 400,
      message: "Missing post id parameter",
      data: null,
    });
  }

  const { title, url } = req.body;

  if (!title || !url) {
    return next({ status: 400, error: "Missing title or url", data: null });
  }

  const post = await db.updatePostById(postID, {
    title,
    url,
  });

  res.status(200).json({
    status: 200,
    message: "Post updated successfully",
    data: post,
  });
});

const deletePost = asyncWrapper<
  ExpressHandler<{}, ApiResponse, { id: string }>
>(async (req, res, next) => {
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
});

export { getPost, createPost, getUserPosts, updatePost, deletePost };
