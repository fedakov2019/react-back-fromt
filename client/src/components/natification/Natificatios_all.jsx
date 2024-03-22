import React, { useEffect } from "react";
import Notification from "./natification";
import { onAlert, onClosed } from '../../redux/users-reducer';
const Natific_all = ({...props}) => {
 
 
 

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
    props.alerts.map((note) => 
      <Notification  {...note}   key={note.id} />
    )
    
    
    
    
return (
<div key='1u' className={"notification-wrapper"}>
{postsElements}

</div>

)



}
export default Natific_all;
