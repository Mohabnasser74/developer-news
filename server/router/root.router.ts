import express from "express";
import { getMe, rootHandler } from "../controllers/root.controller";
import { isAuth } from "../middlewares/isAuth";

const rootRouter = express.Router();

rootRouter.get("/", rootHandler);
rootRouter.get("/me", isAuth, getMe);

export default rootRouter;
