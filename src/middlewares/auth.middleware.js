import ApiError from "../utils/ApiError.js"
import EnvVariables from "../constants.js"
import User from "../models/user.model.js"
const {JWT_SECRET_KEY} = EnvVariables
const authUser = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return next(new ApiError("Token is not available" , 400))
    }
    try {
        const decoded = jwt.verify(token,JWT_SECRET_KEY)
        req.user = User.findOne(decoded)
    return next()
    } catch (error) {
        return next(new ApiError("Token is not valid" , 400))
    }
}


// authrorize roles 
 const isAdmin =  (...roles) =>{
     return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ApiError("You are not authrize to do this task",400))
        }
        return next()
     }
 }




export {authUser , isAdmin}