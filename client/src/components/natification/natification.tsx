import React, { useState } from "react";
import './natif.css'
import { IAlert,TColors } from "../../types/types";
import {close} from '../../redux/users-reducer'
type PropsType={
id:string,
timeout:number,
status:TColors,
message:string,
key:string,

}
type MapDispatchPropsType={


}

const Notification:React.FC<PropsType> = (props) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState<number|null>(null);


  const handleStartTimer = () => {
    const id  = window.setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    if (intervalID!==null) {
    clearInterval(intervalID);}
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
     close(props.id)
    }, props.timeout*1000)
  };

  React.useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification()
    }
  }, [width])

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        
        props.status === "success" ? "success" :( props.status ==="error" ? "error" : (props.status ==="info" ? "info" : (props.status ==="warning"  ? "warning" : "")))
      } ${exit ? "exit" : ""}`}
    >
      <p>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;