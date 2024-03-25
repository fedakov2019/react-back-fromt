import React,{ChangeEvent, useState} from 'react';
import Loader from '../../Users/Loader';
import ProfileStatus from './ProfileStatus';
import s from './ProfileInfo.module.css';
import ProfileDataForm from './ProfileDataForm';
import userPhoto from "../../Users/mult-ava-instagram-58.jpg"
import { ContactsType, ProfileType } from '../../../types/types';
type TProfileInfo={
profile:ProfileType|null,
status:string,
isowner:boolean,
savePhoto:(file:File)=>void,
saveData:(prof:ProfileType)=>Promise<any>,
UpdateStatus:(text:string)=> void
}
const ProfileInfo:React.FC<TProfileInfo> = (props) => {
    const [editModes,SeteditModes]=useState(false);
    if (!props.profile) {
        return <Loader />
    }
    
    const OnMainPhoto=(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files?.length)
        {
            props.savePhoto(e.target.files[0]);}
        
    }
    const onSubmit=(formData:ProfileType)=>{
    props.saveData(formData).then(()=>{
        SeteditModes(false);
    })
    
    }
    return (
        <div>
            <div className={s.h}>
                <img
                    src='https://catherineasquithgallery.com/uploads/posts/2021-02/1613325948_94-p-krasivii-sinii-fon-dlya-shapki-113.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large||userPhoto} className={s.mainphoto} />
            {props.isowner && <input type={"file"} onChange={OnMainPhoto}/>}
  
{editModes ? <ProfileDataForm initialValues={props.profile}  onSubmit={onSubmit} profile={props.profile}/>: 
<ProfileData  goToEditMode={()=>{SeteditModes(true)}} profile={props.profile} isOwner={props.isowner}/>}
            
                <ProfileStatus status={props.status} UpdateStatus={props.UpdateStatus}/>
            </div>
        </div>
    )
}
type PropsProfileData={
    goToEditMode:()=>void,
    profile:ProfileType,
    isOwner:boolean

}
const ProfileData:React.FC<PropsProfileData> = ({goToEditMode,profile,isOwner})=>{
    return (
        <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div><b>Full name:</b> {profile.fullName}</div>
<div> <b>Looking for a jib:</b> {profile.lookingForAJob ? "yes":"no"}</div>
{profile.lookingForAJob &&
<div><b> My professional skills:</b>{profile.lookingForAJobDescription}</div>}
<div> <b>About me:</b> {profile.aboutMe}</div>
<div><b>Contact:</b>
{Object.keys(profile.contacts).map(key=>{
return <Contact  key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
})}

</div>
</div>
    )
}
type propsContcts={
    contactTitle:string,
    contactValue:string

}
const Contact:React.FC<propsContcts> =({contactTitle,contactValue})=>
{
    return <div className={s.contakt}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;