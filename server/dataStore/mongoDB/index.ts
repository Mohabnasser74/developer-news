import { Datastore } from "../index";
import { User, Post, Like, Comment, ID } from "../../types";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import { PostModel } from "../../models/post.model";
import { LikeModel } from "../../models/like.model";
import { CommentModel } from "../../models/comment.model";
import { CreateCommentRequest, CreatePostRequest } from "../../api";
import { isValidObjectId } from "mongoose";

export class MongoDBDatastore implements Datastore {
  private validateObjectId(id: ID): boolean {
    return isValidObjectId(id);
  }

  async createUser(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await new UserModel(user).save();
    newUser.password = "";
    return newUser;
  }

  async getUserByEmail(email: string, projection?: {}) {
    return await UserModel.findOne({ email }, projection);
  }

  async getUserByUsername(username: string, projection?: {}) {
    return await UserModel.findOne({ username }, projection);
  }

  async getUserById(userID: ID, projection?: {}) {
    if (!this.validateObjectId(userID)) throw new Error("Invalid user ID");

    return await UserModel.findOne({ _id: userID }, projection);
  }

  async getPostById(id: ID) {
    if (!this.validateObjectId(id)) throw new Error("Invalid post ID");

    return await PostModel.findById(id, { userID: 0 });
  }

  async getUserPosts(userID: ID) {
    if (!this.validateObjectId(userID)) throw new Error("Invalid user ID");

    return await PostModel.find({ userID });
  }

  async createPost(post: Post) {
    if (!this.validateObjectId(post.userID)) throw new Error("Invalid post ID");

    return await new PostModel(post).save();
  }

  async updatePostById(id: string, post: CreatePostRequest) {
    if (!this.validateObjectId(id)) throw new Error("Invalid post ID");

    const updatePart: typeof post = {};

    post.title ? (updatePart.title = post.title) : null;
    post.url ? (updatePart.url = post.url) : null;

    return await PostModel.findByIdAndUpdate(
      id,
      {
        $set: updatePart,
      },
      { new: true }
    );
  }

  async deletePost(id: ID) {
    if (!this.validateObjectId(id)) throw new Error("Invalid post ID");

    return await PostModel.findByIdAndDelete(id);
  }

  async createLike(like: Like) {
    if (
      !this.validateObjectId(like.postID) ||
      !this.validateObjectId(like.userID)
    ) {
      throw new Error("Invalid post ID or user ID");
    }

    const existing = await LikeModel.findOne({
      userID: like.userID,
      postID: like.postID,
    });
    if (!existing) {
      return await new LikeModel(like).save();
    }

    throw new Error("User has already liked this post");
  }

  async createComment(comment: Comment) {
    if (
      !this.validateObjectId(comment.userID) ||
      !this.validateObjectId(comment.postID)
    ) {
      throw new Error("Invalid post ID or user ID");
    }

    const post = await this.getPostById(comment.postID);
    if (!post) throw new Error("Post not found");

    return await new CommentModel(comment).save();
  }

  async getPostComments(postID: ID) {
    if (!this.validateObjectId(postID)) throw new Error("Invalid post ID");

    return await CommentModel.find({ postID });
  }

  async updateCommentById(id: ID, comment: CreateCommentRequest) {
    if (!this.validateObjectId(id)) throw new Error("Invalid comment ID");

    return await CommentModel.findByIdAndUpdate(
      id,
      { $set: { content: comment.content } },
      { new: true }
    );
  }

  async deleteComment(id: ID) {
    if (!this.validateObjectId(id)) throw new Error("Invalid comment ID");

    return await CommentModel.findByIdAndDelete(id);
  }
}
