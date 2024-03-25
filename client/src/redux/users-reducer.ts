import { FormAction, stopSubmit } from 'redux-form';
import { Dispatch } from 'redux';

import {v4} from 'uuid';
import { Observable, Subject } from 'rxjs';
import {IAlert,TColors } from "../types/types";
import {ResultCode} from '../api/api';
import {userAPI} from '../api/User_api';
import { UserType,ProfileTypeUser } from '../types/types';

import { updateObjectInArray } from '../utils/objectHelper';
import {  BaseThunkType,PropertiesType } from './redux-store';
import { profile } from 'console';
const DELETEUSER='DELETEUSER';

const SET_USERS='SET_USERS';

const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_USER_PROFILE='SET_USER_PROFILE';
const SET_PAGESIZE='SET_PAGESIZE';
const initialState={
    users: [] as Array<UserType>,
    pageSize:2,
    totalUserCount:0,
    currentPage:1,
    isFetching:false,
    usersUpdate:true,
    followingInProgress:[] as Array<number>,
    profileus: {id:0,Password:"",Login:"",Acces:false} as ProfileTypeUser,
}
type InitialStateType=typeof initialState;
type ActionType= ReturnType<PropertiesType<typeof actions>>
const usersReducer = (state=initialState, action:ActionType):InitialStateType=>{
  
switch (action.type)
{
    case SET_USER_PROFILE:
    return {...state,profileus:action.profile}

case DELETEUSER: 
   
   
  return {...state,
    users: (action.act=== "edit")? updateObjectInArray(state.users,action.userId,'id',{isDelete:true},action.act) :
    
    updateObjectInArray(state.users,action.userId,'id',{isDelete:false},action.act)
     
       
        

    
     
}
    
case SET_USERS:
    {
        return {...state,// ...state.users,
        users: action.users}
    }
    case SET_CURRENT_PAGE:
    {
        return {...state, currentPage: action.currentPage}
    }
    case TOGGLE_IS_FETCHING:
        {
            return {...state,isFetching:action.isFetching}
        }
    case SET_TOTAL_USERS_COUNT:
    {
        return {...state, totalUserCount: action.count}
    }

 

case TOGGLE_IS_FOLLOWING_PROGRESS:
    
    
    return {...state, followingInProgress: action.isFetch?
        [...state.followingInProgress,action.userId]
        :state.followingInProgress.filter(id=>id!==action.userId)}
case SET_PAGESIZE:
    return {...state, pageSize: action.pagesize}

default:
    return state;
}}

type DeletType={
    type:typeof DELETEUSER
    userId:number
    act:string
}
export const actions={
    setUserProfile:(profile:ProfileTypeUser) =>({type:SET_USER_PROFILE,profile} as const),

deletSucces:(userId:number,act:string) => (
     {
        type:DELETEUSER,userId,act
    } as const
),
setPagesize:(pagesize:number)=>({type:SET_PAGESIZE, pagesize} as const),
setUsers:(users: Array<UserType>) => ({type:SET_USERS, users}as const), 

setCurrentPage :(currentPage:number) => ({type:SET_CURRENT_PAGE, currentPage} as const),

setTotalUsersCount :(totalUserCount:number) => ({type:SET_TOTAL_USERS_COUNT, count:totalUserCount} as const),



 toggleIsFetching:(isFetching:boolean) =>({type: TOGGLE_IS_FETCHING,isFetching}as const),

toggleFollovingProgress:(isFetch:boolean,userId:number)=>
({type:TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetch, userId} as const)}

    type GetDispatchType=Dispatch<ActionType>
    type ThunkType=BaseThunkType<ActionType|FormAction>
export const GetUsersThunk=(currentPage:number,pageSize:number):ThunkType=> async (dispatch) =>{

    dispatch(actions.toggleIsFetching(true));
    const data=await userAPI.getUsers(currentPage,pageSize)
    if (data.totalCount!==0){
        dispatch(actions.toggleIsFetching(false));
       
        const items=data.items.map(u=>({...u,isDelete:false}))
 
        dispatch(actions.setUsers(items));    
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setPagesize(pageSize));
       dispatch(actions.setUserProfile({id:0, Password:'',Login:'',Acces:false}));
        dispatch(actions.setTotalUsersCount(data.totalCount));

    }
        
}
export const Deletuser=(Id:number,act:string):ThunkType => 
    async (dispatch)=>{
        
        const apiMethod=userAPI.getDeletUser.bind(Id);
        const actionCreator = actions.deletSucces;
        
      await  _follofUnfollowFlow(dispatch,Id,act,apiMethod,actionCreator);
   
    }
    const alertsSubject = new Subject<IAlert>();
    const closedAlertsSubject = new Subject<string>();
    
    const success = (message: string, timeout = 0): void => {
      alert('success', message, timeout);
    };
    
    const error = (message: string, timeout = 0): void => {
      alert('error', message, timeout);
    };
    
    const warning = (message: string, timeout = 0): void => {
      alert('warning', message, timeout);
    };
    
    const info = (message: string, timeout = 0): void => {
      alert('info', message, timeout);
    };
    
  export  const close = (id: string): void => {
      closedAlertsSubject.next(id);
    };
    
    const alert = (status: TColors, message: string, timeout: number): void => {
      alertsSubject.next({
        id: v4(),
        status, message, timeout
      });
    };
    
   export const onAlert = (): Observable<IAlert> => {
      return alertsSubject
        .asObservable();
    };
    
  export  const onClosed = (): Observable<string> => {
      return closedAlertsSubject
        .asObservable();
    };
 
const _follofUnfollowFlow =async (dispatch:GetDispatchType,Id:number,act:string,apiMethod:any,
    actionCreator:(userid:number,act:string)=>DeletType)=>
         {
    if (act==="save"){
        dispatch(actions.toggleFollovingProgress(true,Id));

        const data= await apiMethod(Id);
        
           
   if (data.resultCode === ResultCode.Success) {
    dispatch(actionCreator(Id,act));
    success("Пользователь удален",4);
    
} else
{error("Пользователь не выбран",5)}
} 
    
    else {
        if (act==="cancel") {
        info("Отмена удаления",4)}
        
        dispatch(actionCreator(Id,act));
        
    }

   dispatch(actions.toggleFollovingProgress(false,Id));

}
    

export const saveData=(profile:ProfileTypeUser,pageSize:number,currentPage:number):ThunkType=> async(dispatch,getState)=>{
    const UserId=profile.id;
    let data
    
    if (UserId === 0) { 
     data= await userAPI.saveDataid(profile);

    
   } 
    
    
    else {
     data=await userAPI.updateDataid(profile);}
     
        if (data.user.id!==0){
            if (UserId === 0) {info("Пользователь создан",4)
            dispatch(GetUsersThunk(1,pageSize)) 
        } 
            else {if (data.resultCode === ResultCode.Success) { info("Пользователь изменен",4)
            dispatch(GetUsersThunk(currentPage,pageSize)) 
        }
        
        
        }
                
            
              
        dispatch(GetUserProfile(data.user.id))}
        else {dispatch(stopSubmit("ProfilUserDataForm",{_error:data.messages[0]}));
        error("Ошибка записи",5)
        return Promise.reject(data.messages[0])
        }
    
  }
  export const GetUserProfile=(userId:number)=>async(dispatch:any)=>{ 
    
    const data= await userAPI.getProfileUser(userId);
    
    if (data.id ) {
        dispatch(actions.setUserProfile({...data,Password:""}));
      //  dispatch(reset("ProfilUserDataForm")) 

  }}

export default usersReducer;