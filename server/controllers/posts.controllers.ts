import { db } from "../index";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { ApiResponse, ExpressHandler, Post } from "../types";

const getPost = asyncWrapper<
  ExpressHandler<{}, ApiResponse<Post>, { id: string }>
>(async (req, res, next) => {
  const params = req.params;

  if (!params.id) {
    return next(
      res.json({ status: 400, message: "Missing id parameter", data: null })
    );
  }

  const result = await db.getPost(params.id);

  res.status(result.status).json(result);
});

const getAllPosts = asyncWrapper<
  ExpressHandler<{}, ApiResponse<Post[]>, { userID: string }>
>(async (req, res, next) => {
  const params = req.params;

  if (!params.userID) {
    return next({
      status: 400,
      message: "Missing user ID parameter",
      data: null,
    });
  }

  const result = await db.getAllPosts(params.userID);
  res.status(result.status).json(result);
});

type PostRedBody = Omit<Post, "userID">;
// JWT -> userID;

const createPost = asyncWrapper<ExpressHandler<Post, ApiResponse<Post>>>(
  async (req, res, next) => {
    const post = req.body;

    if (!post.title || !post.url || !post.userID) {
      return next({ status: 400, message: "Missing title or url", data: null });
    }

    const result = await db.createPost({
      title: post.title,
      url: post.url,
      userID: post.userID,
    });

    res.status(result.status).json(result);
  }
);

const updatePost = asyncWrapper<
  ExpressHandler<PostRedBody, ApiResponse, { id: string }>
>(async (req, res, next) => {
  const params = req.params;
  if (!params.id) {
    return next({ status: 400, message: "Missing id parameter", data: null });
  }

  const post = req.body;
  if (!post.title || !post.url) {
    return next({ status: 400, error: "Missing title or url", data: null });
  }

  const result = await db.updatePost(params.id, {
    title: post.title,
    url: post.url,
  });
  res.status(result.status).json(result);
});

const deletePost = asyncWrapper<
  ExpressHandler<{}, ApiResponse, { id: string }>
>(async (req, res, next) => {
  const params = req.params;

  if (!params.id) {
    return next({ status: 400, message: "Missing id parameter", data: null });
  }

  const result = await db.deletePost(params.id);
  res.status(result.status).json(result);
});

export { getPost, createPost, getAllPosts, updatePost, deletePost };
