import { Post } from "../types";

export interface PostDao {
  getPostById: (id: string) => Promise<Post | null>;
  getUserPosts: (userID: string) => Promise<Post[]>;
  createPost: (post: Post) => Promise<Post>;
  updatePostById: (
    id: string,
    post: Omit<Post, "userID">
  ) => Promise<Post | null>;
  deletePost: (id: string) => Promise<Post | null>;
}
