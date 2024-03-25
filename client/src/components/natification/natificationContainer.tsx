import React from "react";
import {v4} from 'uuid';
import Natific_all from './Natificatios_all';
import {actions} from '../../redux/natification-reduser'
import { connect } from 'react-redux';
import { compose } from "redux";
import { AppState } from "../../redux/redux-store";
import { IAlert } from "../../types/types";



const mapStateToProps= (state:AppState) => {
    return {
        
        alerts : state.nat.alerts
    }
}


export type MapStatePropsType=ReturnType<typeof mapStateToProps>
    
export type MapDispatchPropsType={
    remuf:(sd:string)=>void,
    addNotif:(fg:IAlert)=>void


}
type OwnProps={}


const NatifCont=connect(mapStateToProps,  {remuf:actions.remove_notification,addNotif:actions.add_Notification})(Natific_all);
export default NatifCont