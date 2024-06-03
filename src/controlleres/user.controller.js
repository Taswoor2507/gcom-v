import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import sendEmail from "../utils/sendMail.js";

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
  // console.log(req.file);
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
       //send congrats email to registered user
       const options = {
        sendTo : user.email, 
        subject : "Gcom Registration" , 
        text : `Congratulations ${user.username} you have successfully registered on our website ---->  gcom` , 
        // html : `Congratulations ${user.username} you have successfully registered on our website` ,
       }
     await sendEmail(options)

     //generate access token
     const token = user.generateAccessToken()
  // console.log(token);
  //send respose to server
    res.status(201).json({
      success:true,
      message:"User created successfully",
      data:user, 
      token 
    })
})
// ___________________________________END REGISTER CONTROLLER______________________________

//________________________________USER LOGIN CONTROLLER___________________________
const userLogin = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email is empty
  if (!email) {
      return next(new ApiError("Email field is required", 400));
  }
  // Check if password is empty
  if (!password) {
      return next(new ApiError("Password field is required", 400));
  }

  // Find user by email
  const user = await User.findOne({ email:email });
  if (!user) {
      return next(new ApiError("User not found", 404));
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
      return next(new ApiError("Invalid email or password", 400));
  }

  // Generate access token
  const token = user.generateAccessToken();

  // Send response to client
  res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      token
  });
});

// _______________login controller ends____________________________________________


//get all users controllers 
//access --> admin only 


const getAllUsers=AsyncHandler(async(req,res,next)=>{
     const users = await User.find();
     //total documents 
     const totalUsers  = await User.find().count();
     res.status(200).json({
         success:true,
         totalUsers,
         message:"All users fetched successfully",
         data:users
     })  

})




//get single user by id 
const getUserById = AsyncHandler(async(req,res,next)=>{
  const id = req.params.id;
   const user =  await User.findById(id)
if(!user) return next(ApiError("User not found" , 404))

  res.status(200).json({
    success:true,
    user, 
  })

})

//____________________________________ export all controllers_______________________________
export {registerUser , userLogin , getAllUsers,getUserById}