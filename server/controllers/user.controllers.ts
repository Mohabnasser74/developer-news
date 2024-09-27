import { MongoDBDatastore } from "../dataStore/mongoDB";
import { ExpressHandler, ApiResponse, User } from "../types";
import { asyncWrapper } from "../middlewares/asyncWrapper";

const db = new MongoDBDatastore();

export const getUser = asyncWrapper<
  ExpressHandler<{}, ApiResponse<User>, { username: string }>
>(async (req, res, next) => {
  const username = req.params.username;

  if (!username) {
    return next({
      status: 400,
      message: "Username is required",
      data: null,
    });
  }

  const result = await db.getUser(username);
  if (result.status === 404) {
    return next(result);
  }

  res.status(result.status).json(result);
});

export const getAllUsers = asyncWrapper<ExpressHandler<{}, ApiResponse>>(
  async (req, res, next) => {
    const result = await db.getAllUsers();
    res.status(result.status).json(result);
  }
);

export const signup = asyncWrapper<ExpressHandler<User, ApiResponse<User>>>(
  async (req, res, next) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) {
      return next({
        status: 400,
        message: "Username, email and password are required",
        data: null,
      });
    }

    const result = await db.signup({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    if (result.status === 400) {
      return next(result);
    }

    res.status(result.status).json(result);
  }
);

type CreateUserRequest = Pick<User, "username" | "password">;

export const signin = asyncWrapper<
  ExpressHandler<CreateUserRequest, ApiResponse>
>(async (req, res, next) => {
  const user = req.body;

  if (!user.username || !user.password) {
    return next({
      status: 400,
      message: "Username and password are required",
      data: null,
    });
  }

  const result = await db.signin(user.username, user.password);

  if (result.status === 400 || result.status === 404) {
    return next(result);
  }
  res.status(result.status).json(result);
});
