import {Router} from 'express'
import register from '../controller/register';
import Login from '../controller/login';
import Auth from '../controller/auth';
import Logout from '../controller/logout';
const validator = require("../validator/validator")

class routeData{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{

        //route for the register
        this.router.post('/register',Auth.cookieAuth,validator.checkUserDetails(),register.register);

        //route for the login
        this.router.post('/login',Auth.cookieAuth,validator.loginUserDetails(),Login.login);

        //route for the logout
        this.router.post('/logout',Logout.logout);
    }

}

const routedata=new routeData();
export default routedata.router;