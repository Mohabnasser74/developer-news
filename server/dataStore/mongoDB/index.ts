import { Datastore } from "../index";
import { User, Post, Like, Comment } from "../../types";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcryptjs";

export class MongoDBDatastore implements Datastore {
  async signup(user: User) {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      return {
        status: 400,
        message: "An account with this email already exists",
        data: null,
      };
    }

    user.password = await bcrypt.hash(user.password, 10);

    const newUser = await new UserModel(user).save();

    return {
      status: 201,
      message: "User created successfully",
      data: newUser,
    };
  }

  async signin(username: string, password: string) {
    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
      return {
        status: 404,
        message: "We don't have an account with that email address.",
        data: null,
      };
    }

    const isMatch: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatch) {
      return {
        status: 400,
        message: "Incorrect password",
        data: null,
      };
    }

    return {
      status: 200,
      message: "User logged in successfully",
      data: null,
    };
  }

  logout!: (username: string) => Promise<void>;

  async getUser(username: string) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return {
        status: 404,
        message: "User not found",
        data: null,
      };
    }

    return {
      status: 200,
      message: "User found",
      data: user,
    };
  }

  // development env.
  async getAllUsers() {
    const users = await UserModel.find();
    return {
      status: 200,
      message: "Users found",
      data: users,
    };
  }

  createPost!: (post: Post) => Promise<void>;
  getPost!: (id: string) => Promise<Post | undefined>;
  getAllPosts!: () => Promise<Post[]>;
  updatePost!: (post: Post) => Promise<void>;
  deletePost!: (id: string) => Promise<void>;

  createLike!: (like: Like) => Promise<void>;

  createComment!: (comment: Comment) => Promise<void>;
  getComment!: (id: string) => Promise<Comment | undefined>;
  getComments!: (postID: string) => Promise<Comment[]>;
  updateComment!: (comment: Comment) => Promise<void>;
  deleteComment!: (id: string) => Promise<void>;
}
