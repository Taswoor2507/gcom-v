import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// ________________________________________________________
//@Controller register user 
//@Access : public
//@route :http://localhost:7070/api/v1/users/register
// ________________________________________________________
const registerUser = AsyncHandler(async(req,res,next)=>{
    const {username , email ,  password ,  contactNo , address}= req.body;
 
    //check fileds are filled or not 
   if(!username ||!email || !password || !contactNo){
      return next(new ApiError("Some fields are missing please fill it first " , 400))
   }

   //check if user already exists
   const userExists = await User.findOne({email})
   if(userExists){
     return next(new ApiError("User already exists" , 400))
   }

// check profile image is available
   const profileImageLocalPath = req.file?.path
   if(!profileImageLocalPath){
     console.log("Profile image path is not available");
}

//upload image on cloudinary
 const profileImageUpload = await uploadOnCloudinary(profileImageLocalPath)
 if(profileImageUpload){
     console.log("upload on cloudinary successfully");
 }

   //create user
   const user = await User.create(
    {
      username , 
      email ,
      password ,  
      contactNo ,
      address ,
      profileImage: `${profileImageUpload.url}`
    })
   
   // check user is created or not
   if(!user){
     return next(new ApiError("User Register failed !!" , 400))
   }

  //send respose to server
    res.status(201).json({
      success:true,
      message:"User created successfully",
      data:user
    })
})
// ___________________________________END REGISTER CONTROLLER_________________________________________________________



//____________________________________ export all controllers______________________________________________________
export {registerUser}