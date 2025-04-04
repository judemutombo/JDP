
export const debug = function(req, res, next){
    //console.log("Debug : ", req.cookies);
    next();
}