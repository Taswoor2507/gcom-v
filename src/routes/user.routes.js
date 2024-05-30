import { registerUser } from "../controlleres/user.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
const userRouter = express.Router();

userRouter.route("/register").post( upload.single("profileImage"), registerUser);


export default userRouter