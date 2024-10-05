import { Comment, Post, User } from "./types";

export interface ApiResponse<Data = Record<string, any> | null> {
  text?: string;
  status: number;
  message: string;
  data: Data | null;
}

export type CreateUserRequest = Pick<User, "email" | "password">;

export type CreatePostRequest = Partial<Omit<Post, "userID">>;

export type CreateCommentRequest = Pick<Comment, "content">;

export type ParamsID = {
  id: string;
};
