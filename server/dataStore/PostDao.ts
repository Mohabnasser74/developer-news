import { ApiResponse, Post } from "../types";

export interface PostDao {
  getPost: (id: string) => Promise<ApiResponse<Post> | void>;
  createPost: (post: Post) => Promise<ApiResponse<Post> | void>;
  getAllPosts: (userID: string) => Promise<ApiResponse<Post[]> | void>;
  updatePost: (
    id: string,
    post: Omit<Post, "userID">
  ) => Promise<ApiResponse<Post> | void>;
  deletePost: (id: string) => Promise<ApiResponse | void>;
}
