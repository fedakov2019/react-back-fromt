module.exports = class ApiError extends Error {
    status;
    errors;
    data;
    constructor(status,message,data,errors=[]){
        super(message);
        this.status=status;
        this.errors=errors;
        this.data=data;
    }
    static UnauthoizedError(){
        return new ApiError(401,'Пользователь не авторизован',{resultCode:1,UserData:{id:null,login:null,acces:false}})
    }
   static BadRequest(message, errors=[]) {
    return new ApiError(400,message,errors);
   }
}