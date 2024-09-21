import { RequestHandler } from "express";
import { MongoDBDatastore } from "../dataStore/mongoDB";
import { User } from "../types";
import { asyncWrapper } from "../middlewares/asyncWrapper";

const db = new MongoDBDatastore();

export const getUser: RequestHandler = asyncWrapper(async (req, res, next) => {
  const result = await db.getUser(req.params.username);
  if (result.status === 404) {
    return next(result);
  }
  res.status(result.status).json(result);
});

export const getAllUsers: RequestHandler = asyncWrapper(
  async (req, res, next) => {
    const result = await db.getAllUsers();
    res.status(result.status).json(result);
  }
);

export const signup: RequestHandler = asyncWrapper(async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return next({
      status: 400,
      message: "Username, email and password are required",
      data: null,
    });
  }

  const user: User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const result = await db.signup(user);

  if (result.status === 400) {
    return next(result);
  }

  res.status(result.status).json(result);
});

export const signin: RequestHandler = asyncWrapper(async (req, res, next) => {
  const result = await db.signin(req.body.username, req.body.password);
  if (result.status === 400 || result.status === 404) {
    return next(result);
  }
  res.status(result.status).json(result);
});
