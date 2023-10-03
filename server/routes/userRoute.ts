import express, { Request, Response } from "express";
import userController from "../controller/userController";
const userRouter = express.Router();

userRouter
  .post("/register", userController.register)
  .get("/login", userController.login);

export default userRouter;
