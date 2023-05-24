import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routedata from './routes/routedata';


class index{
    public app:Application;

    constructor(){
        this.app=express();
        this.config();
        this.router();
    }

    config():void{
        this.app.set('port',process.env.port || 5000);
    }
    router():void{
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use('/',routedata);
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log(`server is listen on port`,this.app.get('port'));
        })
    }
}
const server=new index();
server.start();


