import Bottle from "bottlejs";
import { SqlProvider } from "../../../Lib/SqlProviders/SqlProviders";
import ServiceCollections from "../ServiceCollections";

ServiceCollections.prototype.AddSqlProvider=function(bottleContainer:Bottle){
    bottleContainer.service("sqlProvider",SqlProvider);
}