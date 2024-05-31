import { registerUser } from "../controlleres/user.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
import registerValidator from "../utils/RegisterValidator.js";
import { validate } from "../middlewares/userValidator.middleware.js";
const userRouter = express.Router();
// console.log('registerUser:', await registerUser()); // Should log the function definition
// console.log('upload:', upload); // Should not be undefined
// console.log('registerValidator:', registerValidator); // Should not be undefined
// console.log('validate:', validate); // Should not be undefined
userRouter.route("/register").post(upload.single("profileImage") , registerValidator, validate , registerUser);

export default userRouter