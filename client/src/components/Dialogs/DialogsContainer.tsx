import React from 'react';

import Dialogs from "./Dialogs";

import { action } from '../../redux/dialogs-reducer';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../Hoc/AuthRedirect';
import { AppState } from '../../redux/redux-store';

const mapStateToProps= (state:AppState) => {
    return {
        dialogsPage: state.dialogsPage,
        
    }
}






export default compose<React.ComponentState>(connect(mapStateToProps, {sendMessge:action.sendMessageCreator}),withAuthRedirect)(Dialogs);