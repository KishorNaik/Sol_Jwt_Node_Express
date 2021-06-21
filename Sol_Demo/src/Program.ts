require('rootpath')();
import Bottle from "bottlejs";
import MiddlewareCollections from "./Config/Middlewares/MiddlewaresCollection";
import ServiceCollections from "./Config/Services/ServiceCollections";
import Startup from "./Startup";



new Startup(new Bottle())
    .ConfigMiddlewares(new MiddlewareCollections())
    .ConfigServices(new ServiceCollections())
    .AddControllers((bottleContainer:Bottle)=>[
        bottleContainer.container.userController
    ])
    .ConfigErrorHandler()
    .Listen(3000);