//import { AppSettings } from "../Config/Settings/AppSettings";
import UserModel from "../Models/UserModel";
import jwt from "jsonwebtoken";
import cleanDeep from "clean-deep";

import { AppSettingsConfiguration } from "../Config/Settings/AppSettingsConfigurations";
import { HttpException } from "../Config/Middlewares/Custom/ExceptionMiddlewareExtension";
let configSetting:AppSettingsConfiguration=require('../Config/Settings/appSettings.json');

// Testing purpose
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

export interface IUserService{
    AuthenticateAsync(userModel:UserModel): Promise<UserModel>;
    GetUserAsync():Promise<UserModel>;
}

export class UserService implements IUserService{
    
    
    public AuthenticateAsync(userModel: UserModel): Promise<UserModel> {
        return new Promise((resolve,reject)=>{

            try
            {

                const user=users.find((u)=> u.username==userModel.UserName && u.password==userModel.Password);
               

                if(!user) throw new HttpException(200,"UserName or Password is incorrect");

                //console.log("Jwt Secret UserService",configSetting.Secret);

                const token=jwt.sign({sub:user.id},configSetting.Secret,{expiresIn:"7d",algorithm:"HS256"});

                //delete userModel.Password;
                userModel.Password=null;
                
                userModel.Token=token;

                userModel=cleanDeep(userModel);

                resolve(userModel);
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }

        });
    }

    public GetUserAsync(): Promise<UserModel> {
        return new Promise((resolve,reject)=>{

            try
            {
                let userModel:UserModel=new UserModel();
                userModel.UserName="test";
                
                resolve(userModel);
            }
            catch(ex){
                reject(ex);
                throw ex;    
            }

        });
    }

}