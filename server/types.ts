import { Schema, Types } from "mongoose";
import { RequestHandler } from "express";

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

export interface JwtObject {
  email: string;
  userID: ID;
}

export type ParamsID = {
  id: string;
};
