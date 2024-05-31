import mongoose , {Schema} from "mongoose";
import bcrypt from "bcryptjs";
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
  address:{
    Country:{
        type:String ,    
    } , 
    city:{
     type:String ,
    }
   }
 , 
  profileImage:{
    type:String //url link from cloudinary
  } , 
  contactNo:{
    type:Number,
    required:true
  }

} ,{timestamps:true})


//bcrypt the password 
userSchema.pre("save" , async function(next){
   if(!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password , 10)
    return next()
    
    })
  





const User =  mongoose.model("User" , userSchema)

export default User