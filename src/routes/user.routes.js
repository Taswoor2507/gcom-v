import { registerUser, userLogin } from "../controlleres/user.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
import registerValidator from "../utils/RegisterValidator.js";
import loginValidator from "../utils/LoginValidator.js";
import { validate } from "../middlewares/userValidator.middleware.js";
const userRouter = express.Router();
// register route for user registration
userRouter.route("/register").post(upload.single("profileImage") , registerValidator, validate , registerUser);
//login route for user login
userRouter.route("/login").post( loginValidator, validate , userLogin);

export default userRouter