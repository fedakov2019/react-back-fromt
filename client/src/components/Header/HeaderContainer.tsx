import React from "react";
import {connect}  from "react-redux";

import { Logout } from "../../redux/auth-reducer";


import Header from "./Header";
import { AppState } from "../../redux/redux-store";


const HeaderContainer:React.FC<MapStatePropsType&MapDispatchProps> = (props) => {
    



return <Header {...props}/>

}
export type MapDispatchProps={Logout:()=> void}
export type MapStatePropsType=ReturnType<typeof mapStateToProps>
const mapStateToProps=(state:AppState) =>({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})

export default connect(mapStateToProps, {Logout})(HeaderContainer);
