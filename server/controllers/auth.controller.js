import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin=async(req,res,next)=>{
    const { email, password } = req.body.formData;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      // console.log(validUser._id);
      res
        .cookie('access_token', token, { 
          expirys:expiryDate, 
          httpOnly: true,
          sameSite: "lax",
          secure: true, })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
}
