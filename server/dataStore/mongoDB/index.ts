import { Datastore } from "../index";
import { User, Post, Like, Comment, ID } from "../../types";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import { PostModel } from "../../models/post.model";
import { LikeModel } from "../../models/like.model";
import { CommentModel } from "../../models/comment.model";
import { CreateCommentRequest, CreatePostRequest } from "../../api";
import { isValidObjectId, ProjectionType, UpdateQuery } from "mongoose";

export class MongoDBDatastore implements Datastore {
  private validateObjectId(id: ID, errorMessage: string): void {
    if (!isValidObjectId(id)) throw new Error(errorMessage);
  }

  async createUser(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await new UserModel(user).save();
    newUser.password = "****";
    return newUser;
  }

  async getUserByEmail(email: string, projection?: ProjectionType<User>) {
    return await UserModel.findOne({ email }, projection);
  }

  async getUserByUsername(username: string, projection?: ProjectionType<User>) {
    return await UserModel.findOne({ username }, projection);
  }

  async getUserById(userID: ID, projection?: ProjectionType<User>) {
    this.validateObjectId(userID, "Invalid User ID");
    return await UserModel.findOne({ _id: userID }, projection);
  }

  async getPostById(id: ID) {
    this.validateObjectId(id, "Invalid Post ID");
    return await PostModel.findById(id, { userID: 0 });
  }

  async getUserPosts(userID: ID) {
    this.validateObjectId(userID, "Invalid User ID");
    return await PostModel.find({ userID });
  }

  async createPost(post: Post) {
    this.validateObjectId(post.userID, "Invalid User ID");
    return await new PostModel(post).save();
  }

  async updatePostById(id: string, post: CreatePostRequest) {
    this.validateObjectId(id, "Invalid Post ID");

    const updatePayload = Object.keys(post).reduce((acc, key) => {
      const value = post[key as keyof CreatePostRequest];
      if (value !== undefined && value !== null) {
        acc[key as keyof CreatePostRequest] = value;
      }
      return acc;
    }, {} as Partial<CreatePostRequest>);

    return await PostModel.findByIdAndUpdate(
      id,
      {
        $set: updatePayload,
      },
      { new: true }
    );
  }

  async deletePost(id: ID) {
    this.validateObjectId(id, "Invalid Post ID");
    return await PostModel.findByIdAndDelete(id);
  }

  async createLike(like: Like) {
    this.validateObjectId(like.postID, "Invalid Post ID");
    this.validateObjectId(like.userID, "Invalid User ID");

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
    this.validateObjectId(comment.postID, "Invalid Post ID");
    this.validateObjectId(comment.userID, "Invalid User ID");

    const post = await this.getPostById(comment.postID);
    if (!post) return post;

    return await new CommentModel(comment).save();
  }

  async getPostComments(postID: ID) {
    this.validateObjectId(postID, "Invalid Post ID");
    return await CommentModel.find({ postID });
  }

  async updateCommentById(id: ID, comment: CreateCommentRequest) {
    this.validateObjectId(id, "Invalid comment ID");

    const update: UpdateQuery<typeof comment> = {
      $set: {
        content: comment.content,
      },
    };

    return await CommentModel.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteComment(id: ID) {
    this.validateObjectId(id, "Invalid comment ID");
    return await CommentModel.findByIdAndDelete(id);
  }
}
