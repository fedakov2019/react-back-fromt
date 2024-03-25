import React from 'react';
import s from './Dialogs.module.css';
import { createField,Textarea } from "../common/FormControls/FormsControls"
import DialogItem from "./DialogItem/DialogItem";

import Message from "./Message/Message";

import { InitialStateType} from '../../redux/dialogs-reducer';
import { reduxForm,InjectedFormProps } from "redux-form"

import { maxLengthCreator, required } from '../../utils/validators/validators';
type PropsType={
    dialogsPage:InitialStateType,
    sendMessage:(messageText:string)=>void
}
type TDialogForm ={
    newMessageBody:string 
}
type TDialogFormKey= Extract<keyof TDialogForm,string> 


const Dialogs:React.FC<PropsType> = (props) => {
    const state=props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id}/> );
    

const addNewMessage=(values:TDialogForm)=>{
    props.sendMessage(values.newMessageBody); 
}


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
               <div>{ messagesElements }</div>
               <div>

               <AddMessageFormRedux onSubmit={addNewMessage}/>
               </div>
            </div>
        </div>
    )
}
const maxLeng=maxLengthCreator(50);
type PropType={}
const AddMessageForm:React.FC<InjectedFormProps<TDialogForm,PropType>&PropType> =(props)=>{
    return (
        <form onSubmit={props.handleSubmit}>
        <div>  
        {createField<TDialogFormKey>("Enter your message","newMessageBody",[required,maxLeng],Textarea)}
        </div>
        <div><button>Send</button></div>
</form>
    )
}
const AddMessageFormRedux =reduxForm<TDialogForm,PropType>({
    form:'dialogAddMessageForm'
})(AddMessageForm)
export default Dialogs;