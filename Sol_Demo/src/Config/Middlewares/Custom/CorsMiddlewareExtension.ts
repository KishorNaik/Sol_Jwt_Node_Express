import express from "express";
import cors from "cors";
import MiddlewareCollections from "../MiddlewaresCollection";

MiddlewareCollections.prototype.AddCorsMiddleware=(app:express.Application):void =>{
    
    app.use(cors());

};