import { registerUser, userLogin , getAllUsers , getUserById, updateUserRole, deleteUser, updateAccount , updateProfileImage, forgetPassword} from "../controlleres/user.controller.js";
import express from "express";
import upload from "../middlewares/multer.middleware.js";
import registerValidator from "../utils/RegisterValidator.js";
import loginValidator from "../utils/LoginValidator.js";
import { validate } from "../middlewares/userValidator.middleware.js";
import { authUser, isAdmin } from "../middlewares/auth.middleware.js";
import forgetPasswordValidator from "../utils/ForgetPasswordValidator.js";
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
userRouter.route("/changerole/:id").patch(authUser , isAdmin("admin") , updateUserRole)
//delete / unActive user account 
userRouter.route("/delete/:id").delete(authUser ,  isAdmin("admin") , deleteUser ) 
//update account 
userRouter.route("/update/:id").patch(authUser , updateAccount)
//update user profile image 
userRouter.route("/updateprofileimage/:id").patch(upload.single("profileImage"),  authUser  , updateProfileImage)

// forget password
userRouter.route("/password/forget").post(forgetPasswordValidator , validate , forgetPassword) 
// change password 


// refresh access token implement in v2








//export user router 
export default userRouter