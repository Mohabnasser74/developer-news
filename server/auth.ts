import jwt from "jsonwebtoken";
import { JwtObject } from "./types";

const signJwt = (payload: JwtObject): string | undefined => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "1h",
  });
};

const verifyJwt = (token: string): JwtObject => {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
};

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    console.error("JWT_SECRET_KEY is not defined");
    process.exit(1);
  }

  return secret;
};

export { signJwt, verifyJwt };
