export const logger = (req,res,next) =>{
    console.log(`${req.method} ${req.path}`);
    next(); // to continue to do next middleware, in case have next middleware
}