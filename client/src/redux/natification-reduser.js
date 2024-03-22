import {v4} from 'uuid';
const initialState={
   
    alerts:[
        
       
    
]}
const natifReduser = (state=initialState, action)=>{

switch (action.type) {

case "ADD_NOTIFICATION":
    return {...state,alerts:[...state.alerts,{...action.payload}]};
  case "REMOVE_NOTIFICATION":
    return {...state,...state.alerts.filter(el => el.id !== action.id)};
    default:
        return state}
}
export const actions={  
    add_Notification:(props) => (
        {type: "ADD_NOTIFICATION",
        payload: {
          
          
          
            ...props
        
           }
          
        
        } ),
    remove_notification:(id)=>(
        {
            type: "REMOVE_NOTIFICATION",
            id
        })
    }
export default natifReduser;
