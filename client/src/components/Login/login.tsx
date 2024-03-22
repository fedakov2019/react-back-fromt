import {  InjectedFormProps, reduxForm } from "redux-form"
import { createField, Input } from "../common/FormControls/FormsControls"
import {required} from "../../utils/validators/validators"
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Login as login } from "../../redux/auth-reducer";
import styles  from "../common/FormControls/FormsControls.module.css";
import { AppState } from "../../redux/redux-store";
import 'materialize-css'
import {maxLengthCreator} from "../../utils/validators/validators"

type TmapDispatchProps={
   login:( text:string,password:string,rememberMe:boolean)=>void
}
const min2=maxLengthCreator(2);
export type TLoginForm ={
    text:string,password:string,rememberMe:boolean 
}
type TLoginFormKey= Extract<keyof TLoginForm,string>  

const Login:React.FC<TmapStateToProps&TmapDispatchProps>=(props)=>{
    const onSubmit =(formData:any)=>{
        props.login(formData.text,formData.password,formData.rememberMe);

    }
    if (props.isAuth) {return <Navigate to='/user/'/>}
 return <div className='container'>
 <div className='row'>
    <div className='col s6 offset-s3'>
<div className='card blue lighten-5'>
<div className='card-content blue-text'>
<span className='card-title'>Авторизация</span>
<LoginReduxForm onSubmit={onSubmit} />
</div>
</div>
</div>
</div>
</div>
} 
const LoginForm:React.FC<InjectedFormProps<TLoginForm>>=({handleSubmit,error})=>{
    return (
        <form onSubmit={handleSubmit}>
            {createField<TLoginFormKey>("Login","text",[required],Input)}
            {createField<TLoginFormKey>("Password","password",[required,min2],Input,{type:"password"})}

            {createField<TLoginFormKey>(undefined,"rememberMe",[],Input,{type:"checkbox"},"запомнить меня")}
        

{error && <div className={styles.formSummaryError}>{error}</div>}
<div className="card-action">
    <button className="btn green lighten-3">Войти</button>
</div>
</form>
    )
}
const LoginReduxForm =reduxForm<TLoginForm>({
    form:'login'
})(LoginForm)
type TmapStateToProps={
    
    isAuth:boolean
}
const mapStateToProps=(state:AppState):TmapStateToProps=>(
    {isAuth : state.auth.isAuth }
)
export default connect(mapStateToProps,{login})(Login);