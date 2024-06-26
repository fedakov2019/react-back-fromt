import { PropertiesType } from "./redux-store";



const SEND_MESSAGE='SN/Dialogs/SEND-MESSAGE';
type DialogType={
  id:number,
  name:string
}
type MessageType={
  id:number,
  message:string
}
const initialState={ dialogs: [
  {id: 1, name: 'Dimych'},
  {id: 2, name: 'Andrew'},
  {id: 3, name: 'Sveta'},
  {id: 4, name: 'Sasha'},
  {id: 5, name: 'Viktor'},
  {id: 6, name: 'Valera'}
] as Array<DialogType>,
messages: [
  {id: 1, message: 'Hi'},
  {id: 2, message: 'How is your it-kamasutra?'},
  {id: 3, message: 'Yo'},
  {id: 4, message: 'Yo'},
  {id: 5, message: 'Yo'}
] as Array<MessageType> }
export type InitialStateType= typeof initialState
type ActionType=ReturnType<PropertiesType<typeof action>>
const dialogReducer = (state=initialState, action:ActionType):InitialStateType=>{
  
    switch (action.type)
    {
    
    
        
    
    case SEND_MESSAGE: 
       const body= action.newMessageBody;
       
       return {...state,
       
        messages:[...state.messages,{id:6,message:body} ]};
       
        
      
    default: return state}
}

type SendMessageCreatorType={
  type:typeof SEND_MESSAGE,
  newMessageBody:string
}

export const action ={sendMessageCreator:(newMessageBody:string) =>({type:SEND_MESSAGE,newMessageBody} as const)
                     }

                     export default dialogReducer

