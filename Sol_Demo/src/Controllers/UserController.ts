import express from "express";
import { HttpException } from "../Config/Middlewares/Custom/ExceptionMiddlewareExtension";
import BaseController from "../Lib/BaseController/BaseController";
import UserModel from "../Models/UserModel";
import { IUserService } from "../Services/UserService";

export default class UserController extends BaseController{

    private readonly userService:IUserService=undefined;

    constructor(userService:IUserService){
        super();

        this.router=express.Router();
        this.routePath="/api/user";

        this.userService=userService;

        this.InitializeRoutes();
    }

    protected InitializeRoutes():void{
        this.router.post(`${this.routePath}/authenticate`,this.AuthenticateAsync.bind(this));
        this.router.post(`${this.routePath}/getuser`,this.GetUserAsync.bind(this));
    }

    private async AuthenticateAsync(request:express.Request,response:express.Response,next:express.NextFunction):Promise<void>{
        try
        {
            let userModel:UserModel=request.body;

            let result:UserModel=await this.userService.AuthenticateAsync(userModel);

            response.status(200).json(result);
        }
        catch(ex){
            next(ex);
        }
    }

    private async GetUserAsync(request:express.Request,response:express.Response,next:express.NextFunction):Promise<void>{
        try
        {
            let userModel:UserModel=await this.userService.GetUserAsync();

            response.status(200).json(userModel);
        }
        catch(ex)
        {
            next(ex);
        }
    }
}