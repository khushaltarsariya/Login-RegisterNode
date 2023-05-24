import { Request,Response } from "express";

class logout{
    public logout(req:Request,res:Response){
        res.clearCookie("setcookies");
        res.send("/login")
        console.log("Logout successfully");
    }
}
const Logout=new logout();
export default Logout;