import React from 'react';


import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from '../MyPosts/MyPostsContainer';
import { ProfileType } from '../../../types/types';
type ProfilePropsType={
    profile:ProfileType|null,
status:string,
isowner:boolean,
savePhoto:(file:File)=>void,
saveData:(pro:ProfileType)=>Promise<any>,
UpdateStatus:(text:string)=>void
}
const Profile:React.FC<ProfilePropsType> = (props) => {
   
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto} isowner={props.isowner} 
            profile={props.profile} status={props.status} UpdateStatus={props.UpdateStatus} 
            saveData={props.saveData} />
            <MyPostsContainer  />
        </div>
    )
}

export default Profile;