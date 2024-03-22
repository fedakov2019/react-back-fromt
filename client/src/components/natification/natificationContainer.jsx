import React from "react";
import {v4} from 'uuid';
import Natific_all from './Natificatios_all';
import {actions} from '../../redux/natification-reduser'
import { connect } from 'react-redux';
import { compose } from "redux";



const mapStateToProps= (state) => {
    return {
        
        alerts : state.nat.alerts
    }
}





const NatifCont=connect(mapStateToProps,  {remuf:actions.remove_notification,addNotif:actions.add_Notification})(Natific_all);
export default NatifCont