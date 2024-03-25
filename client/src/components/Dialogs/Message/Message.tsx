import React from 'react';
import s from './../Dialogs.module.css';
type PropsMessage={message:string}
const Message:React.FC<PropsMessage> = (props) => {
    return <div className={s.dialog}>{props.message}</div>
}

export default Message;