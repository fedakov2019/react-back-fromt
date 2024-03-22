import { connect } from 'react-redux';
import {  createField,Input } from "../common/FormControls/FormsControls";
import { reduxForm,InjectedFormProps, getFormInitialValues,reset,change, FormAction, ActionTypes } from "redux-form";
import styles  from "../common/FormControls/FormsControls.module.css";
import {required,maxLengthCreator} from "../../utils/validators/validators"
import s from './user.module.css';
import { ProfileTypeUser } from "../../types/types";

import { AppState } from "../../redux/redux-store";
import { compose } from 'redux';
import {actions} from '../../redux/users-reducer'


const min2=maxLengthCreator(2);
type TLoginFormKey= Extract<keyof ProfileTypeUser,string> 
type propsType={userid:number,resets:()=>void
} 

const ProfileUserDataForm:React.FC<InjectedFormProps<ProfileTypeUser,propsType>&propsType>=
({handleSubmit,error,userid,pristine,submitting,initialValues,reset,resets},props)=>{
  
    
    //const resets=()=>{
    
       // reset();
      //  reswer({Login:'',Password:'',Acces:false});
        
   // }
    
   
    return (
        <form onSubmit={handleSubmit}>
        
        <span className='card-title'> { userid === 0?'Новый пользователь!':`Пользователь с id=${userid}`}</span>
        
        {createField<TLoginFormKey>("Login","Login",[required],Input)}
            {createField<TLoginFormKey>("Password","Password",[required,min2],Input,{type:"password"})}

            {createField<TLoginFormKey>(undefined,"Acces",[],Input,{type:"checkbox"},"Администратор?")}
        

{error && <div className={styles.formSummaryError}>{error}</div>}
<div className="card-action">
    <button   className="btn green lighten-4">Сохранить</button><a/>
   <button type="button" className="btn pink lighten-3"  onClick={()=>resets()}>Сбросить</button>


</div>
</form>
    )  
}
type MapStatePropsType={
    
    initialValues:ProfileTypeUser
}
const mapStateToProps= (state:AppState):MapStatePropsType => {
    return { initialValues:state.usersPage.profileus}

}
const ProfileUserFormRedux =reduxForm<ProfileTypeUser,propsType>({
    form:'ProfilUserDataForm',enableReinitialize : true
})(ProfileUserDataForm)

export default compose(connect(
    mapStateToProps,{reswer:actions.setUserProfile}            
  ))(ProfileUserFormRedux)