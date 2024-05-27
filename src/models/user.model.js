import mongoose , {Schema} from "mongoose";
import { type } from "os";

const userSchema = new Schema ({
  username:{
    type:String,
    required:[true ,  "username field is required"] , 
    trim:true, 
    lowercase:true 
  } , 
  email:{
    type:String ,
    required:[true ,  "Email field is required"] ,
    trim:true,
    unique:true
  } ,
  password:{
    type:String,
    required:[true ,  "Password field is required"]
  } , 
  role:{
    type:String,
    default:"user" , 
    required:true
  } , 
  address:[
   {
    Country:{
        type:String ,    
    } , 
    city:{
     type:String ,
    }
   }
  ] , 
  profileImage:{
    type:String //url link from cloudinary
  } , 
  contactNo:{
    type:Number,
    required:true
  }

} ,{timestamps:true})


const User =  mongoose.model("User" , userSchema)

export default User