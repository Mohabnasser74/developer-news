import { ProjectionType } from "mongoose";
import { User } from "../types";

export interface UserDao {
  createUser: (user: User) => Promise<User>;
  getUserByEmail: (
    email: string,
    projection?: ProjectionType<User>
  ) => Promise<User | null>;
  getUserByUsername: (
    username: string,
    projection?: ProjectionType<User>
  ) => Promise<User | null>;
  getUserById: (
    userID: string,
    projection?: ProjectionType<User>
  ) => Promise<User | null>;
}
