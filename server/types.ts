import { RequestHandler } from "express";

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Post {
  title: string;
  url: string;
  userID: string;
  postedAt: number;
}

export interface Like {
  userID: string;
  postID: string;
}

export interface Comment {
  userID: string;
  postID: string;
  content: string;
  postedAt: number;
}

export type ExpressHandler<Req, Res, Params = any> = RequestHandler<
  Partial<Params>,
  Res,
  Partial<Req>,
  any
>;

export interface ApiResponse<Data = Record<string, any> | null> {
  text?: string;
  status: number;
  message: string;
  data: Data | null;
}
