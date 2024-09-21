import { Post } from "../types";

export interface PostDao {
  createPost: (post: Post) => Promise<void>;
  getPost: (id: string) => Promise<Post | undefined>;
  getAllPosts: () => Promise<Post[]>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}
