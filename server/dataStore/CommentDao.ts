import { CreateCommentRequest } from "../api";
import { Comment } from "../types";

export interface CommentDao {
  createComment: (comment: Comment) => Promise<Comment | null>;
  getPostComments: (postID: string) => Promise<Comment[] | null>;
  updateCommentById: (
    id: string,
    content: CreateCommentRequest
  ) => Promise<Comment | null>;
  deleteComment: (id: string) => Promise<Comment | null>;
}
