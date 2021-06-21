import express from "express";
import Bottle from "bottlejs";
import MiddlewareCollections from "./Config/Middlewares/MiddlewaresCollection";
import ServiceCollections from "./Config/Services/ServiceCollections";
import BaseController from "./Lib/BaseController/BaseController";

// Middleware Extension
import "./Config/Middlewares/Custom/JsonMiddlewaresExtensions";
import "./Config/Middlewares/Custom/LoggerMiddlewareExtension";
import "./Config/Middlewares/Custom/ExceptionMiddlewareExtension";
import "./Config/Middlewares/Custom/CorsMiddlewareExtension";
import "./Config/Middlewares/Custom/JwtMiddlewareExtension";

// Service Extension
import "./Config/Services/Custom/SqlProviderExtension";
import "./Config/Services/Custom/UserServiceExtension";


export default class Startup{

    private app:express.Application;
    private bottle:Bottle;
    private middlewareCollections:MiddlewareCollections;

    constructor(bottle:Bottle){
       this.app=express();
       
        this.bottle=bottle;
    }

    public ConfigMiddlewares(middlewareCollections:MiddlewareCollections):Startup{
        this.middlewareCollections=middlewareCollections;

        this.middlewareCollections.AddJsonMiddleware(this.app);
        //this.middlewareCollections.AddLogerMiddleware(this.app);
        this.middlewareCollections.AddCorsMiddleware(this.app);
        this.middlewareCollections.AddJwt(this.app);


        return this;
    }

    public ConfigServices(serviceCollections:ServiceCollections):Startup{

        serviceCollections.AddSqlProvider(this.bottle);
        serviceCollections.AddUserService(this.bottle);

        return this;
    }

    public AddControllers(funcCallBack:(bottleContainer:Bottle)=> Array<BaseController>) : Startup{
        const controllerList:Array<BaseController>=funcCallBack(this.bottle);

        if(controllerList?.length>=1){
            controllerList.forEach((controller)=> {
                this.app.use("/",controller.router);
            });
        }
        return this;
    }

    public ConfigErrorHandler():Startup{

        this.middlewareCollections.AddExceptionMiddleware(this.app);

        return this;
    }

    public Listen(port:number):void{

        this.app.listen(port,()=>{
            console.log(`App listening on the port ${port}`);
        });
    }
    
}