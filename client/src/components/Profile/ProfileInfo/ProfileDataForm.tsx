
import { Textarea, createField,Input, TGetStringKey } from "../../common/FormControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import s from './ProfileInfo.module.css';
import { ProfileType } from "../../../types/types";
type TProfileDataForm={
  profile:ProfileType  
}
type ProfileTypeKey=TGetStringKey<ProfileType>

const ProfileDataForm:React.FC<InjectedFormProps<ProfileType,TProfileDataForm>&TProfileDataForm>=({handleSubmit,profile,error})=>{
    return (
        <form onSubmit={handleSubmit}>
        <div>
        <button>Save</button></div>
        {error && <div className={s.formSummaryError}>{error}</div>}
        <div><b>Full name:</b> {createField<ProfileTypeKey>("Full name","fullName",[],Input)}</div>
<div> <b>Looking for a jib:</b> 
{createField<ProfileTypeKey>("","lookingForAJob",[],Input,{type:"checkbox"})}
</div>

<div><b> My professional skills:</b>
{createField<ProfileTypeKey>("My professional skills","lookingForAJobDescription",[],Textarea)}
</div>
<div> <b>About me:</b>
{createField<ProfileTypeKey>("About me","aboutMe",[],Textarea)}
 </div>
 <div><b>Contacts:</b>
{Object.keys(profile.contacts).map(key=>{
return <div key={key} className={s.contakt}>
<b>  {key}: {createField(key,"contacts."+key,[],Input)}</b>

</div>
})}

</div>
</form>
    )  
}
const ProfileDataFormRedux=reduxForm<ProfileType,TProfileDataForm>({form:'edit-profile'})(ProfileDataForm)


export default ProfileDataFormRedux;