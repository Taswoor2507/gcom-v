import app from "./app.js";
import EnvVariables from "./constants.js";
import ConnectDB from "./config/db.js";
const {PORT} =  EnvVariables

ConnectDB().then(()=>{
    app.listen(PORT, (err)=>{
        if(err){
          console.log("   Server Error ");
        }else{
          console.log(`Server is runnning on port https://localhost:${PORT}`);
        }
})
}).catch((error) => {
    console.log(`Error to connect to database`);
})

