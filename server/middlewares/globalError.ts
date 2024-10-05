import { ErrorRequestHandler } from "express";
import { ApiResponse } from "../api";

export const globalError: ErrorRequestHandler<any, ApiResponse> = (
  error: ApiResponse,
  req,
  res,
  next
) => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
    data: null,
  });
};
