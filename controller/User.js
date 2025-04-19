import { userModel } from "../models/UserModel.js";
import { ErrorHandler } from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feture.js";

export const getAllUser = async(req, res) => {
    const user = await userModel.find();
    res.json({
        success:true,
        user
    })
}

export const login = async(req,res, next)=> {
 const {email, password} = req.body;

 const user = await userModel.findOne({email}).select("+password");

 if(!user) {
    return  next(new ErrorHandler("User Is Not Find !!!",404))
 }

 const comparePass = await bcrypt.compare(password, user.password) ;
 
 if(!comparePass) {
     return next(new ErrorHandler("User and Password are wornged!!!",403))
    }
  sendCookie(user,res,`Welecome ${user.name} , now you are log in`,201)

}

export const register = async(req, res, next) => {
    const { name, email, password } = req.body;
   
    const user = await userModel.findOne({email});
  
    if(user) {
        return next(new ErrorHandler("User Already Exits!!!",404));
    }
   const decodePass = await bcrypt.hash(password,10)
      await userModel.create({
        name, email, password: decodePass
    });

    
    res.status(201).json({
        success:true,
        message: "User created successfully"
    })

}



export const getUserDetails = async(req,res)=> {
  
  const user = req.userData;
   
   res.json({
    success:true,
    user
   })
}

export const userLogout = async (req, res) => {
    res.cookie('token',"",{
     expires: new Date(Date.now()),
     sameSite:process.env.NODE_ENV === "Development" ? "lax" :"none",
     secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success:true,
        message: "User logout successfully"
    });
}
