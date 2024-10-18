import { ApiResponse } from "../api";
import { ExpressHandler, JwtObject } from "../types";

const rootHandler: ExpressHandler<{}, ApiResponse> = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to developer-news API",
    data: null,
  });
};

const getMe: ExpressHandler<
  {},
  ApiResponse<{
    user?: JwtObject;
  }>
> = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "You’re logged in, here’s your info",
    data: {
      user: req.user,
    },
  });
};

export { rootHandler, getMe };
