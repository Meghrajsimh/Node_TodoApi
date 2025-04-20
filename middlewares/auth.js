import { userModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const isAuth = async(req, res, next) => {
     const {token} = req.cookies;
       
       if(!token) {
        return res.json({
            success:false,
            data:token,
            message: "You are not login!!!"
        })
       }
       const decodeUser = jwt.verify(token,process.env.KEY);
        
         req.userData = await userModel.findById(decodeUser._id);
         next();
}
