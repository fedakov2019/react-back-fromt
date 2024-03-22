

import {  FormAction, stopSubmit } from 'redux-form';
import { ResultCode} from '../api/api'
import { authAPI } from '../api/auth_api';

import { BaseThunkType, PropertiesType } from './redux-store';


const SET_USER_DATA='auth/SET_USER_DATA';

export type InitialStateType= typeof initialState;
const initialState={
    userId: null as number|null,
    login:null as string|null,
    Acces:false as boolean,
    remember:false as boolean,
    isAuth:false as boolean,
    
    
}
type ActionType= ReturnType<PropertiesType<typeof actons>>
type ThunkType=BaseThunkType<ActionType|FormAction>
const authReducer = (state=initialState, action:ActionType):InitialStateType=>{
  
switch (action.type)
{
case SET_USER_DATA: 

   
  return {...state,
     ...action.payload 
}
    


default:
    return state;
}}



export const actons={  
    setAuthUserData:(userId:number|null,login:string|null,Acces:boolean|false,isAuth:boolean,remember:boolean) => (
    {
        type:SET_USER_DATA, payload:{userId,login,Acces,remember,isAuth}
    } as const),
 

}    

export const GetAuthUserData=():ThunkType=> async (dispatch)=>{
    const remember:string|null=localStorage.getItem('RememberMe')
    const rem=!remember? "0":remember
    let rembool:boolean;
    if (rem==='0') { rembool=false}
    else {rembool=true}
   const data=await authAPI.getAuth(rem);
   
        if (data.resultCode===ResultCode.Success) {
            let {id, login,acces}=data.UserData;
            dispatch(actons.setAuthUserData(id,login,acces,true,rembool));
        } 
     
}
export const Login=(email:string,password:string,rememberMe:boolean):ThunkType=> async (dispatch)=>{
    
    
   const data= await authAPI.login(email,password,rememberMe);
   
        if (data.resultCode===ResultCode.Success) {
            localStorage.setItem('Token', data.UserData.tokenaccess);
            
            localStorage.setItem('RememberMe',(rememberMe ? "1":"0"));
        dispatch(GetAuthUserData()); 
        } else { 
        
            const message =data.messages.length>0? data.messages[0]:"имя или пароль не верны";
            dispatch(stopSubmit("login",{_error:message}))
        }

}

export const Logout=()=> async (dispatch:any)=>{
    const data = await authAPI.logout();
    
        if (data.resultCode===ResultCode.Success) {
            localStorage.removeItem('Token');   
            localStorage.removeItem('RememberMe');
        dispatch(actons.setAuthUserData(null,null,false,false,false)); 
        } 
     
}
export default authReducer;