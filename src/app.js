import express from 'express'
import dotenv from 'dotenv'
import cors from  'cors'
const app=express()

//dotenv configuration
dotenv.config({
    path:"./src/config/.env"
})

//cors configuration 
//cross origin resource sharing 
app.use(cors({
    origin: '*'
}))

//buildin middlewares 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb" , extended:"true"}))
app.use(express.static("./public"))



export default app;