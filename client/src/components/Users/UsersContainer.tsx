import React from "react";
import {connect}  from "react-redux";
import { useEffect } from 'react';

import { Deletuser, GetUserProfile, GetUsersThunk, saveData } from "../../redux/users-reducer";
import { withAuthRedirect } from '../Hoc/AuthRedirect';

import Users from "./Users";
import Loader from "./Loader";
import {actions} from '../../redux/users-reducer'
import { compose } from "redux";
import { GetUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUserCount,getUserProfile } from "../../redux/users-selectors";
import { ProfileTypeUser, UserType } from "../../types/types";
import { AppState } from "../../redux/redux-store";
type MapStatePropsType={
    currentPage:number,
    pageSize:number,
    isFetching:boolean,
    
    totalUserCount:number,
    users:Array<UserType>,
    followingInProgress: Array<number>,
    profile:ProfileTypeUser
}
type MapDispatchPropsType={
    
    
  GetUserProfile:(id:number)=>void,
    Deletuser:(id:number,action:string)=> void,
    
    GetUsersThunk:(currentPage:number,pageSize:number)=>void,
  saveData:(sssfd:ProfileTypeUser,pageSize:number,cirentPage:number)=>void
  setUserProfile:(se:ProfileTypeUser)=>void
 
}


type OwnpropsType={
   
    
    
}
type propsType= MapStatePropsType& MapDispatchPropsType&OwnpropsType;

 const UsersAPIComponent = (props:propsType) => {
    const profile=props.users.length;
  
useEffect(()=>{
    props.GetUsersThunk(props.currentPage,props.pageSize);
  
   },[profile]) 

  



const handleButtonClick=(action:string,user:UserType) =>{
    
        
          
                props.Deletuser(user.id,action);
           
    
}
const ontrtable=(id:number)=>{
props.GetUserProfile(id);
}






function onPageChange(pageNumber:number,pagesize:number) {
    
    props.GetUsersThunk(pageNumber,pagesize);
// props.setUserProfile({id:0, Password:'',Login:'',Acces:false});
   // props.setCurrentPage(pageNumber);
   
    }
return <>
{props.isFetching ? <Loader/>: null}
<Users totalUserCount={props.totalUserCount}
pageSize={props.pageSize}
profile={props.profile}
currentPage={props.currentPage}
UpdateProfile={props.setUserProfile}
onPageChange={onPageChange}

users={props.users}
LoginSave={props.saveData}
handleButtonClick={handleButtonClick}
ontrtable={ontrtable}
followingInProgress={props.followingInProgress}
/> </>
}
const mapStateToProps= (state:AppState):MapStatePropsType => {
    return {
        
        users:GetUsers(state),
        pageSize:getPageSize(state),
   
        currentPage: getCurrentPage(state),
        totalUserCount: getTotalUserCount(state),
        isFetching: getIsFetching(state),
        profile:state.usersPage.profileus,
        followingInProgress: getFollowingInProgress(state)
        
    }
}

export default compose<React.ComponentState>( connect<MapStatePropsType,MapDispatchPropsType,OwnpropsType,AppState>(mapStateToProps, {
   setUserProfile:actions.setUserProfile,
 
    GetUserProfile,
    Deletuser,

    
    saveData
        
    ,
    
    

    
    GetUsersThunk
    
    }
    ), withAuthRedirect)(UsersAPIComponent)

