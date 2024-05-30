import ApiError from "../utils/ApiError.js"
const ErrorMiddleware = (err , req, res, next)=>{
    err.statusCode  =  err. statusCode || 500
    err.message = err.message || "Internal server error"

if(err.name === "CastError"){
    err.message = `Invalid user ${err.path}`
    err.statusCode = 404
    
}




return res.status(err.statusCode).json({
    message:err.message,
    // stack:err.stack, 
    // errors :err.errors ,
    // name:err.name,
    // code :err.code,
    // path:err.path
})

}

export default ErrorMiddleware



// if(err.name === "ValidationError"){
//     err.message = Object.keys(err.errors).map((key) => ({
//         field: key,
//         message: err.errors[key].message
//     }));
//     err.statusCode = 403
//     // err = (new ApiError(`error dfd,f,`)  , err.statusCode)
    
// }
