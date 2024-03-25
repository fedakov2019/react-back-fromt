import React from 'react';

import { useEffect } from 'react';
import { GetUserProfile,GetStatus,UpdateStatus,savePhoto, saveData} from '../../../redux/profile-reducer';
import {useParams} from 'react-router';
import Profile from "./Profile";
import {connect}  from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from '../../Hoc/AuthRedirect';
import { AppState } from '../../../redux/redux-store';
import { ProfileType } from '../../../types/types';
import  RouteComponentProps  from 'react-router-dom';

type MapStProps=ReturnType<typeof mapStateToProps>

type Propsdispatch={

savePhoto:(file:File)=>void,
saveData:(prof:ProfileType)=>Promise<any>,
UpdateStatus:(text:string)=> void
GetUserProfile:(userid:string)=>void,
GetStatus:(userid:string)=>void,

}

const ProfileContainer:React.FC<MapStProps&Propsdispatch> = (props) => {
    let params=useParams();
    let userId=params.userId;
    if (!userId) 
    {
        userId = String(props.authUserid);
    } 
    useEffect(()=>{
        
        if (!userId){console.error('ошибка id user')}else{
       
        props.GetUserProfile(userId);
        props.GetStatus(userId);}
    
    },[userId]) ;  
    
    return (
        <div>
            <Profile {...props} isowner={!params.userId}
            profile={props.profile} status={props.status}
             UpdateStatus={props.UpdateStatus}
                savePhoto={props.savePhoto}
                saveData={props.saveData}
             />
            
        </div>
    )
}
const mapStateToProps =(state:AppState) => ({
profile : state.profilePage.profile,
status: state.profilePage.status,
authUserid:state.auth.userId,
isAuth:state.auth.isAuth
});


export default compose<React.ComponentState>(connect(mapStateToProps,{GetUserProfile, GetStatus,UpdateStatus,savePhoto,saveData}),withAuthRedirect)(ProfileContainer);