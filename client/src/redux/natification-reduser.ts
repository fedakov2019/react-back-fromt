
import {v4} from 'uuid';
import {  BaseThunkType,PropertiesType } from './redux-store';
import {IAlert,TColors } from "../types/types";
const initialState={
   
    alerts:[] as Array<IAlert>};
    type ActionType= ReturnType<PropertiesType<typeof actions>>;
    type InitialStateType=typeof initialState;
const natifReduser = (state=initialState, action:ActionType):InitialStateType=>{
   
switch (action.type) {

case "ADD_NOTIFICATION":
    return {...state,alerts:[...state.alerts,{...action.payload}]};
  case "REMOVE_NOTIFICATION":
    return {...state,...state.alerts.filter(el => el.id !== action.id)};
    default:
        return state}
}
export const actions={  
    add_Notification:(props:IAlert) => (
        {type: "ADD_NOTIFICATION",
        payload: {
          
          
          
            ...props
        
           }
          
        
        } as const),
    remove_notification:(id:string)=>(
        {
            type: "REMOVE_NOTIFICATION",
            id
        } as const)
    }
export default natifReduser;
