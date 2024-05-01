import express, { Request,Response} from "express";
import cors from "cors";
import mongoose from 'mongoose'
import "dotenv/config";
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
const app=express()

mongoose.connect(process.env.MONGO_CONNECTION as string).then(()=>console.log("db connected")).catch((err)=>console.log(err))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

 app.use("/api/users",userRoutes)
 app.use("/api/auth",authRoutes)

app.listen(6000,()=>console.log("server running on 6000"))