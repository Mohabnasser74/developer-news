import { ApiResponse, ExpressHandler, JwtObject } from "../types";
import { verifyJwt } from "../auth";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtObject;
  }
}

export const isAuth: ExpressHandler<{}, ApiResponse> = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = verifyJwt(token);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({ status: 401, message: "Unauthorized", data: null });
  }
};
