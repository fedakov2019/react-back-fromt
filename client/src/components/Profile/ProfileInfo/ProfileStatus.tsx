import React,{useState,useEffect, ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
type PropsType={
    status:string,
    UpdateStatus:(newStatus:string)=>void
};
type StateType={};
const ProfileStatus=(props:PropsType)=>{
    const [status,SetStatus]=useState(props.status);
    const [editMode,SeteditMode]=useState(false);
    const onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
        SetStatus(e.currentTarget.value)
    }
    useEffect(()=>{SetStatus(props.status); },[props.status]);
    return (
        <div>
        {!editMode &&
            <div><b> Status:</b><span onDoubleClick={()=>{SeteditMode(true)}}>{props.status}</span></div>}
            {editMode &&
            <div>

                <input onBlur={()=>{SeteditMode(false); props.UpdateStatus(status)}} autoFocus={true} value={status} onChange={onStatusChange} />
            </div>}
        </div>
    )
}
export default ProfileStatus;