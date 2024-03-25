import { Navigate } from "react-router-dom"
import { connect } from 'react-redux';
import { AppState } from "../../redux/redux-store";

const mapStateToPropsForRedirect=(state:AppState)=>
({isAuth:state.auth.isAuth});
type MapStatePropsType={isAuth:boolean}
type MapDispatchType={}
export function withAuthRedirect<WCP>(Component:React.ComponentType<WCP>)

{
    const RedirectComponent:React.FC<MapStatePropsType&MapDispatchType>=(props)=>
    { let {isAuth,...restprops}=props;

        if (!isAuth) return <Navigate to='/login'/>
        return <Component {...restprops  as WCP&{}}/>

    }
   
const ConnectedAuthRedirectComponent=connect<MapStatePropsType,MapDispatchType,WCP&{},AppState>(mapStateToPropsForRedirect,{})(RedirectComponent)
return ConnectedAuthRedirectComponent;
}