import { Post } from "../types";

export interface PostDao {
  getPostById: (id: string) => Promise<Post | null>;
  getUserPosts: (userID: string) => Promise<Post[] | null>;
  createPost: (post: Post) => Promise<Post | null>;
  updatePostById: (
    id: string,
    post: Omit<Post, "userID">
  ) => Promise<Post | null>;
  deletePost: (id: string) => Promise<Post | null>;
}
