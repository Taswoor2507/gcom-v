import jwt from 'jsonwebtoken'; // Ensure this is imported
import ApiError from "../utils/ApiError.js";
import EnvVariables from "../constants.js";
import User from "../models/user.model.js";

const { JWT_SECRET_KEY } = EnvVariables;
// console.log(JWT_SECRET_KEY);
const authUser = async (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header("Authorization")?.split("Bearer ")[1];
    // console.log('Token:', token);

    if (!token) {
        return next(new ApiError("Token is not available", 400));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // Find user by decoded information (assuming the decoded token contains user ID)
        req.user = await User.findById(decoded.id);  // Assuming decoded contains user ID as 'id'
        
        if (!req.user) {
            return next(new ApiError("User not found", 404));
        }

        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(`Token expired expiredAt: ${error.expiredAt} `, 401)) 
        }
         return next(new ApiError("Invalid token"  , 401))
        
}};

// Authorize roles
const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError("You are not authorized to do this task", 400));
        }
        return next();
    };
};

export { authUser, isAdmin };
