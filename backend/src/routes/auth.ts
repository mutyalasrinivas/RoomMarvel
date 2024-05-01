import express, { Router,Request,Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
const router= express.Router();


//api/auth/login
router.post("/login",
[
  check("email","email is required").isEmail(),
  check("password","password should be grater than 6").isLength({min:6})
],
async(req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({message:errors.array()})
    }

    try{
        const {email,password} =req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid creditials"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid creditials"})
        }
        const token=jwt.sign({userId:user.id},process.env.SECURITY_KEY as string,{expiresIn:"1d"})
        res.cookie("jwttoken",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000,
        })

    }catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
})



export default Router;