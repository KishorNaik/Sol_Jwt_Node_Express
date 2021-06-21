import Bottle from "bottlejs";
import UserController from "../../../Controllers/UserController";
import { UserService } from "../../../Services/UserService";
import ServiceCollections from "../ServiceCollections";

ServiceCollections.prototype.AddUserService=(bottleContainer:Bottle):void=>{
    bottleContainer.service("userService",UserService);
    bottleContainer.service("userController",UserController,"userService");
}