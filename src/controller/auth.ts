import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

class auth{
    public cookieAuth(req:Request,res:Response,next:NextFunction){

        let cookieCheck=req.cookies.setcookie

        console.log(cookieCheck);
        if(cookieCheck == null || cookieCheck == undefined){
            next();
        }else{
            // console.log("bsjbusdi")
            jwt.verify(cookieCheck,process.env.jwt_secret || "secret_key",(err:any, decoded:any)=>{
                // console.log("check result===>",err)
                // console.log("check result===>",decoded)
                if(err){
                    res.clearCookie('setcookie');
                    next();
                }else{
                    res.send('Redirect Profile');
                }
            });
        }
    }
}
const Auth =new auth();
export default Auth;