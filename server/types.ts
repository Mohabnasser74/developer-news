import { Schema } from "mongoose";
import { RequestHandler } from "express";

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Post {
  title: string;
  url: string;
  userID: Schema.Types.ObjectId;
}

export interface Like {
  userID: Schema.Types.ObjectId;
  postID: Schema.Types.ObjectId;
}

export interface Comment {
  userID: Schema.Types.ObjectId;
  postID: Schema.Types.ObjectId;
  content: string;
}

export interface ParamsDictionary {
  [key: string]: string;
}

export type ExpressHandler<Req, Res, P = ParamsDictionary> = RequestHandler<
  Partial<P>,
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
