import { Types } from "mongoose";
import { RequestHandler } from "express";
import { ApiResponse } from "./api";

export type ID = string | Types.ObjectId;

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Post {
  title: string;
  url: string;
  userID: ID;
}

export interface Like {
  userID: ID;
  postID: ID;
}

export interface Comment {
  userID: ID;
  postID: ID;
  content: string;
}

export interface ParamsDictionary {
  [key: string]: string;
}

export type ExpressHandler<
  Req,
  Res = ApiResponse,
  P = ParamsDictionary
> = RequestHandler<Partial<P>, Res, Partial<Req>, any>;

export interface JwtObject {
  username: string;
  email: string;
  userID: ID;
}
