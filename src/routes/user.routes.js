import { registerUser } from "../controlleres/user.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
import registerValidator from "../utils/RegisterValidator.js";
import { validate } from "../middlewares/userValidator.middleware.js";
const userRouter = express.Router();

userRouter.route("/register").post(upload.single("profileImage") , registerValidator, validate , registerUser);


export default userRouter