
import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profile_api';
import { PostType,ContactsType,PhotosType,ProfileType } from '../types/types';
import { BaseThunkType, PropertiesType } from './redux-store';
const ADD_POST='ADD-POST';

const SET_USER_PROFILE='SET_USER_PROFILE';
const SET_STATUS='SET_STATUS';
const SAVE_PHOTE_SUCCESS='SAVE_PHOTE_SUCCESS';


const initialState={
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    
    profile: null as ProfileType|null,
    status:"",
    newPostText:""
}
export type InitialStateType=typeof initialState; 
type ActionType= ReturnType<PropertiesType<typeof actions>>
type ThunkType=BaseThunkType<ActionType|FormAction>
const profileReducer = (state=initialState, action:ActionType):InitialStateType=>{
  
switch (action.type)
{
case ADD_POST: 
   
   
  return {...state,
    posts : [...state.posts, { id: 5, message: action.newPostText, likesCount: 0}],
    newPostText : ''}
    


 
//55
case SET_STATUS:
    return {...state, status:action.status}        
case SET_USER_PROFILE:
    return {...state, profile:action.profile}
case SAVE_PHOTE_SUCCESS:
    return {...state, profile:{...state.profile,photos:action.photos} as ProfileType}    

default:
    return state;
}}


export const actions={
  addPostActionCreator:(newPostText:string) =>( 
    {type:ADD_POST,newPostText} as const),

   setUserProfile:(profile:ProfileType) =>({type:SET_USER_PROFILE,profile} as const),

   savePhotoSuccess:(photos:PhotosType) => ({type:SAVE_PHOTE_SUCCESS,photos}as const),
 
  SetStatus:(status:string)=>({type:SET_STATUS,status}as const)}
  
  
  export const GetStatus=(userId:number):ThunkType=>{return async(dispatch)=>{
    profileAPI.getStatus(userId).then(data=>{
        dispatch(actions.SetStatus(data))
    })
  } }
  export const UpdateStatus=(status:string):ThunkType=>{return async(dispatch)=>{
    profileAPI.updateStatus(status).then(data=>{
        if (data.resultCode===0){
        dispatch(actions.SetStatus(status))}
    })
  }}
  export const savePhoto=(file:File):ThunkType=>{return async(dispatch)=>{
    const data= await profileAPI.savePhote(file);
        if (data.resultCode===0){
        dispatch(actions.savePhotoSuccess(data.UserData.photos))}
    
  }}
  export const saveData=(profile:ProfileType):ThunkType=>{return async(dispatch,getState)=>{
    const UserId=getState().auth.userId;
    const data= await profileAPI.saveData(profile);
        if ((data.resultCode===0)&&(UserId !== null)){
        
        dispatch(GetUserProfile(UserId))}
        else {dispatch(stopSubmit("edit-profile",{_error:data.messages[0]}));
        return Promise.reject(data.messages[0])
        }
    
  }}
  export const GetUserProfile=(userId:number):ThunkType=>{return async(dispatch)=>{
    profileAPI.getProfile(userId).then(data=>{
        dispatch(actions.setUserProfile(data));  
  })
  
}}
  
export default profileReducer;