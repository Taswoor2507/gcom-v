import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
 productName:{
    type:String , 
    required:[true , "Product name is required"],
    unique:true,
 } , 
 description:{
    type:String,
    required:[true , "Description is required"],
 } , 
 price:{
    type:Number,
    required:true,
    maxLength:[6 , "Price should not exceed more than 6 digits"],
 } , 
 stock:{
    type:Number,
    default:1 , 
    maxLength:[3 , "Price should not exceed more than 3 digits"],
 } ,

ratings:{
    type:Number,
    default:0
} ,
category:{
    type:String ,
    required:[true ,  "Category should not be empty"],
} , 
numberOfReviews:{
    type:String,
    default:0
} ,
reviews:[
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:{
            type:String,
            required:true,
        } , 
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }
] ,
images:[
    {
        publicId:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }
]

}, {timestamps:true});

const Product = mongoose.model("Product" , productSchema);

export default Product;