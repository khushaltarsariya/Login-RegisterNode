import {Request,Response} from 'express';
import { connection } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
require('dotenv').config();


class login{
   
    public login(req:Request,res:Response){
       const email=req.body.email;
       const password=req.body.password;
       
       const error= validationResult(req);
       if(!error.isEmpty()){
        res.send({status:400,message:error.array()});
       }
        connection.query("select * from loginuser where email=?",[email],(err,result)=>{
            if(err) throw err;
            //check if the user is exist or not 

            if(result.length === 0){
                return res.status(400).json({message:"Invalid email"});
            }
            const user=result[0];
            // console.log(user);

            //compare password

            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    let jwtSecretKey=process.env.jwt_secret;
                    const token =jwt.sign({userid:user.id},jwtSecretKey || 'secret_key', { algorithm: 'HS256' });
                    res.cookie("setcookie",token,{expires:new Date(Date.now()+24*60*60*1000),httpOnly:true});
                    console.log(req.cookies.cookie)
                    res.status(200).json({token});
                }
                else{
                    return res.status(401).json({message:"Invalid email or password"});
                }
            });
        });
       }
}
const Login = new login();
export default Login; 