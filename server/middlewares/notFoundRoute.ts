import { RequestHandler } from "express";
import { ApiResponse } from "../api";

export const notFoundRoute: RequestHandler<any, ApiResponse> = (req, res) => {
  res.status(404).send({ status: 404, message: "Not found", data: null });
};