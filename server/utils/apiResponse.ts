import { StandardResponse, User } from "../types";

export class ApiResponse {
  static success<Data>(json: {
    status: number;
    message: string;
    data: Data;
  }): StandardResponse<Data> {
    return {
      text: "success",
      ...json,
    };
  }

  static fail<Data>(json: {
    status: number;
    message: string;
    data: Data;
  }): StandardResponse<Data> {
    return {
      text: "fail",
      ...json,
    };
  }

  static error<Data>(json: {
    status: number;
    message: string;
    data: Data;
  }): StandardResponse<Data> {
    return {
      text: "error",
      ...json,
    };
  }
}
