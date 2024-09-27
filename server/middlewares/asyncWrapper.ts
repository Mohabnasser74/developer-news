import { RequestHandler } from "express";

export function asyncWrapper<Handler extends RequestHandler = RequestHandler>(
  fn: Handler
): Handler {
  const asyncFn: RequestHandler = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return asyncFn as Handler;
}
