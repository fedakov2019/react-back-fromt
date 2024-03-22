
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');
module.exports=(req,res,next) =>{
if (req.method==='OPTIONS'){
    return next()
}
try {
    const token=req.headers.authorization.split(' ')[1]
    if (!token) {
        return next(ApiError.UnauthoizedError())

    }
    const decoder=tokenService.validateAccesToken(token);
if (!decoder) { return next(ApiError.UnauthoizedError())}
    req.user=decoder;
    next()
}
catch (e){
    return next(ApiError.UnauthoizedError())
}

}