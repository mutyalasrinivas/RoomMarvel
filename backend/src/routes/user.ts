import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult  } from "express-validator";
import User from '../models/user';
const router=express.Router();
//api/users/register
 router.post('/register',
 [
   check("firstname","firstname is required").isString(),
   check("lastname","latname is required").isString(),
   check("email","email is required").isEmail(),
   check("password","password should me more than 6 letters").isLength({min:6}),
 ],async(req:Request,res:Response)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({message:errors.array()});
    }
     try{
        let user=await User.findOne({
            email:req.body.email,
         })
         if(user){
            res.status(400).json({message:"User alredy exists"})
         }
         user=new User(req.body)
         await user.save()
         //genrate a token
        const token=jwt.sign({userId:user.id},process.env.SECURITY_KEY as string,{expiresIn:"1d"});
        
         res.cookie("jwttoken",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000
         })
         
         return res.sendStatus(200);
         
     }catch(err){
        res.status(500).json({message:"Something went wrong"})
     }

 })

 export default router;