import { Datastore } from "../index";
import { User, Post, Like, Comment } from "../../types";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import { PostModel } from "../../models/post.model";
import { LikeModel } from "../../models/like.model";
import { CommentModel } from "../../models/comment.model";
import { CreateCommentRequest, CreatePostRequest } from "../../api";
import { isValidObjectId } from "mongoose";

export class MongoDBDatastore implements Datastore {
  async createUser(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await new UserModel(user).save();
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await UserModel.findOne({ username });
    return user;
  }

  // development env
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getPostById(id: string) {
    if (isValidObjectId(id)) {
      const post = await PostModel.findById(id, { userID: 0 });
      return post;
    }
    return null;
  }

  async getUserPosts(userID: string) {
    if (isValidObjectId(userID)) {
      const posts = await PostModel.find({ userID });
      return posts;
    }
    return null;
  }

  async createPost(post: Post) {
    const newPost = await new PostModel(post).save();
    return newPost;
  }

  async updatePostById(id: string, post: CreatePostRequest) {
    if (isValidObjectId(id)) {
      const updatePart: typeof post = {};

      post.title ? (updatePart.title = post.title) : null;
      post.url ? (updatePart.url = post.url) : null;

      const updatedPost = await PostModel.findByIdAndUpdate(
        id,
        {
          $set: updatePart,
        },
        { new: true }
      );

      return updatedPost;
    }
    return null;
  }

  async deletePost(id: string) {
    await PostModel.findByIdAndDelete(id);
    return null;
  }

  async createLike(like: Like) {
    const existing = LikeModel.findOne({ userID: like.userID });
    if (!existing) {
      const newLike = await new LikeModel(like).save();
      return newLike;
    }
    return null;
  }

  async createComment(comment: Comment) {
    const newComment = await new CommentModel(comment).save();
    return newComment;
  }

  async getPostComments(postID: string) {
    const comments = await CommentModel.find({ postID });
    return comments;
  }

  async updateCommentById(id: string, comment: CreateCommentRequest) {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          content: comment.content,
        },
      },
      { new: true }
    );
    return updatedComment;
  }

  async deleteComment(id: string) {
    const deleted = await CommentModel.findByIdAndDelete(id);
    return deleted;
  }
}
