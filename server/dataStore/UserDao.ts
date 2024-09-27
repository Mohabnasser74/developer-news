import { User, ApiResponse } from "../types";

export interface UserDao {
  signup: (user: User) => Promise<ApiResponse<User> | void>;
  signin: (
    username: string,
    password: string
  ) => Promise<ApiResponse<User> | void>;
  logout: (username: string) => Promise<void>;
  getUser: (username: string) => Promise<ApiResponse<User> | void>;
  getAllUsers: () => Promise<ApiResponse<User[]> | void>;
}
