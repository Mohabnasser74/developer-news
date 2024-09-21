import { UserModel } from "../../models/user.model";
import { User, Post, Like, Comment, StandardResponse } from "../../types";
import { ApiResponse } from "../../utils/apiResponse";
import { Datastore } from "../index";
import bcrypt from "bcryptjs";

const { success, fail } = ApiResponse;

export class MongoDBDatastore implements Datastore {
  async signup(user: User) {
    const signin: never[] = await UserModel.find({ email: user.email });

    if (signin[0]) {
      return fail({
        status: 200,
        message: "An account with this email already exists",
        data: null,
      });
    }

    user.password = await bcrypt.hash(user.password, 10);
    await new UserModel(user).save();
    return success({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  }

  async signin(username: string, password: string) {
    const signin = await UserModel.find({ username });

    if (!signin[0]) {
      return fail({
        status: 404,
        message: "We don't have an account with that email address.",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, signin[0].password);

    if (!isMatch) {
      return fail({
        status: 400,
        message: "Incorrect password",
        data: null,
      });
    }

    return success({
      status: 200,
      message: "User logged in successfully",
      data: null,
    });
  }

  logout!: (username: string) => Promise<void>;

  async getUser(username: string) {
    const user = await UserModel.find({ username });

    if (!user[0]) {
      return fail({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    return success({
      status: 200,
      message: "User found",
      data: user[0],
    });
  }

  // development env.
  async getAllUsers() {
    const users = await UserModel.find();
    return success({
      status: 200,
      message: "Users found",
      data: users,
    });
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
