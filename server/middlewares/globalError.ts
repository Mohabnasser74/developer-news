import { ErrorRequestHandler } from "express";
import { ApiResponse } from "../types";

export const globalError: ErrorRequestHandler<any, ApiResponse> = (
  error,
  req,
  res,
  next
) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
    data: null,
  });
};
