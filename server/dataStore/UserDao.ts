import { User, ApiResponse } from "../types";

export interface UserDao {
  signup: (user: User) => Promise<ApiResponse<User | null> | void>;
  signin: (
    username: string,
    password: string
  ) => Promise<ApiResponse<User | null> | void>;
  logout: (username: string) => Promise<void>;
  getUser: (username: string) => Promise<ApiResponse<User | null> | void>;
  getAllUsers: () => Promise<ApiResponse<User[] | null> | void>;
}
