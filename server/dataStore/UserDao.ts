import { User } from "../types";

export interface UserDao {
  createUser: (user: User) => Promise<User>;
  getUserByEmail: (email: string, projection?: {}) => Promise<User | null>;
  getUserByUsername: (
    username: string,
    projection?: {}
  ) => Promise<User | null>;
  getUserById: (userID: string, projection?: {}) => Promise<User | null>;
}
