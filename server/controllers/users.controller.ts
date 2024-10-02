import { db } from "../index";
import { ExpressHandler, ApiResponse, User } from "../types";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import bcrypt from "bcryptjs";
import { signJwt } from "../auth";

const getUser = asyncWrapper<
  ExpressHandler<{}, ApiResponse<User>, { username: string }>
>(async (req, res, next) => {
  const { username } = req.params;

  if (!username) {
    return next({
      status: 400,
      message: "Username is required",
      data: null,
    });
  }

  const user = await db.getUserByUsername(username);

  if (!user) {
    return next({
      status: 404,
      message: "User not found",
      data: null,
    });
  }

  res.status(200).json({
    status: 200,
    message: "User found",
    data: user,
  });
});

const getAllUsers = asyncWrapper<ExpressHandler<{}, ApiResponse<User[]>>>(
  async (req, res, next) => {
    const users = await db.getAllUsers();
    res.status(200).json({
      status: 200,
      message: "Users found",
      data: users,
    });
  }
);

const signUp = asyncWrapper<ExpressHandler<User, ApiResponse<User>>>(
  async (req, res, next) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) {
      return next({
        status: 400,
        message: "Username, email and password are required",
        data: null,
      });
    }

    const existing = await db.getUserByEmail(user.email);

    if (existing) {
      return next({
        status: 400,
        message: "Email already exists",
        data: null,
      });
    }

    const newUser = await db.createUser({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    const token = signJwt({
      email: newUser.email,
      userID: newUser._id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: newUser,
    });
  }
);

type UserReqBody = Pick<User, "email" | "password">;

const signIn = asyncWrapper<ExpressHandler<UserReqBody, ApiResponse<User>>>(
  async (req, res, next) => {
    const user = req.body;

    if (!user.email || !user.password) {
      return next({
        status: 400,
        message: "Username and password are required",
        data: null,
      });
    }

    const existing = await db.getUserByEmail(user.email);

    if (!existing) {
      return next({
        status: 404,
        message: "We don't have an account with that email address.",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(user.password, existing.password);

    if (!isMatch) {
      return {
        status: 400,
        message: "Incorrect password",
        data: null,
      };
    }

    const token = signJwt({
      email: existing.email,
      userID: existing._id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: existing,
    });
  }
);

const signOut: ExpressHandler<{}, ApiResponse> = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    status: 200,
    message: "User logged out successfully",
    data: null,
  });
};

export { getUser, getAllUsers, signUp, signIn, signOut };
