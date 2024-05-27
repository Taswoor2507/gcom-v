import EnvVariables from "../constants.js";
const {MONGO_DB_URL, DB_NAME} = EnvVariables
import mongoose from "mongoose";
const ConnectDB =  async ()=>{
 try {
    const connectionInstance = await mongoose.connect(`${MONGO_DB_URL}/${DB_NAME}`)
    console.log(`DB base is conneted in ${connectionInstance.connection.host}`);

 } catch (error) {
    console.log('DB is not connecting due to  --> ' ,  error);    
 }
    }

    export default ConnectDB