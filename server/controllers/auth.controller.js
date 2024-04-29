import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body.formData;
    const salt =await bcryptjs.genSalt(10);
    const hashPassword=await bcryptjs.hashSync(password,salt);
    const newUser=new User({username,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json("Successfully user created");
    }catch(err){
        next(err);
    }
}
