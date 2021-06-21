export default class MiddlewareCollections{

    constructor(){
        console.log("Middleware running");
    }

    public AddJsonMiddleware: any;
    public AddExceptionMiddleware:any;
    public AddLogerMiddleware:any;
    public AddCorsMiddleware:any;
    public AddJwt:any;
}