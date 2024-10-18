import { ExpressHandler } from "../types";
import { ApiResponse } from "../api";

export const notFoundRoute: ExpressHandler<{}, ApiResponse> = (req, res) => {
  res.status(404).send({ status: 404, message: "Not found", data: null });
};
