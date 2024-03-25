import React, { useEffect } from "react";
import Notification from "./natification";
import { onAlert, onClosed } from '../../redux/users-reducer';
import { IAlert } from "../../types/types";
import { MapDispatchPropsType, MapStatePropsType } from "./natificationContainer";
type PropsType={
  addNotif:(d:IAlert)=>void,
remuf:(z:string)=>void,
alerts:Array<IAlert>
}

const Natific_all:React.FC<PropsType> = ({...props}) => {
 
 
 

  useEffect(() => {
    const onAlertSubscription$ = onAlert().subscribe(v => {
      props.addNotif(v);
    });
    const onClosedSubscription$ = onClosed().subscribe(id => {
      props.remuf(id);      
    });

    return () => {
      onAlertSubscription$.unsubscribe();
      onClosedSubscription$.unsubscribe();
    };
  }, [props.alerts]);

 

    let postsElements =
    props.alerts.map((note:IAlert) => (
      <Notification  {...note}   key={note.id} />)
    )
    
    
    
    
return (
<div key='1u' className={"notification-wrapper"}>
{postsElements}

</div>

)



}
export default Natific_all;
