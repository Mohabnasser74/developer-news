import { Datastore } from "../index";
import { User, Post, Like, Comment } from "../../types";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import { PostModel } from "../../models/post.model";
import { LikeModel } from "../../models/like.model";
import { CommentModel } from "../../models/comment.model";

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
    const post = await PostModel.findById(id, { userID: 0 });
    return post;
  }

  async getUserPosts(userID: string) {
    const posts = await PostModel.find({ userID });
    return posts;
  }

  async createPost(post: Post) {
    const newPost = await new PostModel(post).save();
    return newPost;
  }

  async updatePostById(id: string, post: Omit<Post, "userID">) {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title: post.title,
          url: post.url,
        },
      },
      { new: true }
    );

    return updatedPost;
  }

  async deletePost(id: string) {
    await PostModel.findByIdAndDelete(id);
    return null;
  }

  async createLike(like: Like) {
    await new LikeModel(like).save();
  }

  async createComment(comment: Comment) {
    const newComment = await new CommentModel(comment).save();
    return newComment;
  }

  async getPostComments(postID: string) {
    const comments = await CommentModel.find({ postID }, { userID: 0 });
    return comments;
  }

  async updateCommentById(id: string, content: string) {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          content,
        },
      },
      { new: true }
    );
    return updatedComment;
  }

  async deleteComment(id: string) {
    await CommentModel.findByIdAndDelete(id);
  }
}
