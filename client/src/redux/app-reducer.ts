

import { GetAuthUserData } from './auth-reducer';
import { BaseThunkType, PropertiesType } from './redux-store';
const SET_INITIALIZED='SN/APP/SET_INITIALIZED';


const initialState={
    initialized:false
    
}
type ActionType= ReturnType<PropertiesType<typeof actions>>
type ThunkType=BaseThunkType<ActionType>
export type InitialStateType= typeof initialState

const appReducer = (state=initialState, action:ActionType):InitialStateType=>{
  
switch (action.type)
{
case SET_INITIALIZED: 
   
   
  return {
    ...state,
     initialized:true
     
}
    


default:
    return state;
}}

export const actions={ initializedSuccess:() => (
    {
        type:SET_INITIALIZED
    } as const )}


export const initialize=():ThunkType=>{return async(dispatch)=>{
    const promise=dispatch(GetAuthUserData());
    Promise.all([promise])
    .then(()=>
    {dispatch(actions.initializedSuccess())})
}
}

            
export default appReducer;