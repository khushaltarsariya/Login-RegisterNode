import bcrypt from 'bcrypt'
import { Request,Response } from 'express';
import { connection } from '../config/database';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
require('dotenv').config();

const saltRounds=10;

class Registration{
    public register(req:Request,res:Response){
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;

        const error=validationResult(req);

        if (!error.isEmpty()){
                res.send({status:400,message:error.array()});
        }

        else{
            connection.query("select count(*) as cnt from loginuser where email=?",[email],(err,result)=>{
                console.log(result);
                if(err) throw err;

                if(result[0].cnt > 0){
                    res.send("email already exist enter some another email");
                }
                else{
                    const salt = bcrypt.genSaltSync(saltRounds).toString();
                    const pass =bcrypt.hashSync(password,salt).toString();
                    connection.query("INSERT INTO loginuser set username=?,email=?,password=?",[username,email,pass],(err,result)=>{
                        console.log("Registration successfully done");
                        if(err) throw err;
                        else{
                            connection.query("select * from loginuser where email=?",[email],(err,result)=>{
                                if(err) throw err;
                                else{
                                    console.log(result);
                                    let jwtSecretKey=process.env.jwt_secret;
                                    var token= jwt.sign({user_id:result[0].user_id},jwtSecretKey || "secret_key", { expiresIn: "2h"});
                                    res.cookie("setcookie",token,{expires:new Date(Date.now()+90000),httpOnly:true});
                                    return res.status(200).json({token});
                                    
                                }
                            });
                        }
                        
                    });
                }
            });
        }
    }
}
const register=new Registration();
export default register;

