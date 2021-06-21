import express from "express";
import expressJwt from "express-jwt";
import MiddlewareCollections from "../MiddlewaresCollection";

import { AppSettingsConfiguration } from "../../Settings/AppSettingsConfigurations";
let configSetting:AppSettingsConfiguration=require('../../Settings/appSettings.json');


MiddlewareCollections.prototype.AddJwt=(app:express.Application):void=>{

    const secret:string=configSetting.Secret;

    function jwt(){
        let option:expressJwt.Options={
            secret:configSetting.Secret,
            algorithms:['HS256']
        };

        return expressJwt(option).unless({
            path:[
                // public routes that don't require authentication
                "/api/user/authenticate"
            ]
        });
    }

    app.use(jwt());
    
};