import { Comment } from "../types";

export interface CommentDao {
  createComment: (comment: Comment) => Promise<Comment | null>;
  getPostComments: (postID: string) => Promise<Comment[]>;
  updateCommentById: (id: string, content: string) => Promise<Comment | null>;
  deleteComment: (id: string) => Promise<void>;
}
