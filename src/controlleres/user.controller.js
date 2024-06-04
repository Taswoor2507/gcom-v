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

//update user role 
// admin only 
const updateUserRole = AsyncHandler(async(req,res,next)=>{
  const id = req.params.id;
  const user = await User.findById(id)
  if(!user) return next(ApiError("User not found" , 404))
  const {role} = req.body;
if(!role){
  return next(new ApiError("Add role first", 404))
}

if(role !== "admin" || role !==  "admin") return next(new ApiError("Add valid role" , 400))
  user.role = role;
  await user.save();
  res.status(200).json({
    success:true,
    message:"User role updated successfully",
    data:user
  })
})

//delete user 
//admin only
const deleteUser = AsyncHandler(async(req,res,next)=>{
  const id= req.params.id;
  const user = await User.findById(id)

  if(!user) return next( new ApiError("User not found" , 404))
   const deleteUser=await User.findByIdAndDelete(id)
   
  if(deleteUser){
    res.status(200).json({
      success:true,
      message:"User deleted successfully",
    
    })
  }

})

//update account 
const updateAccount = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new ApiError('Login first to update your account', 403));

  const { username, email, contactNo } = req.body;

  // Prepare update data
  const updateData = {};
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (contactNo) updateData.contactNo = contactNo;

  // Update profile
  const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true, // Return the updated user
    runValidators: true, // Validate the update operation against the schema
  });

  // Handle case where user is not found
  if (!updatedUser) {
    return next(new ApiError('User not found', 404));
  }

  // Respond with the updated user
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});


//update user profile image
const updateProfileImage  = AsyncHandler(async(req,res,next)=>{
   const user =  req.user;
   const {id} = req.user 
   if(!user) return next(new ApiError("Login is required"));
// console.log(req.file);
//
const profileImageLocalPath = req.file?.path
// console.log(profileImageLocalPath);
if(!profileImageLocalPath){
  return next(new ApiError("Profile image is required" , 403));
}

//upload image on cloudinary
  const imageObj = await uploadOnCloudinary(profileImageLocalPath)
  // console.log(imageObj);

  if(!imageObj)  next(ApiError("Image not found on cloudinary" ,  404))
  const updatedUserProfile  = await User.findByIdAndUpdate(id ,  {profileImage: imageObj.url}, {
new:true, runValidators:false});
  
  if(!updatedUserProfile) return next(new ApiError("Profile image updation failed " , 404))
   
    res.status(200).json({
      success:true,
      message:"Profile image updated successfully",
      data:updatedUserProfile
    })
})

// forget password 
const forgetPassword  = AsyncHandler(async(req,res,next)=>{
      const user = await User.findOne({email:req.body.email});
      if(!user) return next(new ApiError(404, "User not found"));
      
      // get resetpassword token
      const resetToken = user.getResetPasswordToken();
      await user.save({validateBeforeSave:false}); 
      
      // create link for reset password 
      const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;
      //messsage for email
      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
      try {
         const options = {
          sendTo : user.email, 
          subject : "Gcom reset password link msg " , 
          text : message
          // html : `Congratulations ${user.username} you have successfully registered on our website` ,
         }
       await sendEmail(options)
      } catch (error) {
        user.resetPasswordExpired = undefined;
        user.resetPasswordToken = undefined;
        await user.save({validateBeforeSave:false})
        //http://localhost:7070/password/reset/f68780a1da2e99a71bcaa58b1db4574031639293
        return next(new ApiError("Email reset message not sent successfully" , 500));
      }

      res.status(200).json({
        success:true,
        message:"Reset password link sent successfully",
        data:user
      })

})









//____________________________________ export all controllers_______________________________
export {registerUser , userLogin , getAllUsers,getUserById , updateUserRole , deleteUser, updateAccount , updateProfileImage , forgetPassword}