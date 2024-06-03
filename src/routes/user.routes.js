import { registerUser, userLogin , getAllUsers , getUserById, updateUserRole} from "../controlleres/user.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
import registerValidator from "../utils/RegisterValidator.js";
import loginValidator from "../utils/LoginValidator.js";
import { validate } from "../middlewares/userValidator.middleware.js";
import { authUser, isAdmin } from "../middlewares/auth.middleware.js";
const userRouter = express.Router();
// register route for user registration
userRouter.route("/register").post(upload.single("profileImage") , registerValidator, validate , registerUser);
//login route for user login
userRouter.route("/login").post( loginValidator, validate , userLogin);
//get all users 
userRouter.route("/").get(authUser , isAdmin("admin") , getAllUsers )
//get user by id 
userRouter.route("/:id").get(authUser , isAdmin("admin") , getUserById)
//update user role 
userRouter.route("/changerole/:id").put(authUser , isAdmin("admin") , updateUserRole)

//export user router 
export default userRouter