import { Comment } from "../types";

export interface CommentDao {
  createComment: (comment: Comment) => Promise<void>;
  getComment: (id: string) => Promise<Comment | undefined>;
  getComments: (postID: string) => Promise<Comment[]>;
  updateComment: (comment: Comment) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}
