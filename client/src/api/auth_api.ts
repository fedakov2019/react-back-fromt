import { request } from "http"
import {  instance,instanceretry, ResultCode,ResponseT } from "./api"
import { error } from "console"


export type GetAythType={
    id:number
    acces:boolean
    login:string
}
export type LoginType ={user:{id:number,login:string,acces:boolean},tokenaccess:string,tokenrefreh:string}

export const authAPI ={
    
    getAuth(Remember:string) {
        if (Remember=='0') {
        return instance.get<ResponseT<GetAythType>>('/auth/me').then(response=>response.data)
        
         .catch(error => 
            error.response.data
         )
        }
return (  instanceretry.get<ResponseT<GetAythType>>('/auth/me').then(response => response.data)
.catch(error => 
    error.response.data
 )
)
    },
    login(Name:string,Passwords:string,rememberMe:boolean) {
        return instance.post<ResponseT<LoginType,ResultCode>>('/auth/login',{Name,Passwords}).then(response => response.data) 
    },
    logout() {
        return instance.delete('/auth/logout').then(response => response.data)
    }
}