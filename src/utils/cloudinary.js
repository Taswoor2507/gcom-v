import {v2 as cloudinary} from 'cloudinary';
import EnvVariables from '../constants.js';
import { response } from 'express';
import fs from 'fs'

const {CLOUD_NAME , API_KEY , API_SECRET} = EnvVariables
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET, 
});

const uploadOnCloudinary = async(localFilePath)=>{
try {
   const response =await  cloudinary.uploader.upload(localFilePath , {resource_type:"auto"})
    
   // console.log(response);
   fs.unlinkSync(localFilePath)
   return response
   
} catch (error) {
   console.log("cloudinary error " , error);
    fs.unlinkSync(localFilePath)
}

}
export default uploadOnCloudinary