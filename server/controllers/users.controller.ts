import { db } from "../index";
import { ExpressHandler, User } from "../types";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import bcrypt from "bcryptjs";
import { signJwt } from "../auth";
import { ApiResponse, CreateUserRequest } from "../api";

const getUserById = asyncWrapper<
  ExpressHandler<{}, ApiResponse<User>, { userID: string }>
>(async (req, res, next) => {
  const { userID } = req.params;

  if (!userID) {
    return next({
      status: 400,
      message: "userID is required",
      data: null,
    });
  }

  const user = await db.getUserById(userID, {
    password: 0,
    updatedAt: 0,
    __v: 0,
  });

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

    const existing = await db.getUserByEmail(user.email, {
      password: 0,
      updatedAt: 0,
      __v: 0,
    });

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
      username: user.username,
      email: newUser.email,
      userID: newUser._id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: newUser,
    });
  }
);

const signIn = asyncWrapper<ExpressHandler<CreateUserRequest>>(
  async (req, res, next) => {
    const user = req.body;

    if (!user.email || !user.password) {
      return next({
        status: 400,
        message: "email and password are required",
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
      return next({
        status: 400,
        message: "Incorrect password",
        data: null,
      });
    }

    const token = signJwt({
      username: existing.username,
      email: existing.email,
      userID: existing._id,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: null,
    });
  }
);

const signOut: ExpressHandler<{}> = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    status: 200,
    message: "User logged out successfully",
    data: null,
  });
};

export { getUserById, signUp, signIn, signOut };
