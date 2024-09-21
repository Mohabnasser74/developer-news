import { User, StandardResponse } from "../types";

export interface UserDao {
  signup: (user: User) => Promise<StandardResponse<User | null> | undefined>;
  signin: (
    username: string,
    password: string
  ) => Promise<StandardResponse<User | null> | undefined>;
  logout: (username: string) => Promise<void>;
  getUser: (
    username: string
  ) => Promise<StandardResponse<User | null> | undefined>;
  getAllUsers: () => Promise<StandardResponse<User[] | null> | undefined>;
}
